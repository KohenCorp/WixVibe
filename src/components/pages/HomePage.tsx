// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Check, 
  ArrowUpRight, 
  Trophy, 
  Users, 
  TrendingUp, 
  Briefcase,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Services, Portfolio, Testimonials } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Animation Component (Crash-Proof) ---
const AnimatedElement: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  threshold?: number;
}> = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay if requested
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Main Component ---
export default function HomePage() {
  const navigate = useNavigate();
  
  // Data State
  const [services, setServices] = useState<Services[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  
  // Loading State
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await BaseCrudService.getAll<Services>('services', [], { limit: 3 });
        setServices(servicesData.items);
      } catch (e) { console.error(e); } finally { setIsLoadingServices(false); }

      try {
        const portfolioData = await BaseCrudService.getAll<Portfolio>('portfolio', [], { limit: 4 });
        setPortfolio(portfolioData.items);
      } catch (e) { console.error(e); } finally { setIsLoadingPortfolio(false); }

      try {
        const testimonialsData = await BaseCrudService.getAll<Testimonials>('testimonials', [], { limit: 3 });
        setTestimonials(testimonialsData.items);
      } catch (e) { console.error(e); } finally { setIsLoadingTestimonials(false); }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E85A3D 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.05 }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <AnimatedElement>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight mb-8 text-foreground">
                  Building brands, <br />
                  <span className="relative inline-block text-foreground">
                    one success
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.00025 6.99997C52.0003 0.999967 152 -2.00003 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>{' '}
                  story at a time.
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                  We are excited for our work and how it positively impacts clients. With over 12 years of experience, we have been constantly providing excellent solutions.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button 
                    onClick={() => navigate('/services')}
                    className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 text-base font-medium shadow-lg hover:shadow-primary/25"
                  >
                    Explore services
                  </Button>
                  <Button 
                    onClick={() => navigate('/about')}
                    variant="ghost" 
                    className="h-14 px-8 rounded-full hover:bg-secondary text-foreground text-base font-medium group"
                  >
                    About agency
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={600}>
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted">
                         <Image 
                          src={'https://static.wixstatic.com/media/fd83df_264c70364bfe4cd9997d8e0e11104a5a~mv2.png?originWidth=1152&originHeight=640'} 
                          alt="Client" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-background bg-primary text-white flex items-center justify-center text-xs font-bold">
                      2k+
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-primary mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Trusted by 20k+ clients</p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Hero Image */}
            <div className="relative lg:h-[700px] flex items-center justify-center">
              <AnimatedElement delay={300} className="relative w-full h-full">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image 
                    src="https://static.wixstatic.com/media/fd83df_92df76fac2ad46278795b69fffda71dd~mv2.png?originWidth=1152&originHeight=640" 
                    alt="Creative Team" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Badge 1 */}
                  <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[200px] animate-bounce-slow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <p className="text-lg font-bold text-foreground">93%</p>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[93%]"></div>
                    </div>
                  </div>

                  {/* Floating Badge 2 */}
                  <div className="absolute bottom-10 left-10 bg-foreground text-background p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-[240px]">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Awards Winner</p>
                      <p className="text-base font-bold">Site of the Day</p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 border-y border-border/40 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "20K+", label: "Happy clients" },
              { num: "98%", label: "Success rate" },
              { num: "93%", label: "Growth rate" },
              { num: "12+", label: "Years exp." }
            ].map((stat, idx) => (
              <AnimatedElement key={idx} delay={idx * 100}>
                <div className="text-center group cursor-default">
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{stat.num}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl -z-10" />
                <Image 
                  src="https://static.wixstatic.com/media/fd83df_e3f8b51279e94085a6b52909db938073~mv2.png?originWidth=960&originHeight=768" 
                  alt="About Agency" 
                  className="w-full rounded-[2rem] shadow-2xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-4xl font-bold text-primary mb-1">28+</p>
                  <p className="text-sm font-medium text-muted-foreground">Years of trusted<br/>experience.</p>
                </div>
              </div>
            </AnimatedElement>

            <div className="order-1 lg:order-2">
              <AnimatedElement>
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
                  Who we are
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8 leading-tight">
                  We're a creative <br/>
                  <span className="text-primary">digital agency.</span>
                </h2>
              </AnimatedElement>
              
              <AnimatedElement delay={200}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We are excited for our work and how it positively impacts clients. With over 12 years of experience have been constantly providing excellent solutions. We help you to go online and increase your sales.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Brand Strategy & Art Direction', 'UX/UI Design & Website Design', 'Mobile App Design & Development'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => navigate('/about')}
                  className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-primary transition-colors"
                >
                  More about us
                </Button>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedElement>
              <span className="text-primary font-bold tracking-wider uppercase text-xs mb-4 block">Agency Services</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                We help you to go online and <span className="text-primary">increase your sales.</span>
              </h2>
            </AnimatedElement>
          </div>

          {isLoadingServices ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <AnimatedElement key={service._id} delay={idx * 100} className="h-full">
                  <div className="group bg-background rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-transparent hover:border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
                    
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {service.serviceImage ? (
                        <Image src={service.serviceImage} alt={service.serviceTitle || ''} className="w-8 h-8 object-contain" />
                      ) : (
                        <Briefcase size={32} />
                      )}
                    </div>

                    <h3 className="text-2xl font-heading font-bold mb-4">{service.serviceTitle}</h3>
                    <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                      {service.shortDescription || "We develop targeted marketing strategies that align with your goals and convert into success."}
                    </p>

                    <Link 
                      to={`/services/${service.slug || service._id}`} 
                      className="inline-flex items-center font-bold text-foreground group-hover:text-primary transition-colors"
                    >
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- CTA STRIP --- */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Let's make something great work together. Got a project in mind?
              </h2>
            </div>
            <Button 
              onClick={() => navigate('/contact')}
              className="h-16 px-10 rounded-full bg-primary text-white hover:bg-white hover:text-foreground text-lg font-bold transition-all shadow-[0_0_20px_rgba(232,90,61,0.4)] hover:shadow-none whitespace-nowrap"
            >
              Start a project
            </Button>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <AnimatedElement>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                  Crafting unique <br/>
                  <span className="relative inline-block">
                    stories for brands.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.00025 6.99997C52.0003 0.999967 152 -2.00003 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Every brand has a story. We blend strategy, creativity, and emotion to craft narratives that are uniquely yours.
                </p>
              </AnimatedElement>
            </div>
            <AnimatedElement delay={200}>
              <Button 
                onClick={() => navigate('/portfolio')}
                variant="outline" 
                className="rounded-full px-8 h-12 border-2 border-foreground hover:bg-foreground hover:text-background font-bold"
              >
                View all works
              </Button>
            </AnimatedElement>
          </div>

          {isLoadingPortfolio ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {portfolio.map((project, idx) => (
                <AnimatedElement key={project._id} delay={idx * 150}>
                  <Link to={`/portfolio/${project._id}`} className="group block">
                    <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[4/3]">
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors z-10" />
                      <Image 
                        src={project.projectImage} 
                        alt={project.projectTitle || 'Project'} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.projectTitle}
                        </h3>
                        <p className="text-muted-foreground">{project.category || "Branding, Design"}</p>
                      </div>
                      <span className="text-sm font-bold text-foreground/30 group-hover:text-foreground transition-colors">2024</span>
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Strategy meets innovation.",
                desc: "Our proven expertise is built on a foundation of real-world results, consistent delivery, and client trust.",
                img: "https://static.wixstatic.com/media/fd83df_a2f8f1f243ee47b8891cd84aa0b92daa~mv2.png?originWidth=128&originHeight=128"
              },
              {
                step: "02",
                title: "Certified trusted specialization.",
                desc: "From strategy to execution, we've successfully handled complex challenges across diverse industries.",
                img: "https://static.wixstatic.com/media/fd83df_e67d455246ec48d0b82b1db6ab2bf216~mv2.png?originWidth=128&originHeight=128"
              },
              {
                step: "03",
                title: "Purely tailored deliverables.",
                desc: "We create solutions that are specifically designed to meet your unique business needs and goals.",
                img: "https://static.wixstatic.com/media/fd83df_c53a729a4a9546b0ab2ed2e8ad6c5238~mv2.png?originWidth=128&originHeight=128"
              }
            ].map((item, idx) => (
              <AnimatedElement key={idx} delay={idx * 150}>
                <div className="bg-background p-8 rounded-[2rem] h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-bold text-primary/10 font-heading">{item.step}</span>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <Image src={item.img} alt="Process" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 pr-4">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.desc}</p>
                  <div className="w-full h-px bg-border mb-6" />
                  <span className="text-sm font-bold text-primary uppercase tracking-wider cursor-pointer hover:underline">Our Services</span>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- AWARDS SECTION --- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <AnimatedElement>
                <span className="text-primary font-bold tracking-wider uppercase text-xs mb-4 block">Agency Awards</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                  We're achieving recognition & awards.
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our work has been recognized by leading industry organizations for creativity, innovation, and effectiveness.
                </p>
                <Button 
                  onClick={() => navigate('/about')}
                  className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-primary transition-colors"
                >
                  View all awards
                </Button>
              </AnimatedElement>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {[
                  { year: "2025", award: "Honors", platform: "Awwwards", project: "Cropo identity" },
                  { year: "2025", award: "Site of the month", platform: "CSS Design Awards", project: "Violator series" },
                  { year: "2024", award: "Site of the day", platform: "The Portfolio", project: "Harddot stone" },
                  { year: "2024", award: "Mobile excellence", platform: "CSS Awards", project: "Tailoring inteo" }
                ].map((award, idx) => (
                  <AnimatedElement key={idx} delay={idx * 100}>
                    <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl hover:bg-secondary/50 transition-colors border-b border-border/50 md:border-none">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <span className="text-sm font-bold text-muted-foreground w-12">{award.year}</span>
                        <div>
                          <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{award.award}</h4>
                          <p className="text-sm text-muted-foreground md:hidden">{award.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 md:gap-16">
                        <span className="hidden md:block text-muted-foreground font-medium">{award.platform}</span>
                        <span className="text-foreground font-bold">{award.project}</span>
                        <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <AnimatedElement>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-primary">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <h2 className="text-4xl font-heading font-bold">Trusted by our clients</h2>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-white hover:border-primary transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-white hover:border-primary transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </AnimatedElement>
          </div>

          {isLoadingTestimonials ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <AnimatedElement key={item._id} delay={idx * 100} className="h-full">
                  <div className="bg-background p-8 rounded-[2rem] shadow-sm h-full flex flex-col relative">
                    <div className="text-primary mb-6">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                      </svg>
                    </div>
                    <p className="text-lg text-foreground/80 mb-8 flex-grow italic leading-relaxed">
                      "{item.testimonialText}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                        {item.clientPhoto ? (
                          <Image src={item.clientPhoto} alt={item.clientName || ''} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
                            {item.clientName?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{item.clientName}</h4>
                        <p className="text-sm text-muted-foreground">{item.companyOrRole}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}