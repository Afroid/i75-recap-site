import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './latest.api';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

// Mock AWS SDK imports
jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(),
  GetObjectCommand: jest.fn((params) => params),
}));

describe('GET /api/latest', () => {
  let sendMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Arrange: mock S3Client to expose a send() we control
    sendMock = jest.fn();
    (S3Client as jest.Mock).mockImplementation(() => ({
      send: sendMock,
    }));

    // Provide minimal env vars the handler expects
    process.env.SCORES_BUCKET = 'test-bucket';
    process.env.AWS_REGION = 'us-east-1';
    process.env.AWS_ACCESS_KEY_ID = 'AKIA_TEST';
    process.env.AWS_SECRET_ACCESS_KEY = 'SECRET_TEST';
  });

  it('returns 200 and parsed JSON when S3 returns a readable stream', async () => {
    // Arrange: create a fake JSON payload and wrap in a Readable
    const fakeData = { 'Team A': 5, 'Team B': 3 };
    const stream = new Readable();
    stream.push(JSON.stringify(fakeData));
    stream.push(null);

    // Arrange: have send() resolve to an object with Body = our stream
    sendMock.mockResolvedValue({ Body: stream });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { league: 'nba' },
    });

    // Act: invoke the API handler
    await handler(req, res);

    // Assert: status and JSON payload
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(fakeData);

    // Assert: correct S3 command was constructed
    expect(GetObjectCommand).toHaveBeenCalledWith({
      Bucket: 'test-bucket',
      Key: 'leagues/nba/latest.json',
    });

    // Assert: send() was called once
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('returns 502 if S3 body is not a Readable', async () => {
    // Arrange: send() resolves to Body = a non‐stream value
    sendMock.mockResolvedValue({ Body: {} });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { league: 'mlb' },
    });

    // Act
    await handler(req, res);

    // Assert: handler catches the type mismatch and returns 502
    expect(res._getStatusCode()).toBe(502);
    expect(res._getJSONData()).toEqual({
      error: 'Failed to fetch latest scores',
    });
  });

  it('returns 502 on S3Client.send() rejection', async () => {
    // Arrange: send() throws an error
    sendMock.mockRejectedValue(new Error('S3 failure'));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { league: 'mlb' },
    });

    // Act
    await handler(req, res);

    // Assert: error path returns 502
    expect(res._getStatusCode()).toBe(502);
    expect(res._getJSONData()).toEqual({
      error: 'Failed to fetch latest scores',
    });
  });
});
