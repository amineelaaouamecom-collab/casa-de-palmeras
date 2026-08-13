import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader, FeatureCard } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Car,
  Home,
  Building2,
  User,
  Sparkles,
  MapPin,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

const services = [
  {
    id: 'location',
    icon: <Car className="w-8 h-8" />,
    title: 'Location de voitures',
    description: 'Une sélection de véhicules premium pour vos déplacements à Marrakech, disponibles avec un service simple, rapide et personnalisé.',
    cta: 'Voir nos véhicules',
    ctaLink: '/vehicules',
    whatsapp: 'Bonjour Casa de Palmeras, je souhaite réserver un véhicule à Marrakech.',
    featured: true,
  },
  {
    id: 'villas',
    icon: <Home className="w-8 h-8" />,
    title: 'Villas & Riads',
    description: 'Séjournez dans des villas et riads sélectionnés à Marrakech, adaptés aux vacances, séjours privés et expériences haut de gamme.',
    cta: 'Découvrir',
    whatsapp: 'Bonjour Casa de Palmeras, je souhaite recevoir votre sélection de villas et riads disponibles à Marrakech.',
    featured: false,
  },
  {
    id: 'appartements',
    icon: <Building2 className="w-8 h-8" />,
    title: 'Appartements',
    description: 'Des appartements confortables et soigneusement sélectionnés pour des courts ou longs séjours au cœur de Marrakech.',
    cta: 'Voir les disponibilités',
    whatsapp: 'Bonjour Casa de Palmeras, je recherche un appartement à Marrakech.',
    featured: false,
  },
  {
    id: 'chauffeur',
    icon: <User className="w-8 h-8" />,
    title: 'Chauffeur & Transferts',
    description: 'Transferts aéroport, chauffeur privé et déplacements sur mesure pour une expérience fluide dès votre arrivée.',
    cta: 'Organiser un transfert',
    whatsapp: 'Bonjour Casa de Palmeras, je souhaite organiser un chauffeur ou un transfert à Marrakech.',
    featured: false,
  },
  {
    id: 'conciergerie',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Conciergerie privée',
    description: 'Un accompagnement personnalisé pour organiser votre séjour, vos réservations et vos demandes particulières à Marrakech.',
    cta: 'Contacter la conciergerie',
    whatsapp: 'Bonjour Casa de Palmeras, j\'aimerais organiser mon séjour à Marrakech.',
    featured: false,
  },
  {
    id: 'experiences',
    icon: <MapPin className="w-8 h-8" />,
    title: 'Expériences',
    description: 'Découvrez Marrakech autrement avec une sélection d\'activités, excursions et expériences adaptées à votre séjour.',
    cta: 'Organiser mon séjour',
    whatsapp: 'Bonjour Casa de Palmeras, je souhaite découvrir les expériences disponibles à Marrakech.',
    featured: false,
  },
];

const Services = () => {
  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212721030775?text=${encodedMessage}`, '_blank');
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Services"
            title="Une Conciergerie Premium à Marrakech"
            subtitle="Une conciergerie pensée pour profiter pleinement de Marrakech."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`luxury-card p-6 md:p-8 ${
                  service.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-gold mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {service.description}
                  </p>
                  {service.ctaLink ? (
                    <Link to={service.ctaLink}>
                      <Button 
                        variant="gold" 
                        className="w-full"
                        size="lg"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      variant="gold" 
                      className="w-full"
                      size="lg"
                      onClick={() => handleWhatsAppClick(service.whatsapp)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {service.cta}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Prêt à découvrir Marrakech ?
            </h2>
            <p className="text-ivory/70 text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour organiser votre séjour sur mesure.
              Contactez-nous pour commencer à planifier votre expérience.
            </p>
            <Button 
              variant="gold" 
              size="lg"
              onClick={() => handleWhatsAppClick('Bonjour Casa de Palmeras, je souhaite organiser mon séjour à Marrakech.')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contacter sur WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
