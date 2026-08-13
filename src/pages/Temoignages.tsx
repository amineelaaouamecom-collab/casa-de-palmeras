import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader, TestimonialCard } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Un service exceptionnel ! J\'ai trouvé la voiture parfaite pour ma famille. L\'équipe a été très professionnelle et transparente tout au long du processus. Je recommande vivement AUTOCONFIANCE.',
    author: 'Mohamed Alami',
    role: 'Casablanca - Hyundai Tucson',
  },
  {
    quote: 'AUTOCONFIANCE a dépassé toutes mes attentes. Le véhicule était exactement comme décrit et le financement a été simple et rapide. Une expérience d\'achat sans stress.',
    author: 'Fatima Benali',
    role: 'Rabat - Peugeot 3008',
  },
  {
    quote: 'Je recommande vivement ! Le service après-vente est excellent et l\'équipe est toujours disponible pour répondre à mes questions. Un vrai partenaire de confiance.',
    author: 'Youssef Kadiri',
    role: 'Marrakech - Volkswagen Golf',
  },
  {
    quote: 'Après avoir visité plusieurs concessions, j\'ai trouvé chez AUTOCONFIANCE ce que je cherchais : des véhicules de qualité et un service humain. Merci à toute l\'équipe.',
    author: 'Sara Mansouri',
    role: 'Tanger - Renault Clio',
  },
  {
    quote: 'Le processus d\'achat a été fluide du début à la fin. L\'équipe m\'a accompagné dans le choix du financement et m\'a aidé à trouver la meilleure assurance. Top !',
    author: 'Karim Benjelloun',
    role: 'Fès - Dacia Duster',
  },
  {
    quote: 'Ma première voiture achetée chez AUTOCONFIANCE et certainement pas la dernière. Professionnalisme, écoute et transparence. Que demander de plus ?',
    author: 'Amal Tazi',
    role: 'Casablanca - Toyota Yaris',
  },
  {
    quote: 'J\'ai repris mon ancien véhicule et acheté une nouvelle voiture en une seule visite. L\'estimation était juste et le processus très rapide. Efficace !',
    author: 'Hassan Lahlou',
    role: 'Agadir - Kia Sportage',
  },
  {
    quote: 'Service client impeccable. Même après l\'achat, l\'équipe reste disponible et réactive. C\'est rassurant d\'avoir un tel accompagnement.',
    author: 'Nadia Chraibi',
    role: 'Oujda - Peugeot 208',
  },
  {
    quote: 'Véhicule livré à domicile comme promis, en parfait état. La mise en main était complète et professionnelle. Je suis très satisfait de mon expérience.',
    author: 'Omar Fassi',
    role: 'Meknès - Ford Focus',
  },
];

const Temoignages = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Témoignages"
            title="Ce Que Disent Nos Clients"
            subtitle="La satisfaction de nos clients est notre plus grande fierté. Découvrez leurs expériences."
          />

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-2xl font-display font-bold text-foreground mb-1">4.9/5</p>
            <p className="text-muted-foreground">Basé sur 500+ avis clients</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Rejoignez Nos Clients Satisfaits
            </h2>
            <p className="text-ivory/70 text-lg mb-8 max-w-2xl mx-auto">
              Faites confiance à AUTOCONFIANCE pour votre prochain véhicule. 
              Découvrez notre sélection et profitez d'un service d'exception.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/vehicules">
                <Button variant="gold" size="lg">
                  Voir Nos Véhicules
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="goldOutline" size="lg" className="border-gold-light text-gold-light hover:bg-gold-light/10">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Temoignages;
