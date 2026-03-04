import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Award, Users, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
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

export default function AboutPage() {
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('team');
      setTeam(result.items);
    } catch (error) {
      console.error('Error loading team:', error);
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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mt-4 mb-6">
                We&apos;re a creative{' '}
                <span className="relative inline-block">
                  digital agency
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q62.5 0, 125 5 T250 5" stroke="#E85A3D" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                We are excited for our work and how it positively impacts clients. With over 12 years of experience, we have been constantly providing excellent solutions.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission Section */}
      <AnimatedElement>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <Image 
                  src="https://static.wixstatic.com/media/fd83df_af9ff3ff22324636a6d30fcce55e1514~mv2.png?originWidth=576&originHeight=448"
                  alt="Our mission"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                  width={600}
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  Our mission is to create{' '}
                  <span className="text-primary">exceptional brands</span>
                </h2>
                <p className="text-lg text-foreground/70">
                  We blend strategy, creativity, and emotion to craft narratives that are uniquely yours - stories that spark engagement and leave a lasting impression.
                </p>
                <p className="text-lg text-foreground/70">
                  From strategy to execution, we&apos;ve successfully handled complex challenges across diverse industries, helping businesses grow and thrive in the digital landscape.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Values Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Our core values
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                These principles guide everything we do and shape how we work with our clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Strategy meets innovation',
                  description: 'We combine strategic thinking with innovative solutions to deliver exceptional results.'
                },
                {
                  icon: Award,
                  title: 'Certified expertise',
                  description: 'Our proven expertise is built on real-world results and consistent delivery.'
                },
                {
                  icon: Users,
                  title: 'Tailored approach',
                  description: 'Every project receives a customized strategy designed for your unique needs.'
                },
                {
                  icon: TrendingUp,
                  title: 'Professional execution',
                  description: 'We deliver high-quality work that drives growth and exceeds expectations.'
                }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-background rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="text-primary group-hover:text-primary-foreground transition-colors" size={32} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70">
                      {value.description}
                    </p>
                  </div>
                );
              })}
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
                Helping brands grow through smart digital marketing
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: '2X',
                  title: 'Boosting revenue growth',
                  description: 'Empowering businesses by boosting consistent revenue growth.',
                  badge: null
                },
                {
                  number: '85%',
                  title: 'Empowering startup success',
                  description: 'We help startups turn bold ideas into scalable and market success.',
                  badge: 'Hot'
                },
                {
                  number: '25+',
                  title: 'Winning formula for startups',
                  description: 'Empowering early-stage businesses with tools that drive real success.',
                  badge: null
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-background/5 rounded-3xl p-8 hover:bg-background/10 transition-all hover:scale-105"
                >
                  {stat.badge && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {stat.badge}
                    </span>
                  )}
                  <h3 className="text-5xl font-heading font-bold text-primary mb-4">
                    {stat.number}
                  </h3>
                  <h4 className="text-xl font-heading font-bold mb-3">
                    {stat.title}
                  </h4>
                  <p className="text-background/70">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Team Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">
                Meet the experts{' '}
                <span className="relative inline-block">
                  behind our success
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q62.5 0, 125 5 T250 5" stroke="#4A7FD9" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Our talented team brings together diverse skills and expertise to deliver exceptional results.
              </p>
            </div>

            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : team.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {team.map((member, index) => (
                    <div 
                      key={member._id}
                      className="bg-background rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {member.profilePhoto && (
                        <div className="relative overflow-hidden">
                          <Image 
                            src={member.profilePhoto}
                            alt={member.fullName || 'Team member'}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                          {member.fullName}
                        </h3>
                        {member.jobTitle && (
                          <p className="text-primary font-semibold mb-3">
                            {member.jobTitle}
                          </p>
                        )}
                        {member.bio && (
                          <p className="text-foreground/70 text-sm mb-4">
                            {member.bio}
                          </p>
                        )}
                        {member.linkedInUrl && (
                          <a 
                            href={member.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 text-sm font-semibold inline-flex items-center"
                          >
                            View LinkedIn
                            <ArrowRight className="ml-1" size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/70">No team members available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Awards Section */}
      <AnimatedElement>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Recognition</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4 mb-6">
                We&apos;re achieving{' '}
                <span className="relative inline-block">
                  recognition & awards
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q62.5 0, 125 5 T250 5" stroke="#E85A3D" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  year: '2025',
                  recognition: 'Honors',
                  platform: 'Awwwards',
                  project: 'Cropo identity'
                },
                {
                  year: '2025',
                  recognition: 'Site of the month',
                  platform: 'CSS Design awards',
                  project: 'Violator series'
                },
                {
                  year: '2024',
                  recognition: 'Site of the day',
                  platform: 'The portfolio',
                  project: 'Harddot stone'
                },
                {
                  year: '2024',
                  recognition: 'Site of the day',
                  platform: 'One page love',
                  project: 'Tailoring inteo'
                }
              ].map((award, index) => (
                <div 
                  key={index}
                  className="bg-secondary/50 rounded-3xl p-8 hover:shadow-xl transition-all hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl font-heading font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {award.year}
                    </span>
                    <Award className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {award.recognition}
                  </h3>
                  <p className="text-foreground/70 mb-1">
                    Platform: {award.platform}
                  </p>
                  <p className="text-foreground/60 text-sm">
                    Project: {award.project}
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
              Ready to work with us?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together. Get in touch with our team today.
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-background hover:bg-background/90 text-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Get in touch
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
