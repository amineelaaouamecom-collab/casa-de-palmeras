import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
  { id: 1, title: 'Comment bien choisir sa première voiture ?', excerpt: 'Guide complet pour les nouveaux conducteurs...', date: '15 Janvier 2026', category: 'Conseils' },
  { id: 2, title: 'L\'entretien de votre véhicule en été', excerpt: 'Les points essentiels à vérifier avant les vacances...', date: '10 Janvier 2026', category: 'Entretien' },
  { id: 3, title: 'SUV vs Berline : quel choix pour votre famille ?', excerpt: 'Comparatif détaillé pour vous aider à choisir...', date: '5 Janvier 2026', category: 'Comparatif' },
  { id: 4, title: 'Les avantages du financement automobile', excerpt: 'Découvrez les différentes options de financement...', date: '1 Janvier 2026', category: 'Financement' },
];

const Blog = () => {
  return (
    <Layout>
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader badge="Blog" title="Actualités & Conseils" subtitle="Restez informé avec nos derniers articles" />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="luxury-card-hover p-6 group">
                <span className="text-xs font-medium text-gold uppercase tracking-wider">{post.category}</span>
                <h2 className="text-xl font-display font-semibold mt-2 mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</span>
                  <span className="text-gold font-medium flex items-center gap-1">Lire <ArrowRight className="w-4 h-4" /></span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
