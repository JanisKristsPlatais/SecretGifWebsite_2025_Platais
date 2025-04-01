# Secret GIF Access Portal

An interactive web application that uses a file upload authentication mechanism. Users must upload a specific GIF file to gain access to the site's content.

## Features

- Drag-and-drop file upload or standard browser upload
- Secure authentication with file content verification
- Confetti animation on successful authentication
- Single-page experience after authentication
- Responsive design for desktop and mobile devices

## Running Locally

To run the application locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to the URL shown in the console

## GitHub Pages Deployment

This application is configured to deploy automatically to GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles the building and deployment process.

### Setting Up GitHub Pages

1. Go to your repository settings
2. Navigate to the "Pages" section
3. Set the source to "GitHub Actions"

### Manual Deployment

If you want to deploy manually:

1. Build the static version: `npx vite build --config vite.config.github.ts`
2. The built files will be in the `dist/public` directory
3. These files can be deployed to any static hosting provider

## Authentication Process

The application implements a multi-level authentication process that verifies:
- File type (must be a GIF)
- File name (must be specific)
- File content (compares pixels with the expected image)

## License

MIT