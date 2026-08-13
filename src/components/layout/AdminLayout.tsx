import { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useAuth } from '@/context/AuthContext';
import { LogOut, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-charcoal text-ivory border-b border-border">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Casa de Palmeras — Dashboard Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Voir le site public
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-zinc-700 text-ivory/70 hover:text-ivory hover:bg-zinc-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 pb-16">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
