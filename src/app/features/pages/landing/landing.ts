import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';

interface LandingCopy {
  nav: { services: string; work: string; technology: string; process: string; enterprise: string; contact: string; quote: string };
  hero: { eyebrow: string; title: string; highlight: string; description: string; primary: string; secondary: string; note: string; scroll: string };
  trust: { label: string; items: string[] };
  services: { eyebrow: string; title: string; description: string; cards: Array<{ number: string; title: string; body: string; tags: string[] }> };
  portfolio: { eyebrow: string; title: string; description: string; view: string; items: Array<{ label: string; title: string; body: string; image: string; color: string }> };
  technologies: { eyebrow: string; title: string; description: string; groups: Array<{ title: string; items: string[] }> };
  process: { eyebrow: string; title: string; steps: Array<{ number: string; title: string; body: string }> };
  founders: { eyebrow: string; title: string; description: string; people: Array<{ name: string; role: string; body: string; image: string; linkedin?: string }> };
  contact: { eyebrow: string; title: string; body: string; email: string; whatsapp: string; emailCta: string; whatsappCta: string; noCost: string };
  footer: { caption: string; rights: string };
}

const spanishCopy: LandingCopy = {
  nav: { services: 'Servicios', work: 'Portafolio', technology: 'Tecnologías', process: 'Proceso', enterprise: 'Enterprise', contact: 'Contacto', quote: 'Cotizar sin costo' },
  hero: { eyebrow: 'Software que mueve negocios', title: 'La tecnología correcta convierte', highlight: 'complejidad en ventaja.', description: 'Diseñamos y construimos software a la medida para empresas que necesitan avanzar con claridad, velocidad y control.', primary: 'Hablemos de tu proyecto', secondary: 'Explorar soluciones', note: 'Estrategia · Diseño · Ingeniería · Evolución', scroll: 'Descubre ARSA' },
  trust: { label: 'Especialistas en', items: ['OCR & automatización', 'CRM & operación', 'MVP & demos', 'Realidad aumentada'] },
  services: {
    eyebrow: 'Lo que hacemos', title: 'De una idea ambiciosa a una operación que funciona.', description: 'Un equipo senior para resolver retos complejos: desde modernizar un sistema legacy hasta lanzar una experiencia digital completamente nueva.', cards: [
      { number: '01', title: 'Software a la medida', body: 'Plataformas web, móviles y de escritorio diseñadas alrededor de tus procesos, tus datos y tus metas.', tags: ['MVP', 'CRM', 'APIs'] },
      { number: '02', title: 'Modernización & soporte', body: 'Tomamos software existente, reducimos fricción y lo preparamos para crecer sin detener la operación.', tags: ['Legacy', 'QA', 'Soporte 24/7'] },
      { number: '03', title: 'Datos que deciden', body: 'Bases de datos, integraciones y automatizaciones que convierten información dispersa en decisiones accionables.', tags: ['SQL', 'Cloud', 'BI'] },
      { number: '04', title: 'Experiencias inmersivas', body: 'OCR, realidad virtual, realidad aumentada y demos interactivas para que tu producto se entienda y se recuerde.', tags: ['OCR', 'VR/AR', '3D'] },
    ]
  },
  portfolio: {
    eyebrow: 'Hecho por ARSA', title: 'Productos que ya están moviendo operaciones.', description: 'Nuestro portafolio combina producto, ingeniería y conocimiento de negocio. Estas son algunas soluciones que hemos llevado de la idea a la realidad.', view: 'Ver solución', items: [
      { label: 'Ecosistema fiscal', title: 'IFRAT', body: 'Automatización fiscal, CFDI, folios, pagos y operación empresarial en un solo ecosistema.', image: '/dashboard-ifrat.png', color: 'blue' },
      { label: 'Delivery & commerce', title: 'PideFácil', body: 'Pedidos, comercios y clientes conectados en una experiencia ágil para cualquier dispositivo.', image: '/portfolio/pidefacil-logo.png', color: 'cyan' },
      { label: 'Comercio local', title: 'Menú Fácil', body: 'Catálogos digitales, pedidos y operación local para que cada negocio tenga su propio canal.', image: '/portfolio/menu-facil-logo.png', color: 'sky' },
      { label: 'Movilidad', title: 'Run Run Run', body: 'Una experiencia móvil gamificada para actividad física, retos y hábitos saludables.', image: '/portfolio/run-run-run-logo.png', color: 'mint' },
      { label: 'Identidad digital', title: 'Cards Studio', body: 'Tarjetas digitales, QR y perfiles compartibles para convertir contactos en oportunidades.', image: '/portfolio/cards-studio-logo.png', color: 'teal' },
      { label: 'Juegos sociales', title: 'ConQuién', body: 'Juegos de cartas y mesa llevados a una experiencia digital divertida y multiplataforma.', image: '/portfolio/conquien.png', color: 'gold' },
      { label: 'Automatización', title: 'ARSAx', body: 'Herramientas internas y automatización para que los equipos trabajen con más foco.', image: '/portfolio/arsax.png', color: 'blue-dark' },
      { label: 'Conocimiento', title: 'Scriptura', body: 'Lectura, búsqueda, notas y contenido de conocimiento con una experiencia offline-first.', image: '/portfolio/scriptura-logo.png', color: 'indigo' },
      { label: 'Pagos', title: 'Cobra Fácil', body: 'Cobros desde el celular, productos e historial para negocios que necesitan vender simple.', image: '/portfolio/cobra-facil-logo.png', color: 'aqua' },
      { label: 'Mensajería', title: 'TribuFi', body: 'Mensajería resiliente y comunicación offline-first para dispositivos y equipos distribuidos.', image: '/portfolio/tribufi-logo.png', color: 'blue' },
    ]
  },
  technologies: {
    eyebrow: 'Nuestro stack', title: 'Elegimos la herramienta que mejor resuelve el reto.', description: 'Experiencia amplia, criterio técnico y la flexibilidad para trabajar con tu realidad actual.', groups: [
      { title: 'Ingeniería', items: ['.NET', 'PHP', 'Java', 'JavaScript', 'Python', 'COBOL', 'Kotlin', 'Go'] },
      { title: 'Producto', items: ['Android', 'iOS', 'Flutter', 'React', 'Angular', 'APIs', 'OCR', 'Realidad aumentada'] },
      { title: 'Infraestructura', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'AWS', 'GCP', 'CI / CD', 'Seguridad', 'Observabilidad'] },
    ]
  },
  process: {
    eyebrow: 'Cómo trabajamos', title: 'Claridad primero. Código después.', steps: [
      { number: '01', title: 'Entendemos', body: 'Escuchamos el negocio, mapeamos la operación y encontramos la oportunidad que realmente importa.' },
      { number: '02', title: 'Diseñamos', body: 'Aterrizamos alcance, experiencia y arquitectura con prototipos que todos pueden validar.' },
      { number: '03', title: 'Construimos', body: 'Desarrollamos por etapas, mostramos avances y dejamos valor tangible desde el primer sprint.' },
      { number: '04', title: 'Evolucionamos', body: 'Acompañamos el lanzamiento, medimos resultados y hacemos que el software siga creciendo contigo.' },
    ]
  },
  founders: {
    eyebrow: 'Quiénes crean ARSA', title: 'Socios fundadores. Desarrolladores de software. Constructores de futuro.', description: 'ARSA nace de una sociedad entre personas que entienden la tecnología desde el producto, la arquitectura y la operación. Diseñamos soluciones porque también las construimos.', people: [

      { name: 'Francisco Arteaga', role: 'Socio fundador · Arquitectura y desarrollo', body: 'Fundador y desarrollador de software. Convierte retos complejos en productos estables, escalables y útiles para las personas que los operan.', image: '/founders/francisco-arteaga.png', linkedin: 'https://www.linkedin.com/in/francisco-arteaga-5b985785/' },
      { name: 'Juan López Sarrelangue', role: 'Socio fundador · Producto e ingeniería', body: 'Fundador y desarrollador de software. Lidera la visión de producto y la construcción de soluciones a la medida que conectan operación, datos y crecimiento.', image: '/founders/juan-lopez-sarrelangue.png' },
    ]
  },
  contact: { eyebrow: 'Tu siguiente movimiento', title: 'Hablemos de lo que tu negocio puede llegar a ser.', body: 'Cuéntanos el reto. Te respondemos con una conversación clara y una cotización sin costo.', email: 'ing.juanlopezsa@gmail.com', whatsapp: 'Escríbenos por WhatsApp', emailCta: 'Enviar un correo', whatsappCta: 'Abrir WhatsApp', noCost: 'Primera conversación sin costo' },
  footer: { caption: 'Software a la medida para empresas que quieren avanzar.', rights: 'Todos los derechos reservados.' },
};

const englishCopy: LandingCopy = {
  ...spanishCopy,
  nav: { services: 'Services', work: 'Portfolio', technology: 'Technology', process: 'Process', enterprise: 'Enterprise', contact: 'Contact', quote: 'Free estimate' },
  hero: { eyebrow: 'Software that moves business', title: 'The right technology turns', highlight: 'complexity into advantage.', description: 'We design and build custom software for companies that need to move forward with clarity, speed and control.', primary: "Let's talk about your project", secondary: 'Explore solutions', note: 'Strategy · Design · Engineering · Evolution', scroll: 'Discover ARSA' },
  trust: { label: 'Experts in', items: ['OCR & automation', 'CRM & operations', 'MVP & demos', 'Augmented reality'] },
  services: {
    eyebrow: 'What we do', title: 'From an ambitious idea to an operation that works.', description: 'A senior team for complex challenges: from modernizing legacy systems to launching a completely new digital experience.', cards: [
      { number: '01', title: 'Custom software', body: 'Web, mobile and desktop platforms designed around your processes, data and business goals.', tags: ['MVP', 'CRM', 'APIs'] },
      { number: '02', title: 'Modernization & support', body: 'We take existing software, reduce friction and prepare it to grow without interrupting operations.', tags: ['Legacy', 'QA', '24/7 support'] },
      { number: '03', title: 'Data that drives decisions', body: 'Databases, integrations and automations that turn scattered information into actionable decisions.', tags: ['SQL', 'Cloud', 'BI'] },
      { number: '04', title: 'Immersive experiences', body: 'OCR, virtual reality, augmented reality and interactive demos that make your product clear and memorable.', tags: ['OCR', 'VR/AR', '3D'] },
    ]
  },
  portfolio: {
    eyebrow: 'Made by ARSA', title: 'Products already moving operations.', description: 'Our portfolio combines product, engineering and business insight. These are some solutions we have taken from idea to reality.', view: 'View solution', items: [
      { label: 'Tax ecosystem', title: 'IFRAT', body: 'Tax automation, CFDI, folios, payments and business operations in one ecosystem.', image: '/dashboard-ifrat.png', color: 'blue' },
      { label: 'Delivery & commerce', title: 'PideFácil', body: 'Orders, merchants and customers connected through an agile experience on every device.', image: '/portfolio/pidefacil-logo.png', color: 'cyan' },
      { label: 'Local commerce', title: 'Menú Fácil', body: 'Digital catalogs, orders and local operations so every business can have its own channel.', image: '/portfolio/menu-facil-logo.png', color: 'sky' },
      { label: 'Mobility', title: 'Run Run Run', body: 'A gamified mobile experience for physical activity, challenges and healthier habits.', image: '/portfolio/run-run-run-logo.png', color: 'mint' },
      { label: 'Digital identity', title: 'Cards Studio', body: 'Digital cards, QR codes and shareable profiles that turn contacts into opportunities.', image: '/portfolio/cards-studio-logo.png', color: 'teal' },
      { label: 'Social games', title: 'ConQuién', body: 'Board and card games transformed into a fun, multiplatform digital experience.', image: '/portfolio/conquien.png', color: 'gold' },
      { label: 'Automation', title: 'ARSAx', body: 'Internal tools and automation that help teams work with greater focus.', image: '/portfolio/arsax.png', color: 'blue-dark' },
      { label: 'Knowledge', title: 'Scriptura', body: 'Reading, search, notes and knowledge content with an offline-first experience.', image: '/portfolio/scriptura-logo.png', color: 'indigo' },
      { label: 'Payments', title: 'Cobra Fácil', body: 'Mobile payments, products and history for businesses that need to sell simply.', image: '/portfolio/cobra-facil-logo.png', color: 'aqua' },
      { label: 'Messaging', title: 'TribuFi', body: 'Resilient messaging and offline-first communication for distributed devices and teams.', image: '/portfolio/tribufi-logo.png', color: 'blue' },
    ]
  },
  technologies: {
    eyebrow: 'Our stack', title: 'We choose the tool that best solves the challenge.', description: 'Broad experience, technical judgment and the flexibility to work with your current reality.', groups: [
      { title: 'Engineering', items: ['.NET', 'PHP', 'Java', 'JavaScript', 'Python', 'COBOL', 'Kotlin', 'Go'] },
      { title: 'Product', items: ['Android', 'iOS', 'Flutter', 'React', 'Angular', 'APIs', 'OCR', 'Augmented reality'] },
      { title: 'Infrastructure', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'AWS', 'GCP', 'CI / CD', 'Security', 'Observability'] },
    ]
  },
  process: {
    eyebrow: 'How we work', title: 'Clarity first. Code second.', steps: [
      { number: '01', title: 'Understand', body: 'We listen to the business, map the operation and find the opportunity that truly matters.' },
      { number: '02', title: 'Design', body: 'We define scope, experience and architecture with prototypes everyone can validate.' },
      { number: '03', title: 'Build', body: 'We develop in stages, share progress and deliver tangible value from the first sprint.' },
      { number: '04', title: 'Evolve', body: 'We support the launch, measure results and keep the software growing with your business.' },
    ]
  },
  founders: {
    eyebrow: 'Who builds ARSA', title: 'Founding partners. Software developers. Builders of what comes next.', description: 'ARSA was born from a partnership of people who understand technology through product, architecture and operations. We design solutions because we build them too.', people: [

      { name: 'Francisco Arteaga', role: 'Founding partner · Architecture & development', body: 'Founder and software developer. He turns complex challenges into stable, scalable and useful products for the people who operate them.', image: '/founders/francisco-arteaga.png', linkedin: 'https://www.linkedin.com/in/francisco-arteaga-5b985785/' },
      { name: 'Juan López Sarrelangue', role: 'Founding partner · Product & engineering', body: 'Founder and software developer. He leads product vision and the creation of custom solutions that connect operations, data and growth.', image: '/founders/juan-lopez-sarrelangue.png' },
    ]
  },
  contact: { ...spanishCopy.contact, eyebrow: 'Your next move', title: 'Let’s talk about what your business can become.', body: 'Tell us about the challenge. We will reply with a clear conversation and a free estimate.', whatsapp: 'Write to us on WhatsApp', whatsappCta: 'Open WhatsApp', emailCta: 'Send an email', noCost: 'First conversation is free' },
  footer: { caption: 'Custom software for companies ready to move forward.', rights: 'All rights reserved.' },
};

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') networkCanvas?: ElementRef<HTMLCanvasElement>;
  readonly copy = signal<LandingCopy>(spanishCopy);
  readonly language = signal<'es' | 'en'>('es');
  readonly activePortfolio = signal(0);
  readonly currentYear = new Date().getFullYear();
  readonly whatsappUrl = `https://wa.me/528361102662?text=${encodeURIComponent('Hola ARSA, me interesa conocer sus soluciones de software a la medida y solicitar una cotización sin costo.')}`;
  private animationFrame = 0;
  private resizeObserver?: ResizeObserver;
  private reducedMotion = false;
  private portfolioSwipeStartX = 0;
  private portfolioSwipeStartY = 0;
  private portfolioSwipeActive = false;

  ngAfterViewInit(): void {
    const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'es';
    this.setLanguage(browserLanguage.startsWith('en') ? 'en' : 'es');
    this.setupNetwork();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
  }

  setLanguage(language: 'es' | 'en'): void {
    this.language.set(language);
    this.copy.set(language === 'en' ? englishCopy : spanishCopy);
    if (typeof document !== 'undefined') document.documentElement.lang = language;
    void this.loadLocaleMeta(language);
  }

  selectPortfolio(index: number): void {
    this.activePortfolio.set(index);
  }

  nextPortfolio(): void {
    const total = this.copy().portfolio.items.length;
    this.activePortfolio.update((index) => (index + 1) % total);
  }

  previousPortfolio(): void {
    const total = this.copy().portfolio.items.length;
    this.activePortfolio.update((index) => (index - 1 + total) % total);
  }

  portfolioPosition(index: number): 'is-active' | 'is-prev' | 'is-next' | 'is-hidden' {
    const total = this.copy().portfolio.items.length;
    const active = this.activePortfolio();
    const offset = (index - active + total) % total;
    if (offset === 0) return 'is-active';
    if (offset === 1) return 'is-next';
    if (offset === total - 1) return 'is-prev';
    return 'is-hidden';
  }

  formatPortfolioIndex(index: number): string {
    return index.toString().padStart(2, '0');
  }

  startPortfolioSwipe(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);
    this.portfolioSwipeStartX = event.clientX;
    this.portfolioSwipeStartY = event.clientY;
    this.portfolioSwipeActive = true;
  }

  endPortfolioSwipe(event: PointerEvent): void {
    if (!this.portfolioSwipeActive) return;

    const distanceX = event.clientX - this.portfolioSwipeStartX;
    const distanceY = event.clientY - this.portfolioSwipeStartY;
    this.portfolioSwipeStartX = 0;
    this.portfolioSwipeStartY = 0;
    this.portfolioSwipeActive = false;

    if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
    if (distanceX < 0) this.nextPortfolio();
    else this.previousPortfolio();
  }

  cancelPortfolioSwipe(): void {
    this.portfolioSwipeStartX = 0;
    this.portfolioSwipeStartY = 0;
    this.portfolioSwipeActive = false;
  }

  private async loadLocaleMeta(language: 'es' | 'en'): Promise<void> {
    try {
      const response = await fetch(`/i18n/${language}.json`);
      if (!response.ok) return;
      const locale = (await response.json()) as { meta?: { title?: string } };
      if (locale.meta?.title && typeof document !== 'undefined') document.title = locale.meta.title;
    } catch {
      // The landing has an in-code fallback so it still works offline.
    }
  }

  private setupNetwork(): void {
    const canvas = this.networkCanvas?.nativeElement;
    if (!canvas) return;
    const section = canvas.parentElement;
    if (!section) return;
    this.reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = canvas.getContext('2d');
    if (!context) return;
    const nodes = Array.from({ length: 24 }, (_, index) => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00035, vy: (Math.random() - 0.5) * 0.00035, size: index % 6 === 0 ? 3 : 1.6 }));
    const draw = () => {
      const width = section.clientWidth;
      const height = section.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        if (!this.reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > 1) node.vx *= -1;
          if (node.y < 0 || node.y > 1) node.vy *= -1;
        }
      });
      for (let index = 0; index < nodes.length; index++) {
        const a = nodes[index];
        for (let next = index + 1; next < nodes.length; next++) {
          const b = nodes[next];
          const distance = Math.hypot((a.x - b.x) * width, (a.y - b.y) * height);
          if (distance < 180) {
            context.strokeStyle = `rgba(177, 255, 69, ${0.2 * (1 - distance / 180)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x * width, a.y * height);
            context.lineTo(b.x * width, b.y * height);
            context.stroke();
          }
        }
      }
      nodes.forEach((node) => {
        context.fillStyle = node.size > 2 ? '#31b9df' : 'rgba(49,185,223,.62)';
        context.beginPath();
        context.arc(node.x * width, node.y * height, node.size, 0, Math.PI * 2);
        context.fill();
      });
      this.animationFrame = requestAnimationFrame(draw);
    };
    this.resizeObserver = new ResizeObserver(() => draw());
    this.resizeObserver.observe(section);
    draw();
  }
}
