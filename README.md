# Personal Website - Silvio Baratto

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SilvioBaratto/personal-website)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)](https://tailwindcss.com/)

<div align="center">
  <img src="demo.gif" alt="Website Demo" width="100%">
  <p><i>Preview of the website in action - <a href="https://silviobaratto.com">Visit the live site →</a></i></p>
</div>

Modern personal portfolio website built with Angular 19, featuring a BAML-powered AI chatbot and beautiful gradient design system. This project showcases modern web development practices with server-side rendering, serverless architecture, and AI integration.

**🌐 Live Website**: [silviobaratto.com](https://silviobaratto.com) | [silviobaratto.vercel.app](https://silviobaratto.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Performance & Optimization](#performance--optimization)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- 🎨 **Modern Design System**: Beautiful gradient theme (blue → indigo → purple) built with Tailwind CSS 4
- 🤖 **AI-Powered Chatbot**: Interactive chat interface using BAML and OpenAI GPT-4
- 📱 **Fully Responsive**: Mobile-first approach ensuring perfect display on all devices
- ⚡ **Server-Side Rendering**: Angular Universal for optimal performance and SEO
- 🚀 **Serverless Architecture**: Deployed on Vercel with serverless functions
- ♿ **Accessible**: Following WCAG guidelines for accessibility
- 🎯 **Standalone Components**: Modern Angular architecture with signals and standalone components

## Tech Stack

### Frontend
- **Angular 19**: Latest version with standalone components, signals, and modern reactive patterns
  - Standalone components for better modularity
  - Signals for reactive state management
  - Native control flow syntax (@if, @for, @switch)
  - OnPush change detection for optimal performance
- **Tailwind CSS 4**: Utility-first CSS framework with custom gradient design system
- **TypeScript**: Strict type checking for maintainable code
- **RxJS**: Reactive programming for async operations

### Backend
- **Express.js**: Server for Angular Universal SSR
- **Angular Universal**: Server-side rendering for improved SEO and performance
- **Vercel Serverless Functions**: Scalable backend endpoints for the chatbot

### AI Integration
- **BAML (Boundary ML)**: Type-safe LLM function definitions and structured outputs
- **OpenAI GPT-4**: Language model powering the chatbot
- **Streaming Responses**: Real-time chat experience with Server-Sent Events (SSE)

### Deployment & Infrastructure
- **Vercel**: Edge network deployment with automatic HTTPS
- **Git Integration**: Automatic deployments on push to main branch
- **Environment Variables**: Secure configuration management

## Architecture

### Overview

The application follows a modern serverless architecture with three main layers:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  Angular 19 SPA with SSR-rendered initial content           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ├─ Static Assets (Vercel CDN)
                      │
                      ├─ SSR Requests
                      │  └─> Express.js + Angular Universal
                      │
                      └─ API Requests
                         └─> Vercel Serverless Functions
                             └─> BAML Client
                                 └─> OpenAI API
```

### Key Components

#### 1. Frontend Layer (Angular)
- **Pages**: Home, About, Side Projects, Chatbot
- **Shared Components**: Header, Hero, Footer, Gradient backgrounds
- **Services**: Chat service for API communication
- **State Management**: Angular signals for reactive state
- **Routing**: Lazy-loaded routes for optimal bundle size

#### 2. Server-Side Rendering (SSR)
- **Purpose**: Initial page load optimization and SEO
- **Implementation**: Angular Universal with Express.js
- **Deployment**: Vercel Edge Functions
- **Benefits**:
  - Faster first contentful paint (FCP)
  - Better SEO with crawlable content
  - Social media preview cards

#### 3. Serverless API Layer
- **Location**: `/api` directory
- **Functions**:
  - `serverless-chatbot-stream.ts`: Streaming chat endpoint (SSE)
  - `serverless-chatbot.ts`: Non-streaming chat endpoint (fallback)
- **Features**:
  - CORS-enabled for cross-origin requests
  - Error handling and logging
  - 60-second timeout for long-running requests
  - Automatic scaling

#### 4. AI Integration (BAML)
- **Purpose**: Type-safe LLM function definitions
- **Location**: `baml_src/` directory
- **Benefits**:
  - Structured outputs from LLMs
  - Type safety between frontend and AI responses
  - Easy prompt management and versioning
  - Built-in streaming support

### Data Flow

1. **User Interaction**: User types a message in the chatbot
2. **Frontend**: Angular service sends POST request to `/api/chatbot/stream`
3. **Serverless Function**: Vercel function receives request
4. **BAML Client**: Initializes with OpenAI credentials
5. **OpenAI API**: Processes the request and streams response
6. **SSE Stream**: Response chunks sent back to client in real-time
7. **Frontend Update**: UI updates progressively as tokens arrive

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone git@github.com:SilvioBaratto/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
npm run build
```

## Deployment

### Deploying to Vercel

This project is optimized for deployment on Vercel. Follow these steps:

#### Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository connected to your Vercel account
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))

#### Step 1: Fork or Clone the Repository

```bash
git clone git@github.com:SilvioBaratto/personal-website.git
cd personal-website
```

#### Step 2: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

#### Step 3: Configure Environment Variables

You need to set environment variables in Vercel. There are two ways to do this:

**Option A: Via Vercel Dashboard**

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environments**: Select Production, Preview, and Development

**Option B: Via Vercel CLI**

```bash
vercel env add OPENAI_API_KEY
# Follow the prompts to add the value for each environment
```

**Important Notes**:
- Make sure to add the variable to **all environments** (Production, Preview, Development)
- After adding environment variables, you must redeploy for changes to take effect
- Never commit your `.env` file to version control

#### Step 4: Deploy

**Method 1: Automatic Deployment via Git (Recommended)**

1. Connect your repository to Vercel:
   ```bash
   vercel link
   ```

2. Push to your repository:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. Vercel will automatically:
   - Detect the Angular project
   - Install dependencies
   - Build the application
   - Deploy to production

**Method 2: Manual Deployment via CLI**

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Step 5: Verify Deployment

1. Check the deployment URL provided by Vercel
2. Test the chatbot functionality at `/chatbot`
3. Verify SSR is working by viewing page source
4. Check Vercel function logs for any errors

### Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/silviobaratto/browser",
  "framework": "angular",
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

**Key Configuration Points**:
- **maxDuration**: Set to 60 seconds for AI response generation
- **rewrites**: Routes API requests to serverless functions
- **outputDirectory**: Points to Angular build output

### Serverless Function Endpoints

After deployment, your API endpoints will be available at:

- **Streaming Chat**: `https://your-domain.vercel.app/api/chatbot/stream`
- **Standard Chat**: `https://your-domain.vercel.app/api/chatbot`

### Monitoring and Debugging

**View Logs**:
```bash
vercel logs <deployment-url>
```

**View Function Logs in Dashboard**:
1. Go to your project in Vercel
2. Click on **Deployments**
3. Select a deployment
4. Navigate to **Functions** tab
5. Click on a function to view logs

**Common Deployment Issues**:

1. **Build Failures**: Check `package.json` scripts and dependencies
2. **API Errors**: Verify environment variables are set correctly
3. **Timeout Issues**: Adjust `maxDuration` in `vercel.json` if needed
4. **CORS Errors**: Check CORS headers in serverless functions

### Custom Domain (Optional)

1. Go to **Settings** > **Domains** in Vercel dashboard
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

## Project Structure

```
silviobaratto/
├── src/
│   ├── app/
│   │   ├── pages/                    # Page components
│   │   │   ├── home/                 # Landing page
│   │   │   ├── about/                # About me page
│   │   │   ├── side-projects/        # Projects showcase
│   │   │   └── chatbot/              # AI chatbot interface
│   │   ├── shared/                   # Reusable components
│   │   │   ├── header/               # Navigation header
│   │   │   ├── hero/                 # Hero sections
│   │   │   ├── footer/               # Footer component
│   │   │   └── gradient-bg/          # Gradient backgrounds
│   │   ├── services/                 # Angular services
│   │   │   └── chat.service.ts       # Chatbot API integration
│   │   ├── app.component.ts          # Root component
│   │   ├── app.config.ts             # App configuration
│   │   └── app.routes.ts             # Route definitions
│   ├── assets/                       # Static assets
│   │   ├── images/                   # Images and icons
│   │   └── data/                     # JSON data files
│   ├── styles.css                    # Global styles & Tailwind
│   └── server.ts                     # Express server for SSR
│
├── api/                              # Vercel serverless functions
│   ├── serverless-chatbot-stream.ts  # Streaming chat endpoint
│   └── serverless-chatbot.ts         # Non-streaming endpoint
│
├── baml_src/                         # BAML AI configurations
│   ├── chatbot.baml                  # Chatbot function definitions
│   └── clients.baml                  # OpenAI client configuration
│
├── dist/                             # Build output (generated)
│   └── silviobaratto/
│       ├── browser/                  # Client-side bundle
│       └── server/                   # SSR bundle
│
├── node_modules/                     # Dependencies (generated)
│
├── .env                              # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
├── angular.json                      # Angular CLI configuration
├── package.json                      # Dependencies and scripts
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── vercel.json                       # Vercel deployment config
└── README.md                         # This file
```

### Key Directories Explained

#### `/src/app/pages`
Contains page-level components that represent different routes:
- Each page is a standalone component
- Implements lazy loading for optimal performance
- Uses Angular signals for state management

#### `/src/app/shared`
Reusable components used across multiple pages:
- Header with navigation and mobile menu
- Hero sections with gradient backgrounds
- Footer with social links
- All components use OnPush change detection

#### `/src/app/services`
Injectable services for business logic:
- `ChatService`: Handles API communication with chatbot endpoints
- Uses RxJS for reactive data streams
- Implements error handling and retry logic

#### `/api`
Vercel serverless functions (Node.js runtime):
- Each file exports a default handler function
- Deployed as separate serverless functions
- Auto-scales based on traffic
- 60-second timeout configured

#### `/baml_src`
BAML (Boundary ML) configuration:
- Type-safe LLM function definitions
- Prompt templates and schemas
- OpenAI client configuration
- Generates TypeScript types at build time

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for the chatbot | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## Troubleshooting

### Common Issues and Solutions

#### 1. 405 Method Not Allowed on `/api/chatbot/stream`

**Symptoms**: API endpoint returns 405 error when chatbot tries to connect

**Causes**:
- Environment variables are not set in Vercel
- Serverless functions are not deployed correctly
- CORS headers are blocking the request
- Incorrect API route configuration

**Solutions**:
- Verify `OPENAI_API_KEY` is set in Vercel dashboard under **Settings > Environment Variables**
- Ensure the variable is added to all environments (Production, Preview, Development)
- Redeploy the project after adding environment variables:
  ```bash
  vercel --prod --force
  ```
- Check Vercel function logs for detailed error messages:
  ```bash
  vercel logs --follow
  ```
- Verify `vercel.json` has correct rewrite rules for `/api` routes

#### 2. Chatbot Not Responding

**Symptoms**: Chat interface loads but doesn't respond to messages

**Causes**:
- BAML client initialization failure
- Invalid or expired OpenAI API key
- OpenAI API rate limits or insufficient credits
- Network timeout issues

**Solutions**:
- Check BAML client initialization in browser console
- Verify OpenAI API key is valid at [platform.openai.com](https://platform.openai.com)
- Check OpenAI account has available credits
- Review Vercel function logs:
  - Go to Vercel Dashboard > Project > Deployments
  - Select latest deployment > Functions tab
  - Click on `serverless-chatbot-stream` to view logs
- Increase timeout in `vercel.json` if responses are slow:
  ```json
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60
    }
  }
  ```

#### 3. Build Failures

**Symptoms**: Deployment fails during build step

**Causes**:
- Missing dependencies
- TypeScript compilation errors
- Angular build configuration issues
- Node version mismatch

**Solutions**:
- Check Node.js version matches requirements (Node 20+):
  ```bash
  node --version
  ```
- Clear dependencies and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Run build locally to identify errors:
  ```bash
  npm run build
  ```
- Check Vercel build logs for specific error messages
- Verify `tsconfig.json` settings are correct
- Ensure all imports are correct and files exist

#### 4. SSR Hydration Errors

**Symptoms**: Console warnings about hydration mismatches

**Causes**:
- Different content rendered on server vs client
- Using browser-only APIs during SSR
- Timing-dependent rendering

**Solutions**:
- Use `isPlatformBrowser()` to check environment:
  ```typescript
  import { isPlatformBrowser } from '@angular/common';

  if (isPlatformBrowser(this.platformId)) {
    // Browser-only code
  }
  ```
- Avoid using `window`, `document`, or `localStorage` directly
- Use Angular's platform detection for conditional rendering
- Check for timing-dependent content (dates, random numbers)

#### 5. Slow Loading Times

**Symptoms**: Application takes long to load initially

**Causes**:
- Large bundle sizes
- Missing lazy loading
- Unoptimized images
- Too many HTTP requests

**Solutions**:
- Enable lazy loading for routes in `app.routes.ts`
- Use `NgOptimizedImage` for images
- Analyze bundle size:
  ```bash
  npm run build -- --stats-json
  npx webpack-bundle-analyzer dist/silviobaratto/browser/stats.json
  ```
- Enable Vercel Analytics to monitor performance
- Optimize images and assets
- Use OnPush change detection strategy

#### 6. CORS Errors in Development

**Symptoms**: API requests fail with CORS errors locally

**Causes**:
- Missing CORS headers in serverless functions
- Different origins (localhost:4200 vs localhost:3000)

**Solutions**:
- Add CORS headers to serverless functions (already configured)
- Use proxy configuration in `angular.json`:
  ```json
  "serve": {
    "options": {
      "proxyConfig": "proxy.conf.json"
    }
  }
  ```
- Create `proxy.conf.json`:
  ```json
  {
    "/api": {
      "target": "http://localhost:3000",
      "secure": false
    }
  }
  ```

### Getting More Help

If you're still experiencing issues:

1. **Check the logs**: Always start with Vercel function logs and browser console
2. **Search issues**: Look through [GitHub Issues](https://github.com/SilvioBaratto/personal-website/issues)
3. **Create an issue**: If the problem persists, create a detailed issue with:
   - Error messages
   - Steps to reproduce
   - Environment information
   - Screenshots or logs
4. **Ask for help**: Open a [Discussion](https://github.com/SilvioBaratto/personal-website/discussions)

## Angular CLI Commands

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Performance & Optimization

This project implements several performance optimization techniques:

### Bundle Optimization

**Current Setup**:
- **Production Build**: `npm run build`
- **Bundle Analysis**: `npm run build -- --stats-json && npx webpack-bundle-analyzer dist/silviobaratto/browser/stats.json`

**Optimization Techniques**:
1. **Lazy Loading**: All routes are lazy-loaded to reduce initial bundle size
2. **Tree Shaking**: Unused code is automatically removed during production build
3. **AOT Compilation**: Ahead-of-time compilation for faster rendering
4. **Minification**: Code is minified and compressed in production
5. **Code Splitting**: Separate chunks for vendor, polyfills, and application code

### Server-Side Rendering (SSR)

**Benefits**:
- **Faster FCP**: First Contentful Paint happens on the server
- **SEO**: Search engines can crawl fully-rendered content
- **Social Sharing**: Meta tags are properly set for social media previews

**Implementation**:
- Angular Universal with Express.js
- Deployed as Vercel Edge Functions
- Automatic hydration on the client

### Image Optimization

**Best Practices**:
- Use `NgOptimizedImage` directive for all images
- Serve WebP format with fallbacks
- Implement lazy loading for below-the-fold images
- Use appropriate sizing attributes

**Example**:
```typescript
<img
  ngSrc="/assets/images/hero.jpg"
  width="1200"
  height="800"
  priority
  alt="Hero image"
>
```

### Caching Strategy

**Vercel Edge Caching**:
- Static assets cached at the edge
- Serverless functions cached when possible
- Stale-while-revalidate for optimal performance

**Browser Caching**:
- Versioned assets with long cache times
- Service Worker for offline support (optional)

### Performance Monitoring

**Vercel Analytics**:
1. Enable in Vercel dashboard: **Analytics** tab
2. Install package (optional for detailed insights):
   ```bash
   npm install @vercel/analytics
   ```
3. Add to `app.component.ts`:
   ```typescript
   import { inject } from '@vercel/analytics';
   inject();
   ```

**Web Vitals to Monitor**:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 800ms

### Performance Checklist

- [ ] All images optimized and using `NgOptimizedImage`
- [ ] Routes implement lazy loading
- [ ] Components use OnPush change detection
- [ ] Production build is minified and compressed
- [ ] SSR is working correctly
- [ ] Bundle size is under acceptable limits (< 500KB initial)
- [ ] No console errors in production
- [ ] Lighthouse score > 90 for all categories
- [ ] Web Vitals are in green zone
- [ ] API responses are cached when appropriate

### Advanced Optimizations

**For Future Improvements**:
1. **Service Worker**: Implement PWA with offline support
2. **HTTP/2 Push**: Push critical resources
3. **Preloading**: Preload fonts and critical CSS
4. **Resource Hints**: Use `dns-prefetch`, `preconnect`
5. **CDN**: Use Vercel's global CDN for static assets
6. **Compression**: Enable Brotli compression

## Contributing

Contributions are welcome! This is an open-source project and I appreciate any help in making it better.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub
   git clone git@github.com:YOUR_USERNAME/personal-website.git
   cd personal-website
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style and conventions
   - Use TypeScript strict mode
   - Follow Angular best practices (see CLAUDE.md)
   - Write meaningful commit messages
   - Test your changes locally

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a clear description of your changes
   - Reference any related issues

### Contribution Guidelines

**Code Style**:
- Use TypeScript with strict type checking
- Follow Angular style guide
- Use standalone components (not NgModules)
- Use signals for state management
- Implement OnPush change detection
- Use native control flow (@if, @for, @switch)

**Commit Messages**:
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Before Submitting**:
- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested locally
- [ ] No console errors or warnings
- [ ] Build completes successfully (`npm run build`)
- [ ] Commit messages follow conventional commits
- [ ] PR description clearly explains the changes

### Areas for Contribution

Here are some areas where contributions would be especially welcome:

- **Features**: New page sections, animations, interactions
- **AI/Chatbot**: Improved prompts, new BAML functions, chat features
- **Performance**: Bundle size optimization, lazy loading improvements
- **Accessibility**: A11y improvements, keyboard navigation
- **Testing**: Unit tests, E2E tests, integration tests
- **Documentation**: Improved docs, tutorials, code comments
- **Bug Fixes**: Report and fix any issues you find

### Questions?

Feel free to open a [Discussion](https://github.com/SilvioBaratto/personal-website/discussions) if you have questions about:
- How to implement a feature
- Architecture decisions
- Best practices
- General usage

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Feel free to use this project as a template for your own portfolio!** If you do, I'd appreciate a link back to this repository or a mention. Happy coding!

## Acknowledgments

- **Angular Team**: For the amazing framework and tooling
- **Vercel**: For seamless deployment and hosting
- **OpenAI**: For GPT-4 API powering the chatbot
- **BAML**: For type-safe LLM integration
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For all the amazing libraries and tools

## Contact

**Silvio Angelo Baratto**

- **Email**: silvio.baratto22@gmail.com
- **GitHub**: [@SilvioBaratto](https://github.com/SilvioBaratto)
- **LinkedIn**: [Silvio Baratto](https://www.linkedin.com/in/silvio-baratto/)
- **Website**: [silviobaratto.vercel.app](https://silviobaratto.vercel.app)

---

**Star this repo** if you find it helpful! Contributions and feedback are always welcome.
