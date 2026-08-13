import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Car } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SectionHeader, FeatureCard, StatCard, TestimonialCard } from '@/components/ui/SectionComponents';
import { CarCard } from '@/components/cars/CarCard';
import {
  Shield,
  Award,
  Users,
  ThumbsUp,
  Car as CarIcon,
  Home,
  Building2,
  User,
  Sparkles,
  MapPin,
  FileCheck,
  Phone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import heroShowroom from '@/assets/hero-showroom.jpg';
import teamPhoto from '@/assets/team-photo.jpg';

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'range-rover', label: 'Range Rover / Land Rover' },
  { id: 'volkswagen', label: 'Volkswagen' },
  { id: 'mercedes-benz', label: 'Mercedes-Benz' },
  { id: 'porsche', label: 'Porsche' },
  { id: 'bmw', label: 'BMW' },
  { id: 'audi', label: 'Audi' },
];

const Index = () => {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchFeatured = async () => {
      if (!supabase) {
        console.error('Supabase not configured. Please check your .env file.');
        setFeaturedCars([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .limit(6);

        if (error) {
          console.error('Supabase fetch error:', error);
          setFeaturedCars([]);
        } else if (data) {
          setFeaturedCars(data);
        } else {
          setFeaturedCars([]);
        }
      } catch (err) {
        console.error('Failed to fetch cars from Supabase:', err);
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const filteredCars = selectedCategory === 'all'
    ? featuredCars
    : featuredCars.filter(car => (car as any).brand === selectedCategory);

  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Véhicules Vérifiés',
      description: 'Tous nos véhicules sont inspectés et entretenus régulièrement pour garantir votre sécurité et confort.',
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: 'Prix Transparent',
      description: 'Tarifs clairs sans frais cachés. Location simple et abordable pour tous vos besoins.',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Service Client',
      description: 'Équipe disponible 24/7 pour répondre à toutes vos questions et vous assister.',
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: 'Flexibilité Totale',
      description: 'Locations à la journée, à la semaine ou au mois selon vos besoins de déplacement.',
    },
  ];

  const services = [
    {
      icon: <CarIcon className="w-6 h-6" />,
      title: 'Large Gamme',
      description: 'SUV, berlines, citadines - un large choix de véhicules pour tous vos besoins.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Location Simple',
      description: 'Processus de réservation rapide et simple en quelques minutes.',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Support WhatsApp',
      description: 'Contactez-nous directement sur WhatsApp pour une assistance instantanée.',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Livraison',
      description: 'Livraison possible à votre hôtel ou aéroport à Marrakech.',
    },
  ];

  const testimonials = [
    {
      quote: 'Service exceptionnel! Véhicule impeccable et équipe très professionnelle. Je recommande vivement.',
      author: 'Mohammed A.',
      role: 'Client satisfait',
    },
    {
      quote: 'CASA DE PALMERAS a dépassé toutes mes attentes. Location simple, véhicule propre et service client excellent.',
      author: 'Sarah B.',
      role: 'Cliente fidèle',
    },
    {
      quote: 'Excellent service de location à Marrakech. Processus rapide et véhicules de qualité supérieure.',
      author: 'Youssef M.',
      role: 'Client régulier',
    },
  ];

  const stats = [
    { value: '20+', label: 'Véhicules' },
    { value: 'Premium', label: 'Qualité' },
    { value: 'Marrakech', label: 'Disponible' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-between py-16 sm:py-20 pt-16 sm:pt-32 px-4 sm:px-0">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cars/WhatsApp Image 2026-08-11 at 17.22.03.jpeg"
            alt="CASA DE PALMERAS"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        {/* Content */}
        <div className="container-luxury relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-crimson/20 text-crimson rounded-full mb-6">
                CONCIERGERIE PREMIUM • MARRAKECH
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ivory mb-4 sm:mb-6 leading-tight">
                Votre séjour à Marrakech, autrement.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Voitures premium, villas, transferts et services de conciergerie réunis pour une expérience simple et personnalisée.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full my-6 px-4 sm:px-0 sm:mb-8">
                <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full py-3.5 text-base font-semibold bg-crimson/20 backdrop-blur-md border border-crimson/40 text-crimson shadow-[0_8px_32px_0_rgba(200,173,127,0.2)] hover:bg-crimson/30 hover:border-crimson hover:shadow-[0_8px_32px_0_rgba(200,173,127,0.4)] transition-all duration-300 rounded-xl">
                    Réserver sur WhatsApp
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/services" className="w-full">
                  <Button className="w-full py-3.5 text-base font-medium border border-white/30 text-white rounded-xl backdrop-blur-sm hover:bg-white/10">
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-crimson">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-ivory/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-crimson rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Brand Ticker */}
      <section className="py-8 bg-charcoal border-y border-white/10 overflow-hidden">
        <div className="container-luxury">
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 whitespace-nowrap"
            >
              {['Mercedes-Benz', 'BMW', 'Audi', 'Range Rover', 'Porsche', 'Toyota', 'Volkswagen', 'Peugeot', 'Renault', 'Volvo', 'Lexus'].map((brand, index) => (
                <span key={index} className="text-xl font-display font-semibold text-ivory/40 hover:text-gold transition-colors">
                  {brand}
                </span>
              ))}
              {['Mercedes-Benz', 'BMW', 'Audi', 'Range Rover', 'Porsche', 'Toyota', 'Volkswagen', 'Peugeot', 'Renault', 'Volvo', 'Lexus'].map((brand, index) => (
                <span key={`dup-${index}`} className="text-xl font-display font-semibold text-ivory/40 hover:text-gold transition-colors">
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section id="vehicules" className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeader
            badge="Notre Flotte"
            title="Véhicules Disponibles"
            subtitle="Découvrez notre sélection de véhicules premium pour vos déplacements à Marrakech"
          />

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gold text-white shadow-lg shadow-gold/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Cars Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 mb-8">
              <p className="text-muted-foreground">
                No vehicles available in this category at the moment.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link to="/vehicules">
              <Button variant="gold" size="lg">
                Voir tous les véhicules
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Services Preview */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Services"
            title="Une Conciergerie Premium à Marrakech"
            subtitle="Une conciergerie pensée pour profiter pleinement de Marrakech."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <CarIcon className="w-6 h-6" />, title: 'Location de voitures', desc: 'Véhicules premium pour vos déplacements', link: '/vehicules' },
              { icon: <Home className="w-6 h-6" />, title: 'Villas & Riads', desc: 'Séjours haut de gamme à Marrakech', link: '/services' },
              { icon: <Building2 className="w-6 h-6" />, title: 'Appartements', desc: 'Hébergements confortables au cœur de la ville', link: '/services' },
              { icon: <User className="w-6 h-6" />, title: 'Chauffeur & Transferts', desc: 'Transferts aéroport et déplacements privés', link: '/services' },
              { icon: <Sparkles className="w-6 h-6" />, title: 'Conciergerie privée', desc: 'Accompagnement personnalisé sur mesure', link: '/services' },
              { icon: <MapPin className="w-6 h-6" />, title: 'Expériences', desc: 'Activités et excursions à Marrakech', link: '/services' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-ivory/5 border border-ivory/10 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-ivory mb-2">
                  {service.title}
                </h3>
                <p className="text-ivory/60 text-sm mb-4">
                  {service.desc}
                </p>
                <Link to={service.link} className="inline-flex items-center text-gold text-sm font-medium hover:text-gold-light transition-colors">
                  Découvrir
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="goldOutline" size="lg">
                Voir tous nos services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeader
            badge="Témoignages"
            title="Ce que disent nos clients"
            subtitle="La confiance de nos clients à Marrakech et au-delà"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Nous Contacter
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-gold-subtle">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Prêt à louer votre véhicule?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Contactez-nous dès maintenant pour réserver votre véhicule et découvrir Marrakech en tout confort.
                Notre équipe est disponible 24/7 pour vous assister.
              </p>
              <div className="text-center">
                <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg" style={{ backgroundColor: '#C8AD7F' }}>
                    Réserver sur WhatsApp
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <span className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-3">
                  <Phone className="w-4 h-4" />
                  WhatsApp: +212 721 030 775
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
