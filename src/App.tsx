import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, 
  Star, CheckCircle2, Calendar, MessageSquare, 
  Facebook, Instagram, Twitter,
  Stethoscope, Sparkles, Activity, Shield, Smile, Baby, Syringe,
  Quote
} from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", id = "" }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [doctorImage, setDoctorImage] = useState(() => {
    return localStorage.getItem('doctorImage') || '/Abhi.png';
  });

  useEffect(() => {
    localStorage.setItem('doctorImage', doctorImage);
  }, [doctorImage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setAdminPortalOpen(true)}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Smile size={24} />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-navy leading-tight">Dr. Abhinandan</h1>
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Dental Clinic</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href.substring(1))}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === link.href.substring(1) ? 'text-primary' : 'text-navy'}`}
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollTo('appointment')} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-primary/30">
              Book Appointment
            </button>
          </div>

          <button className="md:hidden text-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map(link => (
                  <button 
                    key={link.name}
                    onClick={() => scrollTo(link.href.substring(1))}
                    className={`text-left text-lg font-medium ${activeSection === link.href.substring(1) ? 'text-primary' : 'text-navy'}`}
                  >
                    {link.name}
                  </button>
                ))}
                <button onClick={() => scrollTo('appointment')} className="bg-primary text-white px-6 py-3 rounded-full text-center font-medium mt-4">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Dental Clinic" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90 sm:bg-white/80 sm:bg-gradient-to-r sm:from-white sm:to-white/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                Welcome to Dr. Abhinandan Dental Clinic
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-5xl lg:text-7xl font-serif font-bold text-navy leading-tight mb-6">
                Your Smile, <br/><span className="text-primary">Our Priority</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-body mb-8 max-w-lg">
                Experience premium, painless, and comprehensive dental care in Khanna, Punjab. We bring advanced technology and expert care to give you the perfect smile.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('appointment')} className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                <Calendar size={20} />
                Book Appointment
              </button>
              <a href="tel:+917837050139" className="bg-white hover:bg-gray-50 text-navy border border-gray-200 px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                <Phone size={20} />
                Call Now
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-gray-100">
          {[
            { label: 'Years of Experience', value: '10+' },
            { label: 'Happy Patients', value: '5000+' },
            { label: 'Services Offered', value: '15+' },
            { label: 'Specialist Doctors', value: '3+' },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1} className="text-center px-4">
              <div className="text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-body uppercase tracking-wider">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img 
                    src={doctorImage} 
                    alt="Dr. Abhinandan" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <div className="font-bold text-navy text-xl">4.9/5</div>
                      <div className="text-sm text-body">Patient Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <div>
              <FadeIn delay={0.1}>
                <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">About The Doctor</h3>
                <h2 className="text-4xl font-serif font-bold text-navy mb-6">Dr. Abhinandan</h2>
                <p className="text-xl text-navy font-medium mb-6">BDS, MDS (Prosthodontics)</p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <p className="text-body mb-6 leading-relaxed">
                  With over a decade of experience in advanced dentistry, Dr. Abhinandan is committed to providing world-class dental care in Khanna. Specializing in Prosthodontics and Implantology, he combines artistic vision with technical precision to restore and enhance smiles.
                </p>
                <p className="text-body mb-8 leading-relaxed">
                  Our clinic is built on the foundation of trust, transparency, and patient comfort. We utilize the latest technology to ensure every procedure is as painless and effective as possible.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <ul className="space-y-4 mb-8">
                  {[
                    'Gold Medalist in MDS Prosthodontics',
                    'Certified Implantologist',
                    'Member of Indian Dental Association (IDA)',
                    'Advanced Training in Cosmetic Dentistry'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-navy font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Our Services</h3>
            <h2 className="text-4xl font-serif font-bold text-navy mb-6">Comprehensive Dental Care</h2>
            <p className="text-body text-lg">We offer a wide range of dental treatments under one roof, using state-of-the-art equipment for the best outcomes.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: 'General Dentistry', desc: 'Routine checkups, cleanings, and preventive care to maintain oral health.' },
              { icon: Sparkles, title: 'Cosmetic Dentistry', desc: 'Smile makeovers, veneers, and bonding to enhance your appearance.' },
              { icon: Shield, title: 'Dental Implants', desc: 'Permanent, natural-looking replacements for missing teeth.' },
              { icon: Activity, title: 'Root Canal', desc: 'Painless endodontic treatment to save infected or damaged teeth.' },
              { icon: Smile, title: 'Orthodontics', desc: 'Traditional braces and clear aligners for perfectly straight teeth.' },
              { icon: Sparkles, title: 'Teeth Whitening', desc: 'Professional whitening treatments for a brighter, radiant smile.' },
              { icon: Baby, title: 'Pediatric Dentistry', desc: 'Gentle and friendly dental care specialized for children.' },
              { icon: Syringe, title: 'Tooth Extraction', desc: 'Safe and painless removal of problematic or wisdom teeth.' },
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <service.icon size={28} />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-navy mb-3">{service.title}</h4>
                  <p className="text-body leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-sky-50 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Why Choose Us</h3>
                <h2 className="text-slate-900 text-4xl font-serif font-bold mb-6">Excellence in Every Smile</h2>
                <p className="text-slate-600 text-lg mb-8">
                  We understand that visiting the dentist can be daunting. That's why we've created an environment focused on your comfort, safety, and satisfaction.
                </p>
              </FadeIn>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: 'Advanced Equipment', desc: 'We use the latest dental technology for precise diagnosis and treatment.' },
                  { title: 'Painless Procedures', desc: 'Modern anesthesia and techniques ensure a comfortable experience.' },
                  { title: 'Experienced Team', desc: 'Highly qualified specialists dedicated to your oral health.' },
                  { title: 'Affordable Pricing', desc: 'Transparent costs with no hidden fees for all our treatments.' },
                ].map((feature, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="text-slate-900 text-lg font-bold mb-2">{feature.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-square rounded-full border-2 border-primary/30 p-4">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Dental Care" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Our Gallery</h3>
            <h2 className="text-4xl font-serif font-bold text-navy mb-6">Clinic & Results</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1598256989800-fea5ce5146f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden group relative">
                  <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View Image</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Testimonials</h3>
            <h2 className="text-4xl font-serif font-bold text-navy mb-6">What Our Patients Say</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', location: 'Khanna', text: 'Best dental clinic in Khanna! Dr. Abhinandan is very polite and explained the entire root canal procedure. Completely painless experience. बहुत बढ़िया काम किया डॉक्टर साहब ने।', stars: 5 },
              { name: 'Priya Verma', location: 'Ludhiana', text: 'Got my teeth whitening and scaling done here. The clinic is extremely clean and hygienic. The staff is very professional. Highly recommended!', stars: 5 },
              { name: 'Gurpreet Singh', location: 'Mandi Gobindgarh', text: 'Got dental implants for my father. The treatment was affordable and the results are amazing. He can eat comfortably now. Thank you Dr. Abhinandan.', stars: 5 },
            ].map((review, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-light p-8 rounded-2xl relative h-full flex flex-col">
                  <Quote className="absolute top-6 right-6 text-primary/20" size={48} />
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.stars)].map((_, j) => (
                      <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-body italic mb-8 relative z-10 flex-grow">"{review.text}"</p>
                  <div>
                    <h4 className="font-bold text-navy">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment & Contact Section */}
      <section id="appointment" className="py-24 bg-sky-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-32 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Book Appointment</h3>
              <h2 className="text-slate-900 text-4xl font-serif font-bold mb-6">Schedule Your Visit</h2>
              <p className="text-slate-600 mb-10">Fill out the form below and our team will get back to you to confirm your appointment time.</p>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Appointment request submitted successfully!'); }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="+91 78370 50139" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Required</label>
                    <select required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                      <option value="" className="text-slate-900">Select a service</option>
                      <option value="general" className="text-slate-900">General Dentistry</option>
                      <option value="cosmetic" className="text-slate-900">Cosmetic Dentistry</option>
                      <option value="implants" className="text-slate-900">Dental Implants</option>
                      <option value="root-canal" className="text-slate-900">Root Canal</option>
                      <option value="ortho" className="text-slate-900">Orthodontics</option>
                      <option value="other" className="text-slate-900">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                    <input required type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
                  <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Any specific dental issues?"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-colors">
                  Confirm Booking
                </button>
              </form>
            </FadeIn>
            
            <FadeIn delay={0.2} id="contact" className="lg:pl-12">
              <h3 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Contact Us</h3>
              <h2 className="text-slate-900 text-4xl font-serif font-bold mb-10">Get In Touch</h2>
              
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm border border-slate-100">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1">Clinic Address</h4>
                    <p className="text-slate-600">Dr. Abhinandan Dental Clinic<br/>GT Road, Near Bus Stand<br/>Khanna, Punjab 141401, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm border border-slate-100">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1">Phone & WhatsApp</h4>
                    <p className="text-slate-600">+91 78370 50139</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm border border-slate-100">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1">Working Hours</h4>
                    <p className="text-slate-600">Mon - Sat: 10:00 AM - 8:00 PM<br/>Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-gray-800">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.123456789!2d76.2234567!3d30.7012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzA0LjQiTiA3NsKwMTMnMjQuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-50 text-slate-600 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Smile size={18} />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-slate-900 leading-tight">Dr. Abhinandan</h2>
                  <p className="text-[9px] uppercase tracking-wider text-primary font-semibold">Dental Clinic</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6">Providing premium and painless dental care in Khanna, Punjab. Your smile is our top priority.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"><Twitter size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <button onClick={() => scrollTo(link.href.substring(1))} className="hover:text-primary transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={14} /> {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
              <ul className="space-y-3">
                {['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Root Canal', 'Orthodontics'].map(service => (
                  <li key={service}>
                    <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={14} /> {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>GT Road, Near Bus Stand, Khanna, Punjab 141401</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>+91 78370 50139</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>info@drabhinandan.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Dr. Abhinandan Dental Clinic. All rights reserved.</p>
            <p>Designed with <span className="text-red-500">♥</span> for Khanna</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917837050139" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={28} />
      </a>

      {/* Admin Portal Modal */}
      <AnimatePresence>
        {adminPortalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-navy">Admin Portal</h3>
                <button onClick={() => setAdminPortalOpen(false)} className="text-gray-400 hover:text-navy transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Update Doctor's Image</label>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                    <img 
                      src={doctorImage} 
                      alt="Preview" 
                      className="w-32 h-40 object-cover rounded-xl shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <input 
                      type="file" 
                      accept="image/*" 
                      id="doctor-upload"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDoctorImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label 
                      htmlFor="doctor-upload" 
                      className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-primary-dark transition-colors"
                    >
                      Choose Local Image
                    </label>
                    <p className="text-xs text-gray-400">Recommended: 4:5 aspect ratio</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setAdminPortalOpen(false)}
                  className="w-full bg-navy text-white py-3 rounded-xl font-medium hover:bg-navy-dark transition-colors"
                >
                  Save & Close
                </button>
                
                <button 
                  onClick={() => {
                    setDoctorImage('/Abhi.png');
                    setAdminPortalOpen(false);
                  }}
                  className="w-full text-gray-400 text-sm hover:text-red-500 transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
