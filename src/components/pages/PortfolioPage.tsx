import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Portfolio } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0`}>
      {children}
    </div>
  );
};

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadPortfolio();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPortfolio(portfolio);
    } else {
      setFilteredPortfolio(portfolio.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, portfolio]);

  const loadPortfolio = async () => {
    try {
      const result = await BaseCrudService.getAll<Portfolio>('portfolio');
      setPortfolio(result.items);
      setFilteredPortfolio(result.items);
      
      const uniqueCategories = ['All', ...Array.from(new Set(result.items.map(item => item.category).filter(Boolean)))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(232,90,61,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Work</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mt-4 mb-6">
                Crafting unique{' '}
                <span className="relative inline-block">
                  stories for brands
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q62.5 0, 125 5 T250 5" stroke="#E85A3D" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Every brand has a story. We blend strategy, creativity, and emotion to craft narratives that are uniquely yours - stories that spark engagement and leave a lasting impression.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filter Section */}
      {!isLoading && categories.length > 1 && (
        <AnimatedElement>
          <section className="py-12 bg-background border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Filter size={20} />
                  <span className="font-semibold">Filter by:</span>
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </AnimatedElement>
      )}

      {/* Portfolio Grid */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="min-h-[600px]">
              {isLoading ? null : filteredPortfolio.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPortfolio.map((project, index) => (
                    <div 
                      key={project._id}
                      className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => navigate(`/portfolio/${project._id}`)}
                    >
                      {project.projectImage && (
                        <Image 
                          src={project.projectImage}
                          alt={project.projectTitle || 'Project'}
                          className="w-full h-[400px] object-cover"
                          width={600}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                        {project.category && (
                          <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            {project.category}
                          </span>
                        )}
                        <h3 className="text-2xl font-heading font-bold text-background mb-2">
                          {project.projectTitle}
                        </h3>
                        {project.clientName && (
                          <p className="text-background/80 text-sm mb-4">
                            Client: {project.clientName}
                          </p>
                        )}
                        <div className="flex items-center text-background hover:text-background/80 font-semibold">
                          Discover case study
                          <ArrowRight className="ml-2" size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/70">
                    {selectedCategory === 'All' 
                      ? 'No portfolio items available at the moment.' 
                      : `No projects found in the "${selectedCategory}" category.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Stats Section */}
      <AnimatedElement>
        <section className="py-24 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Our impact in numbers
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '150+', label: 'Projects completed' },
                { number: '98%', label: 'Client satisfaction' },
                { number: '25+', label: 'Industry awards' },
                { number: '12+', label: 'Years of experience' }
              ].map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-background/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Process Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                How we bring{' '}
                <span className="relative inline-block">
                  projects to life
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q50 0, 100 5 T200 5" stroke="#4A7FD9" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discovery', description: 'Understanding your vision, goals, and target audience' },
                { step: '02', title: 'Strategy', description: 'Crafting a tailored approach aligned with your objectives' },
                { step: '03', title: 'Execution', description: 'Bringing ideas to life with precision and creativity' },
                { step: '04', title: 'Launch', description: 'Delivering exceptional results that exceed expectations' }
              ].map((process, index) => (
                <div 
                  key={index}
                  className="text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <span className="text-3xl font-heading font-bold text-primary group-hover:text-primary-foreground transition-colors">
                      {process.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {process.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
          
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Have a project in mind?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s collaborate to create something extraordinary that tells your unique story.
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-background hover:bg-background/90 text-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Start your project
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
