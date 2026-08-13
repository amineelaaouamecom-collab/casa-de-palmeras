import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Clock, MessageCircle, Instagram, Globe, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    model: '',
    destination: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Bonjour Casa de Palmeras,

Je suis intéressé par une location de véhicule:

Nom: ${formData.name}
WhatsApp: ${formData.whatsapp}
Modèle intéressé: ${formData.model}
Détails supplémentaires: ${formData.details}

Veuillez me contacter avec plus d'informations.`;
    
    const whatsappUrl = `https://wa.me/212721030775?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout>
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Contact"
            title="Contactez-nous"
            subtitle="Notre équipe est disponible 24/7 pour répondre à vos questions de location"
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left">
                <h2 className="text-3xl font-display font-bold mb-8">Informations de Contact</h2>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-crimson/30 transition-all">
                    <div className="p-3 bg-crimson/10 rounded-full text-crimson">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-2">WhatsApp</p>
                      <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-crimson text-lg transition-colors">+212 721 030 775</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-crimson/30 transition-all">
                    <div className="p-3 bg-crimson/10 rounded-full text-crimson">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-2">Adresse</p>
                      <p className="text-muted-foreground text-lg">Marrakech, Maroc</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-crimson/30 transition-all">
                    <div className="p-3 bg-crimson/10 rounded-full text-crimson">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-2">Horaires</p>
                      <p className="text-muted-foreground text-lg">24/7 Service client</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Inquiry Form */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
                  <h2 className="text-2xl font-display font-bold mb-6">Envoyer une demande</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">Numéro WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Modèle intéressé *</Label>
                      <Input
                        id="model"
                        required
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        placeholder="ex: Range Rover, Mercedes-Benz"
                      />
                    </div>
                    <div>
                      <Label htmlFor="details">Détails supplémentaires</Label>
                      <Textarea
                        id="details"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Date de location, durée, etc..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" variant="crimson" className="w-full" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer via WhatsApp
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
