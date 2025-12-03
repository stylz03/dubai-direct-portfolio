#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the project and deploys it to the gh-pages branch

set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building project..."
GITHUB_PAGES=true npm run build

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📝 gh-pages branch exists, checking out..."
    git checkout gh-pages
    # Remove all files except .git
    find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'node_modules' ! -name 'dist' -exec rm -rf {} +
else
    echo "📝 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf --cached .
fi

# Copy dist contents to root
echo "📋 Copying build files..."
cp -r dist/* .

# Add all files
git add -A

# Commit
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')"
fi

# Push to gh-pages branch
echo "⬆️  Pushing to gh-pages branch..."
git push origin gh-pages --force

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://[your-username].github.io/dubai-direct-portfolio"
echo ""
echo "📌 Don't forget to enable GitHub Pages in your repository settings:"
echo "   Settings > Pages > Source: Deploy from a branch > gh-pages > / (root)"

