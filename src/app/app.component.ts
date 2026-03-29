import { Component, signal, HostListener, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- The Notebook Background -->
    <div class="notebook-bg min-h-screen text-slate-800 font-typewriter overflow-x-hidden relative selection:bg-yellow-200">
      
      <!-- Notebook Margin Line -->
      <div class="fixed top-0 left-6 md:left-24 bottom-0 w-0.5 bg-red-400/50 z-0 border-l border-red-300/30"></div>
      <div class="fixed top-0 left-8 md:left-[104px] bottom-0 w-px bg-red-400/30 z-0"></div>

      <!-- Coffee Stain Decoration -->
      <div class="fixed top-32 right-12 w-48 h-48 opacity-20 pointer-events-none z-0 transform rotate-45" style="background-image: radial-gradient(circle, transparent 60%, #8b5a2b 65%, #6b4423 70%, transparent 72%); border-radius: 50%; filter: blur(1px);"></div>

      <!-- Notebook Navigation Tabs (Right Side) -->
      <nav class="fixed right-0 top-1/4 z-50 flex flex-col gap-4">
        @for (link of navLinks; track link.id; let i = $index) {
          <button 
            (click)="scrollTo(link.id)"
            [class]="'notebook-tab group relative right-[-10px] hover:right-0 transition-all duration-300 px-4 py-2 text-lg font-handwriting shadow-md border-2 border-slate-700 rounded-l-lg ' + (activeSection() === link.id ? 'right-0 font-bold z-10' : 'z-0 opacity-90')"
            [style.background-color]="tabColors[i % tabColors.length]"
            [style.transform]="'rotate(' + (i % 2 === 0 ? '-2deg' : '2deg') + ')'">
            {{ link.name }}
          </button>
        }
      </nav>

      <!-- Main Notebook Content -->
      <main class="relative z-10 pl-12 md:pl-36 pr-6 md:pr-16 py-20 max-w-5xl mx-auto flex flex-col gap-32">
        
        <!-- INTRO PAGE -->
        <section id="page-1" class="min-h-[80vh] flex flex-col justify-center relative">
          <div class="wobbly-box bg-[#fdfbf7] p-8 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] border-2 border-slate-800 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <p class="text-slate-500 font-bold mb-4 text-xl flex items-center gap-2">
              <span class="text-blue-600">&gt;</span> ./hello_world.sh
            </p>
            
            <h1 class="text-5xl md:text-7xl font-handwriting leading-tight mb-8">
              Hi! I'm <br/>
              <span class="relative inline-block mt-2">
                <span class="relative z-10 text-slate-900">{{data.name}}</span>
                <span class="absolute bottom-1 left-0 w-full h-4 bg-yellow-300/80 -rotate-1 -z-0 mix-blend-multiply"></span>
              </span>
            </h1>

            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="flex-1 space-y-4 text-lg leading-relaxed">
                <p>{{data.summary}}</p>
              </div>

              <!-- Sticky Note -->
              <div class="sticky-note bg-yellow-200 p-6 shadow-md w-64 transform rotate-3 flex-shrink-0">
                <h3 class="font-handwriting text-2xl font-bold mb-2 underline">Status:</h3>
                <p class="font-handwriting text-xl">Available for work!</p>
              </div>
            </div>
          </div>
        </section>

        <!-- TOOLBOX -->
        <section id="page-2" class="py-12 relative">
          <h2 class="text-4xl md:text-5xl font-handwriting font-bold mb-12">My Toolbox</h2>
          <div class="flex flex-wrap gap-8 justify-center">
            @for (skillGroup of data.skills; track skillGroup.title) {
              <div class="wobbly-box bg-white p-6 border-2 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full md:w-80">
                <h3 class="font-bold text-xl mb-4 border-b-2 border-slate-800/20 pb-2">{{skillGroup.title}}</h3>
                <ul class="font-handwriting text-2xl space-y-2">
                  @for (skill of skillGroup.items; track skill) {
                    <li class="flex items-center gap-2">
                      <span class="text-red-500">*</span> {{skill}}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </section>

        <!-- PATH -->
        <section id="page-3" class="py-12">
          <h2 class="text-4xl md:text-5xl font-handwriting font-bold mb-12">The Journey</h2>
          <div class="relative border-l-4 border-dashed border-slate-400 ml-4 space-y-16">
            @for (exp of data.experience; track exp.company) {
              <div class="relative pl-10">
                <div class="absolute -left-[14px] top-2 w-6 h-6 bg-yellow-300 border-2 border-slate-800 rounded-full"></div>
                <div class="bg-white border-2 border-slate-800 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] p-6">
                  <h3 class="text-2xl font-bold font-handwriting">{{exp.role}}</h3>
                  <p class="text-slate-600 font-bold italic">{{exp.company}} | {{exp.period}}</p>
                  <ul class="mt-4 space-y-2 font-typewriter text-sm">
                    @for (point of exp.highlights; track point) {
                      <li>- {{point}}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- CONTACT -->
        <footer id="page-5" class="mt-20">
          <div class="bg-[#fdfbf7] p-8 md:p-12 border-2 border-slate-800 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center transform rotate-1">
            <h2 class="text-4xl md:text-6xl font-handwriting font-bold mb-6">Contact Me ☕</h2>
            <div class="flex flex-col items-center gap-4 font-typewriter">
              <a [href]="'mailto:' + data.email" class="text-xl font-bold underline">{{data.email}}</a>
              <p class="text-lg">{{data.phone}}</p>
              <p>{{data.location}}</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
    :host {
      --font-handwriting: 'Caveat', cursive;
      --font-typewriter: 'Space Mono', monospace;
      display: block;
    }
    .font-handwriting { font-family: var(--font-handwriting); }
    .font-typewriter { font-family: var(--font-typewriter); }
    .notebook-bg {
      background-color: #fdfbf7;
      background-image: linear-gradient(transparent 95%, #cbd5e1 95%);
      background-size: 100% 2rem;
      background-position: 0 1.2rem; 
    }
    .wobbly-box { border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; }
    html { scroll-behavior: smooth; }
  `]
})
export default class App implements OnInit {
  scrolled = signal(false);
  activeSection = signal('page-1');
  navLinks = [
    { name: 'Start', id: 'page-1' },
    { name: 'Tools', id: 'page-2' },
    { name: 'Path', id: 'page-3' },
    { name: 'Ping', id: 'page-5' },
  ];
  tabColors = ['#fecaca', '#bbf7d0', '#bfdbfe', '#fef08a', '#e9d5ff'];

  data = {
    name: 'Nayanthara Divakaran',
    email: 'nayantharadivakaran080@gmail.com',
    phone: '+91 8078491407',
    location: 'Thalassery, Kannur',
    linkedin: 'https://www.linkedin.com/in/nayanthara-divakaran-4710021b0',
    summary: 'Enthusiastic and adaptable Information Technology graduate focused on Full Stack development. Proficient in Angular, React, and Python.',
    skills: [
      { title: 'Core Dev', items: ['HTML/CSS', 'Angular', 'React', 'Python', 'Node.js', 'MongoDB'] },
      { title: 'Tools', items: ['REST APIs', 'GenAI', 'Git', 'Debugging'] }
    ],
    experience: [
      {
        role: 'Software Developer Intern',
        company: 'Lidex India',
        period: 'Oct 2022 – Apr 2023',
        highlights: ['Built Angular apps', 'Developed REST APIs', 'Optimized code']
      },
      {
        role: 'Full Stack Dev (MERN)',
        company: 'ICT Academy Kerala',
        period: 'Nov 2022 – Apr 2023',
        highlights: ['MERN Stack projects', 'Cloud deployment', 'GenAI tools']
      }
    ],
    education: [
      { degree: 'B.Tech IT', institution: 'CE Thalassery', year: '2022', score: '60.4%' }
    ]
  };

  ngOnInit() { this.onWindowScroll(); }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = this.navLinks.map(l => l.id);
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 50, behavior: 'smooth' });
      this.activeSection.set(sectionId);
    }
  }
}