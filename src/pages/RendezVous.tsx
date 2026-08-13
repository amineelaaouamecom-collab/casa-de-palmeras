import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Car, FileCheck, MessageCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RendezVous = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: 'Demande envoyée !', description: 'Nous vous contacterons pour confirmer.' });
  };

  const services = [
    { icon: <Car className="w-6 h-6" />, title: 'Essai véhicule', desc: 'Testez le véhicule de votre choix' },
    { icon: <FileCheck className="w-6 h-6" />, title: 'Inspection', desc: 'Faites inspecter un véhicule' },
    { icon: <MessageCircle className="w-6 h-6" />, title: 'Consultation', desc: 'Rencontrez un conseiller' },
  ];

  if (submitted) {
    return (
      <Layout>
        <section className="pt-20 sm:pt-32 section-padding bg-background">
          <div className="container-luxury text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-gold" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold mb-4">Demande Envoyée !</h1>
            <p className="text-muted-foreground mb-8">Notre équipe vous contactera dans les 24h pour confirmer votre rendez-vous.</p>
            <Button variant="gold" onClick={() => setSubmitted(false)}>Nouveau rendez-vous</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader badge="Rendez-vous" title="Prenez Rendez-vous" subtitle="Réservez une visite ou un essai avec notre équipe" />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {services.map((s, i) => (
              <div key={i} className="p-4 bg-accent rounded-lg text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center text-gold">{s.icon}</div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="luxury-card p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Votre nom *" required />
              <Input type="tel" placeholder="Téléphone *" required />
            </div>
            <Input type="email" placeholder="Email *" required />
            <Select required>
              <SelectTrigger><SelectValue placeholder="Type de rendez-vous *" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="essai">Essai véhicule</SelectItem>
                <SelectItem value="inspection">Inspection véhicule</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" required />
              <Select>
                <SelectTrigger><SelectValue placeholder="Créneau horaire" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="9h">9h - 11h</SelectItem>
                  <SelectItem value="11h">11h - 13h</SelectItem>
                  <SelectItem value="14h">14h - 16h</SelectItem>
                  <SelectItem value="16h">16h - 18h</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Informations complémentaires (véhicule souhaité, questions...)" rows={4} />
            <Button type="submit" variant="gold" size="lg" className="w-full">
              <Calendar className="w-5 h-5 mr-2" />
              Confirmer le rendez-vous
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default RendezVous;
