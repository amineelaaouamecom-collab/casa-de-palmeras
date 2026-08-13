import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    title: 'Achat de Véhicule',
    questions: [
      {
        question: 'Comment se déroule le processus d\'achat ?',
        answer: 'Le processus est simple : choisissez votre véhicule, prenez rendez-vous pour un essai, validez votre choix et nous nous occupons des formalités. Vous pouvez également bénéficier de notre service de livraison à domicile.',
      },
      {
        question: 'Puis-je essayer un véhicule avant l\'achat ?',
        answer: 'Absolument ! Nous encourageons tous nos clients à essayer le véhicule de leur choix. Prenez simplement rendez-vous via notre site ou par téléphone, et notre équipe organisera l\'essai à votre convenance.',
      },
      {
        question: 'Les véhicules sont-ils garantis ?',
        answer: 'Oui, tous nos véhicules bénéficient d\'une garantie mécanique. Selon le véhicule et votre choix, la garantie peut aller de 6 à 24 mois. Nous proposons également des extensions de garantie.',
      },
      {
        question: 'Comment vérifiez-vous la qualité des véhicules ?',
        answer: 'Chaque véhicule passe une inspection rigoureuse en 150 points de contrôle. Nous vérifions l\'historique complet, l\'état mécanique, la carrosserie et tous les équipements. Un rapport d\'inspection est disponible pour chaque véhicule.',
      },
    ],
  },
  {
    title: 'Financement & Paiement',
    questions: [
      {
        question: 'Quelles sont les options de financement disponibles ?',
        answer: 'Nous proposons plusieurs solutions : crédit classique avec nos banques partenaires, location avec option d\'achat (LOA), et paiement échelonné. Notre équipe vous accompagne pour trouver la solution adaptée à votre budget.',
      },
      {
        question: 'Peut-on payer en plusieurs fois ?',
        answer: 'Oui, nous proposons des facilités de paiement. Selon le montant et votre situation, vous pouvez bénéficier d\'un paiement échelonné. Contactez-nous pour étudier votre dossier.',
      },
      {
        question: 'Quels documents sont nécessaires pour le financement ?',
        answer: 'Les documents habituellement requis sont : pièce d\'identité, justificatif de domicile, justificatifs de revenus et relevés bancaires. Notre équipe vous guidera dans la constitution de votre dossier.',
      },
      {
        question: 'Combien de temps prend l\'accord de financement ?',
        answer: 'L\'étude de dossier est généralement réalisée sous 48 à 72 heures. Dans certains cas, nous pouvons obtenir un accord de principe le jour même.',
      },
    ],
  },
  {
    title: 'Garantie & Après-Vente',
    questions: [
      {
        question: 'Que couvre la garantie AUTOCONFIANCE ?',
        answer: 'Notre garantie couvre les principaux organes mécaniques : moteur, boîte de vitesses, direction, suspension, etc. Elle inclut également une assistance 24h/24 en cas de panne.',
      },
      {
        question: 'Proposez-vous un service après-vente ?',
        answer: 'Oui, nous disposons d\'un atelier équipé pour l\'entretien et les réparations. Nos clients bénéficient de tarifs préférentiels et d\'un véhicule de courtoisie sur demande.',
      },
      {
        question: 'Puis-je faire l\'entretien ailleurs ?',
        answer: 'Vous êtes libre de faire entretenir votre véhicule où vous le souhaitez. Cependant, pour maintenir la garantie, nous recommandons de respecter le carnet d\'entretien du constructeur.',
      },
      {
        question: 'Que faire en cas de panne ?',
        answer: 'Appelez notre numéro d\'assistance disponible 24h/24. Selon votre garantie, nous organiserons le dépannage et la prise en charge de votre véhicule.',
      },
    ],
  },
  {
    title: 'Reprise & Livraison',
    questions: [
      {
        question: 'Reprenez-vous mon ancien véhicule ?',
        answer: 'Oui, nous proposons un service de reprise. L\'estimation est gratuite et sans engagement. Le montant de la reprise peut être déduit directement de votre nouvel achat.',
      },
      {
        question: 'Comment est estimée la valeur de reprise ?',
        answer: 'Nous prenons en compte le modèle, l\'année, le kilométrage, l\'état général et l\'historique du véhicule. Un expert évalue votre véhicule et vous fait une offre transparente.',
      },
      {
        question: 'Livrez-vous partout au Maroc ?',
        answer: 'Oui, nous proposons la livraison dans tout le Maroc. Les frais de livraison varient selon la distance. Contactez-nous pour un devis personnalisé.',
      },
      {
        question: 'Combien de temps pour la livraison ?',
        answer: 'Une fois les formalités complétées, la livraison s\'effectue généralement sous 3 à 7 jours ouvrables selon votre localisation.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="FAQ"
            title="Questions Fréquentes"
            subtitle="Trouvez les réponses à vos questions les plus courantes"
          />
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="luxury-card px-6"
                    >
                      <AccordionTrigger className="text-left font-medium hover:text-gold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions. 
              N'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/212662021536" target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="goldOutline" size="lg">
                  Nous Contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
