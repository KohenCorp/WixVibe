import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
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

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<Services>('services');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForService = (index: number) => {
    const icons = [Sparkles, TrendingUp, Package];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent/5 via-background to-background overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(74,127,217,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mt-4 mb-6">
                We help you to go online{' '}
                <span className="relative inline-block">
                  and increase your sales
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q75 0, 150 5 T300 5" stroke="#E85A3D" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                From strategy to execution, we provide comprehensive digital solutions tailored to your business needs.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Services Grid */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="min-h-[500px]">
              {isLoading ? null : services.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => {
                    const Icon = getIconForService(index);
                    return (
                      <div 
                        key={service._id}
                        className="bg-background rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {service.serviceImage && (
                          <div className="relative overflow-hidden h-64">
                            <Image 
                              src={service.serviceImage}
                              alt={service.serviceTitle || 'Service'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              width={400}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <Icon className="text-primary-foreground" size={24} />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="p-8">
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                            {service.serviceTitle}
                          </h3>
                          <p className="text-foreground/70 mb-6">
                            {service.shortDescription}
                          </p>
                          <Button 
                            onClick={() => navigate(`/services/${service._id}`)}
                            variant="link"
                            className="text-accent hover:text-accent/80 p-0 h-auto font-semibold"
                          >
                            Learn more
                            <ArrowRight className="ml-2" size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/70">No services available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Detailed Services Section */}
      {!isLoading && services.length > 0 && (
        <AnimatedElement>
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="space-y-24">
                {services.slice(0, 3).map((service, index) => (
                  <div 
                    key={service._id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative">
                        <div className={`absolute ${index % 2 === 0 ? '-top-10 -left-10' : '-top-10 -right-10'} w-64 h-64 bg-primary/10 rounded-full blur-3xl`} />
                        {service.serviceImage && (
                          <Image 
                            src={service.serviceImage}
                            alt={service.serviceTitle || 'Service'}
                            className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                            width={600}
                          />
                        )}
                        <div className={`absolute ${index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'} bg-foreground text-background p-6 rounded-2xl shadow-xl`}>
                          <p className="text-6xl font-heading font-bold">0{index + 1}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Service {index + 1}</span>
                      <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                        {service.serviceTitle}
                        <span className="relative inline-block ml-2">
                          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 150 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 5 Q37.5 0, 75 5 T150 5" stroke="#4A7FD9" strokeWidth="2" fill="none" />
                          </svg>
                        </span>
                      </h2>
                      <p className="text-lg text-foreground/70">
                        {service.detailedDescription || service.shortDescription}
                      </p>
                      {service.keyBenefits && (
                        <div className="bg-secondary/50 rounded-2xl p-6">
                          <h4 className="font-heading font-bold text-foreground mb-3">Key Benefits</h4>
                          <p className="text-foreground/70">{service.keyBenefits}</p>
                        </div>
                      )}
                      <Button 
                        onClick={() => navigate(`/services/${service._id}`)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full transition-all hover:scale-105"
                      >
                        View details
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedElement>
      )}

      {/* Process Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Our proven{' '}
                <span className="relative inline-block">
                  process
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 150 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q37.5 0, 75 5 T150 5" stroke="#E85A3D" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Our proven expertise is built on a foundation of real-world results, consistent delivery, and client trust.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Strategy meets innovation',
                  description: 'We develop targeted strategies that align with your goals and convert into success.',
                  label: 'Innovative strategies'
                },
                {
                  step: '02',
                  title: 'Certified trusted specialization',
                  description: 'A well-defined approach helps position your brand and drive consistent growth.',
                  label: 'Tailored approach'
                },
                {
                  step: '03',
                  title: 'Purely tailored deliverables',
                  description: 'We turn ideas into market-ready products through thoughtful design and innovation.',
                  label: 'Professional execution'
                }
              ].map((process, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <div className="text-6xl font-heading font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">
                    {process.step}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    {process.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    {process.description}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    {process.label}
                  </div>
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
              Ready to elevate your brand?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s discuss how our services can help you achieve your business goals.
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-background hover:bg-background/90 text-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Get started today
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
