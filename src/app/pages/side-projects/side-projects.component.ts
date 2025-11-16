import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-side-projects',
  template: `
    <app-header />
    <main class="pt-16 sm:pt-20 bg-white min-h-screen">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 sm:py-16 lg:py-20 border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Side Projects
            </h1>
            <p class="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Innovative AI solutions from research to production. Exploring the intersection of machine learning,
              finance, and practical applications.
            </p>
          </div>
        </div>
      </section>

      <!-- Projects Grid Section -->
      <section class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            @for (project of projects; track project.title) {
              <article
                class="group bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 transition-all duration-300 flex flex-col"
                [class.hover:shadow-2xl]="true"
                [class.hover:border-blue-500]="true"
                [class.-translate-y-1]="project.highlighted"
                [class.hover:-translate-y-2]="true"
                [class.ring-2]="project.highlighted"
                [class.ring-blue-500]="project.highlighted"
                [class.ring-offset-2]="project.highlighted"
              >
                <!-- Project Title -->
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300"
                    [class.group-hover:text-blue-600]="true">
                  {{ project.title }}
                </h2>

                <!-- Project Description -->
                <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                  {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                  @for (tag of project.tags; track tag) {
                    <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full transition-colors duration-300 hover:bg-blue-100">
                      {{ tag }}
                    </span>
                  }
                </div>

                <!-- View Project Link -->
                @if (project.link) {
                  <a
                    [href]="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm transition-all duration-300 min-h-11"
                    [class.hover:text-blue-700]="true"
                    [class.group/link]="true"
                  >
                    <span>View Project</span>
                    <svg
                      class="w-4 h-4 transition-transform duration-300"
                      [class.group-hover/link:translate-x-1]="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                    <span class="sr-only"> (opens in new tab)</span>
                  </a>
                } @else {
                  <span class="inline-flex items-center gap-2 text-gray-400 font-semibold text-sm min-h-11">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span>Private Project</span>
                  </span>
                }
              </article>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-xl">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Interested in Collaboration?
            </h2>
            <p class="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href="/contact"
              class="inline-flex items-center gap-3 min-h-11 px-8 py-3.5 text-base sm:text-lg font-semibold bg-white text-blue-600 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              [class.hover:bg-blue-50]="true"
              [class.hover:shadow-lg]="true"
              [class.hover:scale-105]="true"
            >
              <span>Get In Touch</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent],
})
export class SideProjectsComponent {
  projects: Project[] = [
    {
      title: 'Formula 1 Championship Prediction',
      description: 'ML system forecasting F1 World Championship outcomes using official telemetry data. Combines Bayesian variance decomposition, 10,000+ Monte Carlo simulations, and ensemble ML (Random Forest, Gradient Boosting, SVM). Features 50+ engineered features, track classification, and hybrid predictions with confidence intervals.',
      tags: ['FastAPI', 'Angular 19', 'FastF1 API', 'Bayesian ML', 'Monte Carlo', 'Docker'],
      link: 'https://github.com/SilvioBaratto/formula_1_championship_prediction',
      highlighted: true,
    },
    {
      title: 'Roldan Hedge Fund',
      description: 'Quantitative portfolio optimization platform combining AI-powered stock analysis (6-factor evaluation) with multi-strategy optimization. Implements Mean-Variance, Black-Litterman with AI views, Risk Parity, HRP, and CVaR optimization. Features macro regime analysis and institutional-grade constraints.',
      tags: ['FastAPI', 'BAML', 'Riskfolio-Lib', 'SQLAlchemy', 'Supabase', 'Quant Finance'],
      highlighted: true,
    },
    {
      title: 'Dietologo AI',
      description: 'Production AI-powered diet generator with weekly meal plans (35 meals/week), AI recipe generation, and smart shopping lists. Live at diet.silviobaratto.com with Google authentication and subscription system. Complete full-stack solution with Docker deployment.',
      tags: ['Angular 19', 'FastAPI', 'BAML', 'OpenAI', 'Supabase', 'Docker', 'Production'],
      link: 'https://diet.silviobaratto.com',
      highlighted: true,
    },
    {
      title: 'Pokemon Text-to-Image Generator',
      description: 'Advanced Conditional VAE generating 64×64 Pokemon images from text using dual conditioning: CLIP ViT-L/14 (768-dim) + categorical attributes (type, color, shape). Features BAML metadata pipeline with OpenAI vision, LPIPS perceptual loss, and 17.8M parameters. Production-ready with FastAPI + Angular frontend.',
      tags: ['PyTorch', 'CLIP', 'BAML', 'OpenAI Vision', 'FastAPI', 'Angular', 'Generative AI'],
      link: 'https://github.com/SilvioBaratto/text_to_pokemon',
      highlighted: true,
    },
    {
      title: 'StockPy',
      description: 'Python machine learning library for stock market analysis implementing LSTM, BiLSTM, GRU, BiGRU, MLP, and Bayesian Neural Networks. Includes probabilistic models (NNHMM, DMM) for financial time series with scikit-learn-style interfaces. Built on PyTorch and Pyro with S&P 500 data downloader.',
      tags: ['PyTorch', 'Pyro', 'LSTM', 'Bayesian Networks', 'Time Series', 'Python'],
      link: 'https://github.com/SilvioBaratto/stockpy',
      highlighted: false,
    },
    {
      title: 'Text-to-Image MNIST Generator',
      description: 'Conditional VAE generating handwritten digit images (0-9) from natural language prompts. Uses SentenceTransformer for semantic text encoding (384-dim) with 20-dimensional latent space. Demonstrates text-conditioned generative modeling fundamentals with KL annealing.',
      tags: ['PyTorch', 'VAE', 'SentenceTransformer', 'MNIST', 'Generative AI'],
      link: 'https://github.com/SilvioBaratto/text_to_image_mnist',
      highlighted: false,
    },
    {
      title: 'Markov Chain Text Prediction',
      description: 'Lightweight text prediction system that learns from WhatsApp conversations to suggest words as you type. Pure Python implementation with zero dependencies, achieving ~100k words/second training speed. Features real-time terminal UI and privacy-focused local processing.',
      tags: ['Python', 'NLP', 'Markov Chains', 'Text Prediction', 'WhatsApp'],
      link: 'https://github.com/SilvioBaratto/markov_chain_text_prediction',
      highlighted: false,
    },
  ];

  getTotalTags(): number {
    const uniqueTags = new Set(this.projects.flatMap(p => p.tags));
    return uniqueTags.size;
  }
}
