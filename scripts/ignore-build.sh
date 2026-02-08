#!/bin/bash

# Vercel Ignored Build Step
# Returns exit code 0 to SKIP build, 1 to BUILD
# Docs: https://vercel.com/docs/projects/overview#ignored-build-step

# Get the project directory from the first argument
PROJECT_DIR="${1:-apps/contextkit-site}"

echo "🔍 Checking if $PROJECT_DIR has changes..."

# Get the commit range - use HEAD~1 for first commit
if git rev-parse HEAD~1 >/dev/null 2>&1; then
  PREV_COMMIT="HEAD~1"
else
  # First commit, always build
  echo "✅ First commit - proceeding with build"
  exit 1
fi

# Check for changes in the project directory
CHANGED_FILES=$(git diff --name-only $PREV_COMMIT HEAD)

# Check if any changed file is in the project directory
if echo "$CHANGED_FILES" | grep -q "^${PROJECT_DIR}/"; then
  echo "✅ Changes detected in $PROJECT_DIR - proceeding with build"
  exit 1
fi

# Also check for changes in shared packages that might affect this project
if echo "$CHANGED_FILES" | grep -q "^packages/"; then
  echo "✅ Changes in packages/ - proceeding with build"
  exit 1
fi

# Check for root config changes that affect all projects
if echo "$CHANGED_FILES" | grep -qE "^(pnpm-lock.yaml|pnpm-workspace.yaml|turbo.json|package.json)$"; then
  echo "✅ Root config changed - proceeding with build"
  exit 1
fi

# No relevant changes
echo "⏭️  No changes in $PROJECT_DIR - skipping build"
exit 0
