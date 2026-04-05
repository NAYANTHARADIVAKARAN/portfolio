import { Component, signal, HostListener, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- The Notebook Background -->
    <div class="notebook-bg min-h-screen text-slate-800 font-typewriter overflow-x-hidden relative selection:bg-yellow-200">
      
      <!-- Notebook Margin Line -->
      <div class="fixed top-0 left-6 md:left-24 bottom-0 w-0.5 bg-red-400/50 z-0 border-l border-red-300/30"></div>
      <div class="fixed top-0 left-8 md:left-[104px] bottom-0 w-px bg-red-400/30 z-0"></div>

      <!-- Coffee Stain Decoration -->
      <div class="fixed top-32 right-12 w-48 h-48 opacity-20 pointer-events-none z-0 transform rotate-45" style="background-image: radial-gradient(circle, transparent 60%, #8b5a2b 65%, #6b4423 70%, transparent 72%); border-radius: 50%; filter: blur(1px);"></div>
      <div class="fixed bottom-32 left-1/4 w-32 h-32 opacity-[0.15] pointer-events-none z-0 transform -rotate-12" style="background-image: radial-gradient(circle, transparent 60%, #8b5a2b 65%, #6b4423 70%, transparent 72%); border-radius: 50%; filter: blur(1px);"></div>

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
          <!-- Tape -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm transform -rotate-2"></div>
          
          <div class="wobbly-box bg-[#fdfbf7] p-8 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] border-2 border-slate-800 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            
            <p class="text-slate-500 font-bold mb-4 text-xl flex items-center gap-2">
              <span class="text-blue-600">&gt;</span> ./hello_world.sh
            </p>
            
            <h1 class="text-5xl md:text-7xl font-handwriting leading-tight mb-8">
              Hi! I'm <br/>
              <span class="relative inline-block mt-2">
                <span class="relative z-10 text-slate-900">Nayanthara Divakaran</span>
                <span class="absolute bottom-1 left-0 w-full h-4 bg-yellow-300/80 -rotate-1 -z-0 mix-blend-multiply"></span>
              </span>
            </h1>

            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="flex-1 space-y-4 text-lg leading-relaxed">
                <p>
                  I'm a software developer with a knack for solving messy problems. Currently focusing my energy on 
                  <span class="font-bold underline decoration-wavy decoration-blue-500">Full Stack Web Development</span>.
                </p>
                <p>
                  I believe code should be robust, and I'm eager to bring that to collaborative development teams!
                </p>
              </div>

              <!-- Sticky Note -->
              <div class="sticky-note bg-yellow-200 p-6 shadow-md w-64 transform rotate-3 flex-shrink-0">
                <div class="w-full flex justify-center mb-2">
                  <div class="w-12 h-4 bg-red-400/40 rounded shadow-sm -mt-8 transform -rotate-6"></div>
                </div>
                <h3 class="font-handwriting text-2xl font-bold mb-2 underline decoration-dashed">Status:</h3>
                <p class="font-handwriting text-xl">Available for work!</p>
                <p class="font-handwriting text-xl">Ready to build dynamic apps.</p>
                
                <!-- Hand drawn arrow -->
                <svg class="absolute -bottom-10 -left-10 w-20 h-20 text-slate-800 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- SKILLS / ABOUT (Scrapbook style) -->
        <section id="page-2" class="py-12 relative">
          <h2 class="text-4xl md:text-5xl font-handwriting font-bold mb-12 relative inline-block">
            My Toolbox
            <svg class="absolute -bottom-2 left-0 w-full h-4 text-blue-500" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" stroke-width="3" />
            </svg>
          </h2>

          <div class="flex flex-wrap gap-8 justify-center">
            
            <!-- Skill Card 1 -->
            <div class="wobbly-box bg-blue-50 p-6 border-2 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full md:w-80 transform -rotate-2">
              <div class="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-sm shadow-black/50">
                <div class="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <h3 class="font-bold text-xl mb-4 border-b-2 border-slate-800/20 pb-2">Core Dev</h3>
              <ul class="font-handwriting text-2xl space-y-2">
                @for (skill of data.skills[0].items.slice(0, 5); track skill) {
                  <li class="flex items-center gap-2">
                    <span class="text-red-500">*</span> {{skill}}
                  </li>
                }
              </ul>
            </div>

            <!-- Skill Card 2 -->
            <div class="wobbly-box bg-green-50 p-6 border-2 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full md:w-80 transform rotate-2 mt-4 md:mt-12">
               <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-500/50 backdrop-blur-sm border border-yellow-600/30 transform -rotate-3"></div>
              <h3 class="font-bold text-xl mb-4 border-b-2 border-slate-800/20 pb-2">Dev Tools & Practices</h3>
              <ul class="font-handwriting text-2xl space-y-2">
                @for (skill of data.skills[1].items.slice(0, 5); track skill) {
                  <li class="flex items-center gap-2">
                    <span class="text-blue-500">~</span> {{skill}}
                  </li>
                }
              </ul>
            </div>

            <!-- Language Tag -->
            <div class="w-full flex justify-end mt-4">
              <div class="sticky-note bg-pink-100 p-4 transform -rotate-6 border border-pink-200 w-64 shadow-md">
                <p class="font-handwriting text-xl font-bold mb-2">I speak:</p>
                <p class="font-typewriter text-sm">{{ data.languages.join(', ') }}</p>
              </div>
            </div>

          </div>
        </section>

        <!-- EXPERIENCE LINE (Hand drawn timeline) -->
        <section id="page-3" class="py-12">
          <div class="flex items-center gap-4 mb-16">
            <h2 class="text-4xl md:text-5xl font-handwriting font-bold">The Journey so far</h2>
            <svg class="w-16 h-16 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </div>

          <div class="relative border-l-4 border-dashed border-slate-400 ml-4 md:ml-8 space-y-16">
            
            @for (exp of data.experience; track exp.role; let i = $index) {
              <div class="relative pl-10 md:pl-16">
                <!-- Messy Timeline Dot -->
                <div class="absolute -left-[14px] top-2 w-6 h-6 bg-yellow-300 border-2 border-slate-800 rounded-full flex items-center justify-center transform hover:scale-125 transition-transform">
                  <div class="w-1 h-1 bg-slate-800 rounded-full"></div>
                </div>

                <div class="bg-white border-2 border-slate-800 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] p-6 rounded-sm">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 class="text-2xl font-bold font-handwriting">{{exp.role}}</h3>
                      <p class="text-slate-600 font-bold bg-slate-100 inline-block px-2 py-1 mt-1 border border-slate-300 transform -rotate-1">{{exp.company}}</p>
                    </div>
                    <span class="font-typewriter text-sm font-bold text-red-600 bg-red-50 px-2 py-1 border border-red-200 transform rotate-1">{{exp.period}}</span>
                  </div>
                  
                  <ul class="space-y-3 font-typewriter text-[15px] leading-relaxed">
                    @for (item of exp.highlights; track item) {
                      <li class="flex items-start gap-3">
                        <span class="text-blue-500 font-bold mt-0.5">-&gt;</span>
                        <span>{{item}}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }

            <!-- Education appended to timeline -->
            @for (edu of data.education; track edu.degree) {
              <div class="relative pl-10 md:pl-16 opacity-80">
                <div class="absolute -left-[10px] top-2 w-4 h-4 bg-slate-300 border-2 border-slate-800 rounded-sm transform rotate-45"></div>
                
                <div>
                  <h3 class="text-xl font-bold font-handwriting text-slate-700">{{edu.degree}}</h3>
                  <p class="text-sm font-typewriter">{{edu.institution}}</p>
                  <p class="text-xs font-bold mt-1">Class of {{edu.year}} | Score: {{edu.score}}</p>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- PROJECTS (Polaroid style) -->
        <section id="page-4" class="py-12">
          <h2 class="text-4xl md:text-5xl font-handwriting font-bold mb-12">Cool things I built</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            @for (project of data.projects; track project.title) {
              
              <!-- Polaroid Card -->
              <div class="bg-white p-4 pb-12 shadow-[8px_8px_15px_rgba(0,0,0,0.15)] border border-slate-200 transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-300 relative group cursor-pointer max-w-md mx-auto">
                
                <!-- Tape -->
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 backdrop-blur-sm border border-white shadow-sm transform rotate-2"></div>
                
                <!-- The "Photo" -->
                <div class="aspect-square bg-slate-800 w-full mb-6 border-4 border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden relative">
                  <!-- Abstract drawing to represent code/project -->
                  <svg class="w-full h-full opacity-20 absolute inset-0 text-white" fill="none" viewBox="0 0 100 100">
                     <path stroke="currentColor" stroke-width="2" d="M10 50 Q 25 10, 50 50 T 90 50 M20 20 L80 80 M80 20 L20 80" />
                     <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" />
                  </svg>
                  
                  <div class="relative z-10">
                    <h3 class="text-white font-bold text-2xl font-handwriting mb-4 tracking-wider">{{project.title}}</h3>
                    <div class="flex flex-wrap justify-center gap-2">
                      @for (tech of project.technologies; track tech) {
                        <span class="px-2 py-1 bg-blue-500 text-white text-xs font-typewriter transform -rotate-2">
                          {{tech}}
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <!-- Handwriting below photo -->
                <p class="font-handwriting text-2xl text-slate-800 text-center px-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {{project.description}}
                </p>
                
                <!-- Hidden details revealed on hover -->
                <div class="absolute inset-0 bg-yellow-100/95 backdrop-blur-sm p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center border-2 border-slate-800">
                  <h4 class="font-bold font-typewriter mb-4 underline">Project Notes:</h4>
                  <ul class="space-y-4 font-handwriting text-xl">
                    @for (achieve of project.achievements; track achieve) {
                      <li class="flex items-start gap-2">
                        <span class="text-red-500 text-2xl leading-none">*</span>
                        {{achieve}}
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- FOOTER (Torn paper piece) -->
        <footer id="page-5" class="mt-20 relative w-full pb-32">
          <!-- Torn edge SVG -->
          <svg class="w-full h-8 text-[#fdfbf7] drop-shadow-md absolute -top-7 left-0" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,100 L0,50 Q5,0 10,50 T20,50 T30,50 T40,50 T50,50 T60,50 T70,50 T80,50 T90,50 T100,50 L100,100 Z" />
          </svg>
          
          <div class="bg-[#fdfbf7] p-8 md:p-12 border-x-2 border-b-2 border-slate-800 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center relative z-10 transform rotate-1">
            <h2 class="text-4xl md:text-6xl font-handwriting font-bold mb-6">Let's grab coffee! ☕</h2>
            <p class="font-typewriter text-lg mb-8 max-w-lg mx-auto">
              If you need an enthusiastic developer who can build seamless, high-performance applications from front to back, I'm your person.
            </p>
            
            <div class="flex flex-col items-center gap-6">
              <a href="mailto:{{data.email}}" class="inline-block px-8 py-3 bg-red-400 hover:bg-red-500 text-white font-bold font-typewriter text-xl border-2 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                {{data.email}}
              </a>
              
              <div class="flex gap-6 font-handwriting text-2xl mt-4">
                <a href="{{data.linkedin}}" target="_blank" class="text-blue-600 hover:text-blue-800 underline decoration-wavy">LinkedIn</a>
                <span>|</span>
                <span class="text-slate-600">{{data.phone}}</span>
                <span>|</span>
                <span class="text-slate-600">{{data.location}}</span>
              </div>
            </div>

            <!-- Hand drawn smiley -->
            <svg class="absolute bottom-4 right-4 w-12 h-12 text-slate-400 transform rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
            </svg>
          </div>
        </footer>

      </main>
    </div>
  `,
  styles: [`
    /* Importing highly organic, human fonts */
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    :host {
      --font-handwriting: 'Caveat', cursive;
      --font-typewriter: 'Space Mono', monospace;
      display: block;
    }

    .font-handwriting { font-family: var(--font-handwriting); }
    .font-typewriter { font-family: var(--font-typewriter); }

    /* The core notebook paper background */
    .notebook-bg {
      background-color: #fdfbf7;
      background-image: linear-gradient(transparent 95%, #cbd5e1 95%);
      background-size: 100% 2rem;
      /* Offset to make the lines match up with text nicely */
      background-position: 0 1.2rem; 
    }

    /* Hand-drawn box effect using complex border-radius */
    .wobbly-box {
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    }

    /* Custom scrollbar to match the theme */
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background: #fdfbf7;
      border-left: 2px solid #cbd5e1;
    }
    ::-webkit-scrollbar-thumb {
      background: #94a3b8; 
      border-radius: 0;
      border: 2px solid #334155;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #f87171; 
    }

    html {
      scroll-behavior: smooth;
    }
  `]
})
export default class App implements OnInit {
  scrolled = signal(false);
  activeSection = signal('page-1');

  navLinks = [
    { name: 'Start', id: 'page-1' },
    { name: 'Tools', id: 'page-2' },
    { name: 'Path', id: 'page-3' },
    { name: 'Work', id: 'page-4' },
    { name: 'Ping', id: 'page-5' },
  ];

  // Colors for the notebook index tabs
  tabColors = ['#fecaca', '#bbf7d0', '#bfdbfe', '#fef08a', '#e9d5ff'];

  data = {
    name: 'Nayanthara Divakaran',
    email: 'nayantharadivakaran080@gmail.com',
    phone: '+91 8078491407',
    location: 'Thalassery, Kannur',
    linkedin: 'https://www.linkedin.com/in/nayanthara-divakaran-4710021b0',
    summary: 'Enthusiastic and adaptable Information Technology graduate with a strong focus on Full Stack web development. Equipped with strong analytical and problem-solving skills derived from hands-on software development experience. Proficient in building dynamic applications utilizing modern frameworks and tools including Python, Angular, React, and Node.js. Excellent verbal and written communicator, eager to apply my technical background to collaborative development teams and make a significant contribution to building seamless, high-performance applications.',
    languages: ['Malayalam', 'English', 'Hindi', 'Tamil'],
    skills: [
      {
        title: 'Core Dev',
        items: ['HTML/CSS', 'Angular', 'React', 'Python', 'Node.js', 'ExpressJS', 'C#', 'MongoDB']
      },
      {
        title: 'Dev Tools & Practices',
        items: ['REST APIs', 'GenAI Integration', 'System Monitoring', 'App Deployment', 'Debugging', 'Code Reviews']
      }
    ],
    experience: [
      {
        role: 'Software Developer Intern',
        company: 'Lidex India Private Limited',
        period: 'Oct 2022 – Apr 2023',
        highlights: [
          'Developed and maintained interactive front-end web applications utilizing Angular.',
          'Built and structured REST APIs for efficient data retrieval and manipulation using Python and MongoDB.',
          'Collaborated effectively with cross-functional teams to ensure software projects were delivered within strict deadlines.',
          'Improved overall application performance through continuous code optimization and rigorous debugging processes.',
          'Participated actively in peer code reviews to ensure strict adherence to industry best coding practices.'
        ]
      },
      {
        role: 'Full Stack Dev (MERN)',
        company: 'ICT Academy Kerala',
        period: 'Nov 2022 – Apr 2023',
        highlights: [
          'Completed an industry-aligned full-stack program designed with input from global tech leaders (including UST).',
          'Built dynamic, high-performance web applications from the ground up utilizing the MERN stack.',
          'Gained hands-on, practical experience in modern application deployment workflows, system monitoring, and performance optimization.',
          'Explored GenAI integration and modern development tools to streamline troubleshooting processes and optimize system deployments.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.Tech - Information Technology',
        institution: 'College of Engineering Thalassery, KTU',
        year: '2022',
        score: '60.4%'
      },
      {
        degree: 'Higher Secondary (Biology Science)',
        institution: 'GHSS. Chundagapoil, Kerala State Board',
        year: '2018',
        score: '73%'
      }
    ],
    projects: [
      {
        title: 'Covid-19 Detection',
        technologies: ['Machine Learning', 'Python'],
        description: 'B.Tech main project utilizing ML techniques to analyze complex cough sound measurements for predictive health diagnostics.',
        achievements: [
          'Successfully processed and analyzed complex data sets, demonstrating strong analytical and problem-solving skills.',
          'Created comprehensive technical documentation detailing the system\'s architecture, showcasing strong written communication skills.'
        ]
      }
    ]
  };

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 20);

    const sections = this.navLinks.map(l => l.id);
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Slightly higher threshold so the active tab changes naturally as you read
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
      const y = element.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top: y, behavior: 'smooth' });
      this.activeSection.set(sectionId);
    }
  }
}