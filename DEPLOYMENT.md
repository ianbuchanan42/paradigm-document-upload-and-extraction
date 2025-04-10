# Deployment Guide for Paradigm Document Upload & Extraction Demo

This guide will help you deploy the Paradigm Document Upload & Extraction Demo as a static site on Render.com.

## Prerequisites

- A [Render.com](https://render.com) account
- Git repository with your project code

## Setup for Static Site Generation

This project has been configured for Static Site Generation (SSG) using Next.js. The following configurations have been made:

1. `next.config.ts` has been updated to include:

   - `output: 'export'` - Enables static HTML export
   - `images: { unoptimized: true }` - Required for static image exports

2. `package.json` includes an export script:

   - `"export": "next build"`

3. All components use client-side state management to maintain functionality in a static environment

## Deploying to Render.com

### Option 1: Deploy from Git Repository

1. Log in to your Render dashboard
2. Click "New" and select "Static Site"
3. Connect your Git repository
4. Configure the following settings:
   - **Name**: Choose a name for your site (e.g., "paradigm-police-report-demo")
   - **Branch**: Your main branch (e.g., "main" or "master")
   - **Build Command**: `npm run export`
   - **Publish Directory**: `out`
5. Click "Create Static Site"

Render will automatically build and deploy your site. When the build completes, your site will be available at a render.com URL.

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. Run the build locally:

   ```
   npm run export
   ```

2. The static site will be generated in the `out` directory

3. Log in to your Render dashboard
4. Click "New" and select "Static Site"
5. Choose "Upload Files" instead of connecting a Git repository
6. Drag and drop the contents of the `out` directory
7. Configure your domain settings
8. Click "Upload Files"

## Debugging Deployment Issues

If you encounter issues during deployment:

1. Check Render's build logs for any errors
2. Ensure all images and assets are correctly placed in the `public` directory
3. Verify that the `next.config.ts` file contains the correct configuration
4. Make sure no server-side only features are being used (API routes, etc.)

## Custom Domain Setup

To use a custom domain with your Render static site:

1. Go to your site's settings in the Render dashboard
2. Click on "Custom Domain"
3. Follow the instructions to add and verify your domain

## Content Updates

To update content on your static site:

1. Make changes to your code or assets
2. Commit and push to your Git repository
3. Render will automatically rebuild and redeploy your site (if using Git deployment)

For manual deployments, you'll need to rebuild locally and upload the new files.

## Additional Resources

- [Render Static Sites Documentation](https://render.com/docs/static-sites)
- [Next.js Static Export Documentation](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
