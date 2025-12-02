# Bloglovers Dashboard CMS

A modern, feature-rich Content Management System for bloggers with a colorful dark theme, animations, and advanced editing capabilities.

## Features

- **Colorful Dark Theme**: Vibrant dark interface with gradient accents
- **Rich Text Editor**: Advanced WYSIWYG editor with formatting options
- **Image Management**: Upload, customize, and insert images with various options
- **Video Embedding**: Insert videos from YouTube, Vimeo, or direct URLs
- **Special Characters**: Easy insertion of special characters and symbols
- **Post Management**: Create, edit, delete, and preview posts
- **Labels/Categories**: Organize posts with labels and categories
- **Media Library**: Manage all your uploaded media files
- **Analytics Dashboard**: View blog statistics and performance metrics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Jameel Noori Nastaleeq Font**: Support for Urdu/Persian typography
- **Multiple Font Options**: Choose from various English fonts
- **Text Customization**: Full control over text styling and formatting
- **Post Scheduling**: Schedule posts for future publication
- **Search Description**: Custom meta descriptions for SEO
- **Preview Functionality**: See how posts will look before publishing

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- Local Storage for data persistence
- Font Awesome Icons
- Google Fonts

## Local Development

1. Clone the repository or download the source code
2. Open `index.html` in a modern web browser
3. No build process or server required - works directly in the browser

## Deployment on Railway

### Prerequisites
- A Railway account (free tier available)
- Git installed on your local machine
- Railway CLI installed (optional)

### Steps to Deploy

#### Method 1: Using Railway Dashboard (Easiest)

1. **Create a new project** on Railway
2. **Connect your GitHub repository** or upload the project files
3. **Configure the build settings**:
   - Build Command: (leave empty, as this is a static site)
   - Start Command: `npx serve -s .`
   - Output Directory: `.`
4. **Add environment variables** (if needed)
5. **Deploy** - Railway will automatically deploy your site

#### Method 2: Using Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli