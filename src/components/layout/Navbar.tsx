import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Voitures', href: '/vehicules' },
  { name: 'Services', href: '/services' },
  { name: 'À propos', href: '/#apropos' },
  { name: 'Contact', href: '/contact' },
];

const handleNavClick = (href: string) => {
  if (href.startsWith('/#')) {
    const elementId = href.replace('/#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800 py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/images/cars/ChatGPT Image Aug 13, 2026, 02_46_52 AM.png" 
                alt="Casa de Palmeras" 
                className="h-20 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md whitespace-nowrap relative',
                  location.pathname === link.href
                    ? 'text-crimson'
                    : 'text-white hover:text-crimson'
                )}
              >
                {link.name}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/212721030775"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="crimson" size="sm">
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[350px] bg-charcoal text-ivory border-white/10">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6 pt-2">
                  <img 
                    src="/images/cars/ChatGPT Image Aug 13, 2026, 02_46_52 AM.png" 
                    alt="Casa de Palmeras" 
                    className="h-16 w-auto object-contain"
                  />
                </div>

                <nav className="flex-1 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => {
                        // Close sheet on mobile when clicking a link
                        const sheetTrigger = document.querySelector('[data-radix-scroll-area]')?.closest('[role="dialog"]') as HTMLElement;
                        sheetTrigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                      }}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300',
                        location.pathname === link.href
                          ? 'text-crimson bg-white/10'
                          : 'text-white hover:text-crimson hover:bg-white/5'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                  <a
                    href="https://wa.me/212721030775"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+212 721 030 775</span>
                  </a>
                  <a href="https://wa.me/212721030775" target="_blank" rel="noopener noreferrer" className="block px-4">
                    <Button variant="crimson" className="w-full h-12 text-base font-semibold">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};
