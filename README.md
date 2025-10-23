# Personal Website - Silvio Baratto

Modern personal portfolio website built with Angular 19, featuring a BAML-powered AI chatbot and beautiful gradient design system.

## Features

- 🎨 Modern gradient design system (blue → indigo → purple theme)
- 🤖 AI-powered chatbot using BAML and OpenAI
- 📱 Fully responsive design with mobile-first approach
- ⚡ Server-side rendering (SSR) with Angular Universal
- 🚀 Optimized for Vercel deployment

## Tech Stack

- **Frontend**: Angular 19, Tailwind CSS 4
- **Backend**: Express.js, Angular SSR
- **AI**: BAML, OpenAI GPT-4
- **Deployment**: Vercel (Serverless Functions)

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

## Deploying to Vercel

### 1. Install Vercel CLI (optional)

```bash
npm install -g vercel
```

### 2. Set Environment Variables in Vercel

Go to your Vercel project settings and add the following environment variable:

- `OPENAI_API_KEY`: Your OpenAI API key

**Important**: Make sure to add this to all environments (Production, Preview, Development)

### 3. Deploy

#### Option A: Using Vercel CLI

```bash
vercel --prod
```

#### Option B: Using Git Integration

Simply push to your GitHub repository and Vercel will automatically deploy:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Configuration Files

- `vercel.json`: Configures Vercel deployment and routing
- `api/`: Serverless functions for the chatbot API
  - `serverless-chatbot-stream.ts`: Streaming chat endpoint
  - `serverless-chatbot.ts`: Non-streaming chat endpoint

## Project Structure

```
src/
├── app/
│   ├── pages/          # Page components (home, about, chatbot, etc.)
│   ├── shared/         # Shared components (header, hero, etc.)
│   ├── services/       # Angular services
│   └── app.ts          # Root component
├── assets/             # Static assets
├── styles.css          # Global styles
└── server.ts           # Express server for SSR

api/                    # Vercel serverless functions
├── serverless-chatbot-stream.ts
└── serverless-chatbot.ts

baml_src/               # BAML configurations
└── chatbot.baml        # Chatbot function definitions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for the chatbot | Yes |
| `NODE_ENV` | Environment (production/development) | No |

## Troubleshooting

### 405 Method Not Allowed on `/api/chatbot/stream`

This error occurs if:
1. Environment variables are not set in Vercel
2. The serverless functions are not deployed correctly
3. CORS headers are blocking the request

**Solution**:
- Check that `OPENAI_API_KEY` is set in Vercel dashboard
- Redeploy the project after adding environment variables
- Check Vercel function logs for detailed errors

### Chatbot Not Responding

1. Check that the BAML client is properly initialized
2. Verify OpenAI API key is valid and has credits
3. Check Vercel function logs in the Vercel dashboard

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

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

Silvio Angelo Baratto
- Email: silvio.baratto22@gmail.com
- GitHub: [@SilvioBaratto](https://github.com/SilvioBaratto)
