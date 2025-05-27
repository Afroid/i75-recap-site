#!/usr/bin/env bash
if [ "$VERCEL_GIT_COMMIT_REF" = "gh‑pages" ]; then
  echo "Skipping gh‑pages"
  exit 0   # skip build
else
  exit 1   # proceed with build
fi
