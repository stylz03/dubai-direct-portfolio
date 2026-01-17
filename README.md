# Dubai Direct Portfolio

This is a responsive React portfolio website for "Dubai Direct", built with TypeScript, Tailwind CSS, and Recharts.

## Deployment Instructions (GitHub Pages)

To deploy this site to GitHub Pages using the `gh-pages` branch method, follow these steps:

### Initial Setup (One-time)

1. **Link to GitHub:**
   *Create a new repository on GitHub named `dubai-direct-portfolio`.*
   ```bash
   git remote add origin https://github.com/[your-username]/dubai-direct-portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select **gh-pages** as the branch and **/(root)** as the folder.
   - Click **Save**.

### Deploying Updates

After making changes to your site, deploy them using one of these methods:

**Option 1: Using npm script (Recommended)**
```bash
npm run deploy
```

**Option 2: Using the script directly**
```bash
./deploy.sh
```

The deployment script will:
- Build your project for production
- Create/update the `gh-pages` branch
- Push the built files to GitHub
- Switch you back to the `main` branch

### View Your Site

Your site will be live at `https://[your-username].github.io/dubai-direct-portfolio` within a few minutes after the first deployment.

## Development

- `npm install`: Install dependencies
- `npm run dev`: Run development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run deploy`: Deploy to GitHub Pages
