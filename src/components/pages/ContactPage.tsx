import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get In Touch</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mt-4 mb-6">
                Let&apos;s make something{' '}
                <span className="relative inline-block">
                  great together
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q62.5 0, 125 5 T250 5" stroke="#E85A3D" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Got a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedElement>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                    Contact information
                  </h2>
                  <p className="text-lg text-foreground/70">
                    Reach out to us through any of these channels. We&apos;re here to help bring your vision to life.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: 'Email',
                      content: 'hello@craftohtml.com',
                      link: 'mailto:hello@craftohtml.com'
                    },
                    {
                      icon: Phone,
                      title: 'Phone',
                      content: '+1 (555) 123-4567',
                      link: 'tel:+15551234567'
                    },
                    {
                      icon: MapPin,
                      title: 'Office',
                      content: '123 Creative Street, Design District, NY 10001',
                      link: null
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                          <Icon className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-foreground mb-1">
                            {item.title}
                          </h3>
                          {item.link ? (
                            <a 
                              href={item.link}
                              className="text-foreground/70 hover:text-primary transition-colors"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-foreground/70">{item.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Business hours
                  </h3>
                  <div className="space-y-2 text-foreground/70">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Contact Form */}
            <AnimatedElement className="delay-200">
              <div className="bg-background rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-xl">
                      Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl">
                      Oops! Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send message
                        <Send className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <AnimatedElement>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/50 rounded-3xl overflow-hidden shadow-xl h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-primary mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Visit our office
                </h3>
                <p className="text-foreground/70">
                  123 Creative Street, Design District, NY 10001
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* FAQ Section */}
      <AnimatedElement>
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Frequently asked{' '}
                <span className="relative inline-block">
                  questions
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q50 0, 100 5 T200 5" stroke="#4A7FD9" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'What services do you offer?',
                  answer: 'We offer comprehensive digital solutions including branding, marketing strategies, product development, and web design. Our team specializes in creating tailored solutions for businesses of all sizes.'
                },
                {
                  question: 'How long does a typical project take?',
                  answer: 'Project timelines vary depending on scope and complexity. A typical branding project takes 4-8 weeks, while larger web development projects may take 8-16 weeks. We provide detailed timelines during our initial consultation.'
                },
                {
                  question: 'What is your pricing structure?',
                  answer: 'Our pricing is project-based and tailored to your specific needs. We offer transparent quotes after understanding your requirements. Contact us for a detailed proposal and pricing information.'
                },
                {
                  question: 'Do you work with startups?',
                  answer: 'Absolutely! We love working with startups and have helped numerous early-stage businesses establish their brand identity and digital presence. We offer flexible packages designed for growing businesses.'
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      <Footer />
    </div>
  );
}
