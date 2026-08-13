import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, MapPin, Package, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: {
    id: string;
    name: string;
    brand?: string;
    category: string;
    image_url: string;
    year?: number;
    price_status?: string;
    export_price?: string;
    fuel?: string;
    transmission?: string;
    mileage?: string;
    sourcing_city?: string;
  };
}

export const BookingModal = ({ open, onOpenChange, car }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    destination: '',
    quantity: '1',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format WhatsApp message for rental inquiry
      const whatsappMessage = encodeURIComponent(
        `Bonjour Casa de Palmeras,\n\n` +
        `🚗 Demande de location:\n` +
        `• Véhicule: ${car.name}\n` +
        `• Catégorie: ${car.category}\n` +
        `• Carburant: ${car.fuel || 'N/A'}\n` +
        `• Transmission: ${car.transmission || 'N/A'}\n` +
        `• Places: ${car.seats || 'N/A'}\n` +
        `• Prix/jour: ${(car as any).price_per_day || 'N/A'} MAD\n\n` +
        `👤 Coordonnées client:\n` +
        `• Nom: ${formData.fullName}\n` +
        `• Téléphone/WhatsApp: ${formData.phone}\n` +
        `• Date de début: ${formData.startDate}\n` +
        `• Date de fin: ${formData.endDate}\n` +
        `• Quantity: ${formData.quantity} unit${formData.quantity !== '1' ? 's' : ''}\n\n` +
        `${formData.message ? `📝 Message: ${formData.message}\n` : ''}` +
        `Please provide a quote for this vehicle. Thank you!`
      );

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/8613336058744?text=${whatsappMessage}`, '_blank');

      toast.success('Quote request sent via WhatsApp!');
      onOpenChange(false);

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        destination: '',
        quantity: '1',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Error sending inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">
            Demander un Devis : {car.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Summary */}
          <div className="flex items-center gap-4 p-4 bg-accent rounded-lg border border-border">
            <img
              src={car.image_url}
              alt={car.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="text-xs font-medium text-crimson uppercase tracking-wider mb-1">
                {car.brand || 'Brand'}
              </p>
              <p className="font-semibold text-lg">{car.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{car.year || 'N/A'}</span>
                <span>•</span>
                <span className="px-2 py-0.5 bg-crimson/10 text-crimson rounded-full text-xs font-medium">
                  {car.category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {car.price_status === 'Export Price' && car.export_price ? (
                  <span className="text-crimson font-semibold">{car.export_price}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">VIN on Request • CN - EXPORT</span>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Details */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom complet *
              </Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your full name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone / WhatsApp *
              </Label>
              <Input
                id="phone"
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pays de destination *
              </Label>
              <Input
                id="destination"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="e.g., United Arab Emirates, Nigeria"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Nombre d'unités
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message / Spécifications
              </Label>
              <Input
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any specific requirements or questions..."
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: '#FF2D38' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement...' : 'Demander le devis sur WhatsApp'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
