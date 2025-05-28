#!/usr/bin/env bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "develop" || "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ – Build can proceed"
  exit 1      # non‑zero = tell Vercel “yes, run the build”
else
  echo "🛑 – Build cancelled"
  exit 0      # zero = tell Vercel “skip the build”
fi
