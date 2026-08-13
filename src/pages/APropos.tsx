import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader, StatCard } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Award, Users, Shield, Heart } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';

const values = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Confiance',
    description: 'La transparence et l\'honnêteté sont au cœur de chaque transaction.',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Excellence',
    description: 'Nous ne sélectionnons que les meilleurs véhicules pour nos clients.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Service',
    description: 'Un accompagnement personnalisé à chaque étape de votre parcours.',
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Passion',
    description: 'L\'automobile est notre passion, votre satisfaction notre mission.',
  },
];

const stats = [
  { value: '20+', label: 'Véhicules disponibles' },
  { value: '500+', label: 'Locations effectuées' },
  { value: '24/7', label: 'Service client' },
  { value: '100%', label: 'Satisfaction' },
];

const team: never[] = [];

const APropos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="À Propos"
            title="Notre Histoire"
            subtitle="Découvrez CASA DE PARMIRAS, votre partenaire de confiance depuis plus de 15 ans"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Une Vision, Une Mission
              </h2>
              <div className="gold-divider mb-6 mx-auto" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                CASA DE PALMERAS est né d'une vision simple : offrir une expérience de location de voitures premium à Marrakech qui soit simple, transparente et de qualité supérieure.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nous comprenons que chaque voyage est unique. C'est pourquoi nous proposons une large gamme de véhicules pour répondre à tous vos besoins : SUV spacieux pour les familles, berlines élégantes pour les affaires, et citadines pratiques pour la ville.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Chaque véhicule de notre parc est soigneusement entretenu et inspecté pour garantir votre sécurité et votre confort. Notre mission est de faire de chaque location une expérience sans souci, du premier contact à la restitution du véhicule.
              </p>

              <div className="space-y-3 max-w-lg mx-auto text-left">
                {[
                  'Véhicules inspectés et entretenus',
                  'Processus de réservation simple',
                  'Livraison à votre hôtel ou aéroport',
                  'Support client 24/7',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gold-light mb-2">
                  {stat.value}
                </div>
                <div className="text-ivory/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Valeurs"
            title="Ce Qui Nous Anime"
            subtitle="Des valeurs fortes qui guident chacune de nos actions"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="luxury-card-hover p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-gold">
                  {value.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeader
            badge="Notre Équipe"
            title="Des Experts à Votre Service"
            subtitle="Une équipe passionnée et expérimentée pour vous accompagner"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center text-gold text-4xl font-display font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-gold-subtle">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Réservez Votre Véhicule
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Prêt à découvrir Marrakech avec style et confort ? Contactez-nous dès maintenant pour réserver votre véhicule.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg">
                  Réserver sur WhatsApp
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="goldOutline" size="lg">
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

export default APropos;
