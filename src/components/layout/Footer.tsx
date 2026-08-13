import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, Clock, Instagram } from 'lucide-react';

const quickLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Voitures', href: '/#vehicules' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { name: 'Location de voitures', href: '/#services' },
  { name: 'Véhicules premium', href: '/#vehicules' },
  { name: 'Service client', href: '/contact' },
  { name: 'Assistance 24/7', href: '/contact' },
];

const supportLinks = [
  { name: 'FAQ', href: '/faq' },
  { name: 'Admin Portal', href: '/admin' },
  { name: 'WhatsApp Support', href: 'https://wa.me/212721030775' },
  { name: 'Contact', href: '/contact' },
];

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main Footer */}
      <div className="container-luxury section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Casa de Palmeras" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed mb-6">
              Location de voitures premium à Marrakech. Service simple, rapide et personnalisé pour tous vos déplacements.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/212721030775"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-crimson transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-crimson">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/70 hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-crimson">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/70 hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-crimson">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-crimson mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">WhatsApp</p>
                  <a href="https://wa.me/212721030775" className="text-ivory hover:text-crimson transition-colors">
                    +212 721 030 775
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-crimson mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Location</p>
                  <p className="text-ivory">Marrakech, Maroc</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-crimson mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Horaires</p>
                  <p className="text-ivory">24/7 Service client</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/50 text-sm">
              © {new Date().getFullYear()} CASA DE PARMIRAS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/legal" className="text-ivory/50 hover:text-crimson text-sm transition-colors">
                Legal
              </Link>
              <Link to="/privacy" className="text-ivory/50 hover:text-crimson text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
