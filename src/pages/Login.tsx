import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            toast.success('Connexion réussie');
            navigate('/admin');
        } else {
            toast.error('Mot de passe incorrect');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-obsidian">
            <div className="bg-charcoal border border-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-crimson/10 rounded-full mb-4">
                        <Lock className="w-10 h-10 text-crimson" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-center text-foreground mb-2">Casa de Palmeras</h1>
                    <p className="text-sm text-muted-foreground text-center">Portail Admin</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full bg-crimson hover:bg-crimson-dark text-white font-semibold"
                        style={{ backgroundColor: '#FF2D38' }}
                    >
                        Accéder au Tableau de Bord
                    </Button>
                </form>
            </div>
        </div>
    );
}
