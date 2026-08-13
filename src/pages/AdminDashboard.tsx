import { useState, useEffect } from 'react';
import { supabase, Car, uploadBase64ToStorage } from '@/lib/supabase';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminAuth } from '@/components/layout/AdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Briefcase, Gauge, Zap, Save, X, Car as CarIcon, PlusCircle, XCircle } from 'lucide-react';
import { CarCard, CarCardData } from '@/components/cars/CarCard';
import { ImageUpload } from '@/components/ImageUpload';

const categories = ['BERLINE', 'ÉCONOMIQUE', 'SUV', 'SUV & 4X4', 'LUXE', 'UTILITAIRE'];
const brands = ['Mercedes-Benz', 'BMW', 'Audi', 'Range Rover', 'Porsche', 'Toyota', 'Volkswagen', 'Peugeot', 'Renault', 'Volvo', 'Lexus', 'Dacia', 'Autre'];
const transmissions = ['Automatique', 'Manuelle'];
const fuels = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const rentalStatuses = ['Disponible', 'Loué', 'Réservé', 'Indisponible', 'Maintenance'];

interface FormData {
  id?: string;
  name: string;
  category: string;
  image_url: string;
  images: string[];
  seats: number;
  luggage: number;
  transmission: string;
  fuel: string;
  price_per_day: number;
  is_available: boolean;
  status?: string;
}

export const AdminDashboard = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'cars' | 'reservations'>('cars');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'BERLINE',
    image_url: '',
    images: [],
    seats: 5,
    luggage: 3,
    transmission: 'Automatique',
    fuel: 'Diesel',
    price_per_day: 350,
    is_available: true,
    status: 'Disponible',
  });

  useEffect(() => {
    if (supabase) {
      fetchCars();
      fetchReservations();
    } else {
      setLoading(false);
      toast.error('Supabase not configured. Please check your .env file.');
    }
  }, []);

  const fetchReservations = async () => {
    if (!supabase) {
      console.warn('Supabase not configured, skipping reservations fetch');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch reservations error:', error);
        throw error;
      }

      if (data) {
        setReservations(data);
      } else {
        setReservations([]);
      }
    } catch (err) {
      console.error('Failed to fetch reservations from Supabase:', err);
      setReservations([]);
    }
  };

  const fetchCars = async () => {
    if (!supabase) {
      console.error('Supabase not configured. Please check your .env file.');
      setCars([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        toast.error('Failed to load vehicles from database');
        setCars([]);
      } else if (data) {
        setCars(data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error('Failed to fetch cars from Supabase:', err);
      toast.error('Failed to load vehicles from database');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setFormData({
      name: '',
      category: 'BERLINE',
      image_url: '',
      images: [],
      seats: 5,
      luggage: 3,
      transmission: 'Automatique',
      fuel: 'Diesel',
      price_per_day: 350,
      is_available: true,
      status: 'Disponible',
    });
    setEditingCar(null);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      id: car.id,
      name: car.name,
      category: car.category,
      image_url: car.image_url,
      images: (car as any).images || [car.image_url],
      seats: car.seats,
      luggage: (car as any).luggage || 3,
      transmission: car.transmission,
      fuel: car.fuel,
      price_per_day: (car as any).price_per_day || 350,
      is_available: car.is_available,
      status: (car as any).status || 'Disponible',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    if (!supabase) {
      // Local storage only mode
      try {
        const existing = JSON.parse(localStorage.getItem('casadepalmeras_vehicles') || '[]');
        const updated = existing.filter((item: any) => String(item.id) !== String(id));
        localStorage.setItem('casadepalmeras_vehicles', JSON.stringify(updated));
        setCars(prev => prev.filter(v => String(v.id) !== String(id)));
        toast.success("Véhicule supprimé (mode local)");
      } catch (localErr) {
        console.error("Local delete failed:", localErr);
        toast.error("Impossible de supprimer le véhicule.");
      }
      return;
    }

    try {
      // Attempt Supabase deletion
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;

      // Remote success update
      setCars(prev => prev.filter(vehicle => vehicle.id !== id));
      toast.success("Véhicule supprimé avec succès !");
    } catch (error) {
      console.warn("Supabase delete failed, falling back to LocalStorage removal:", error);

      try {
        // Local Storage Deletion Fallback
        const existing = JSON.parse(localStorage.getItem('casadepalmeras_vehicles') || '[]');
        const updated = existing.filter((item: any) => String(item.id) !== String(id));
        localStorage.setItem('casadepalmeras_vehicles', JSON.stringify(updated));

        // Update local state immediately
        setCars(prev => prev.filter(v => String(v.id) !== String(id)));
        toast.success("Véhicule supprimé (mode local)");
      } catch (localErr) {
        console.error("Local delete failed:", localErr);
        toast.error("Impossible de supprimer le véhicule.");
      }
    }
  };

  const handleToggleAvailability = async (car: Car) => {
    if (!supabase) {
      // Local storage only mode
      try {
        const existing = JSON.parse(localStorage.getItem('casadepalmeras_vehicles') || '[]');
        const updated = existing.map((item: any) => 
          String(item.id) === String(car.id) 
            ? { ...item, is_available: !car.is_available }
            : item
        );
        localStorage.setItem('casadepalmeras_vehicles', JSON.stringify(updated));
        setCars(updated);
        toast.success(`Vehicle ${car.is_available ? 'deactivated' : 'activated'} (mode local)`);
      } catch (error) {
        console.error('Error toggling availability:', error);
        toast.error('Error updating vehicle');
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('cars')
        .update({ is_available: !car.is_available })
        .eq('id', car.id);

      if (error) throw error;
      
      toast.success(`Vehicle ${car.is_available ? 'deactivated' : 'activated'} successfully`);
      fetchCars();
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Error updating vehicle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called', formData);

    if (!supabase) {
      toast.error('Supabase not configured. Please check your .env file.');
      return;
    }

    try {
      // Prepare images array with fallback
      const rawImages = formData.images && formData.images.length > 0 
        ? formData.images 
        : [formData.image_url || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800'];
      
      console.log('Raw images:', rawImages);

      // Upload Base64 images to Supabase Storage
      const uploadedImages: string[] = [];
      const vehicleId = editingCar?.id || crypto.randomUUID();
      
      for (const img of rawImages) {
        // Check if image is Base64 (starts with data:)
        if (img.startsWith('data:')) {
          const publicUrl = await uploadBase64ToStorage(img, `vehicles/${vehicleId}`);
          if (publicUrl) {
            uploadedImages.push(publicUrl);
          } else {
            // Use placeholder if upload fails
            uploadedImages.push('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800');
          }
        } else {
          // Already a URL, keep as is
          uploadedImages.push(img);
        }
      }

      const finalImageUrl = uploadedImages[0];

      const vehicleData = {
        id: editingCar?.id || vehicleId,
        name: formData.name || "Untitled Vehicle",
        category: formData.category || "BERLINE",
        image_url: finalImageUrl,
        images: uploadedImages,
        seats: formData.seats || 5,
        luggage: formData.luggage || 3,
        transmission: formData.transmission || "Automatique",
        fuel: formData.fuel || "Diesel",
        price_per_day: formData.price_per_day || 350,
        is_available: formData.is_available ?? true,
        status: formData.status || "Disponible",
      };

      console.log('Vehicle data prepared:', vehicleData);

      if (editingCar) {
        console.log('Updating existing car in Supabase:', editingCar.id);
        // Update existing car
        const { error } = await supabase
          .from('cars')
          .update(vehicleData)
          .eq('id', editingCar.id);

        if (error) {
          console.error("Supabase update error:", error);
          toast.error(`Failed to update vehicle: ${error.message}`);
          return;
        }
        toast.success('Vehicle updated successfully');
      } else {
        console.log('Adding new car to Supabase');
        // Add new car - only insert essential fields to avoid timeout
        const { data, error } = await supabase
          .from('cars')
          .insert([{
            id: vehicleData.id,
            name: vehicleData.name,
            category: vehicleData.category,
            image_url: vehicleData.image_url,
            images: vehicleData.images,
            seats: vehicleData.seats,
            luggage: vehicleData.luggage,
            transmission: vehicleData.transmission,
            fuel: vehicleData.fuel,
            price_per_day: vehicleData.price_per_day,
            is_available: vehicleData.is_available,
            status: vehicleData.status,
          }])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          toast.error(`Failed to save vehicle: ${error.message}`);
          return;
        }
        console.log('Supabase insert success:', data);
        toast.success('Vehicle added successfully');
      }

      console.log('Closing dialog and refreshing');
      // Close modal, clear form, and refresh list
      setIsDialogOpen(false);
      resetForm();
      fetchCars();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error('An unexpected error occurred while saving the vehicle');
    }
  };

  const previewCar: CarCardData = {
    id: formData.id || 'preview',
    name: formData.name || 'Vehicle Name',
    category: formData.category,
    image_url: formData.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    images: formData.images || [formData.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'],
    seats: formData.seats,
    transmission: formData.transmission,
    fuel: formData.fuel,
    is_available: formData.is_available,
    price_per_day: formData.price_per_day,
    status: formData.status,
  } as any;

  if (loading) {
    return (
      <AdminLayout>
        <div className="container-luxury py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crimson"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="container-luxury">
        {/* Header Card with Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                  CASA DE PALMERAS Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  {cars.length} véhicule{cars.length > 1 ? 's' : ''} • {reservations.length} réservation{reservations.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'cars' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('cars')}
                  className={activeTab === 'cars' ? 'bg-[#FF2D38] text-white' : ''}
                >
                  <CarIcon className="w-4 h-4 mr-2" />
                  Véhicules
                </Button>
                <Button
                  variant={activeTab === 'reservations' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('reservations')}
                  className={activeTab === 'reservations' ? 'bg-[#FF2D38] text-white' : ''}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Réservations
                </Button>
              </div>
              {activeTab === 'cars' && (
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (open) resetForm();
                }}>
                    <DialogTrigger asChild>
                      <Button variant="crimson">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un véhicule
                      </Button>
                    </DialogTrigger>
                  <DialogContent className="max-w-[95vw] w-full max-h-[85vh] overflow-hidden sm:max-w-5xl bg-[#141418] border border-zinc-800 rounded-2xl flex flex-col">
                    {/* Sticky Header */}
                    <div className="flex items-center justify-between p-5 border-b border-zinc-800 shrink-0">
                      <DialogTitle className="text-2xl font-display font-bold text-foreground">
                        {editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
                      </DialogTitle>
                    </div>

                    {/* Scrollable Body - Two Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto flex-1">
                      {/* Left Column - Form Inputs */}
                      <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4" id="vehicleForm">
                          <div>
                            <Label htmlFor="name">Nom du véhicule</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="ex: Range Rover Evoque"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="category">Catégorie</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Image principale</Label>
                            <ImageUpload
                              value={formData.image_url}
                              onChange={(url) => {
                                setFormData({ ...formData, image_url: url });
                                // Update images array if this is the first image
                                if (!formData.images || formData.images.length === 0) {
                                  setFormData({ ...formData, image_url: url, images: [url] });
                                } else {
                                  setFormData({ ...formData, image_url: url, images: [url, ...formData.images.slice(1)] });
                                }
                              }}
                            />
                          </div>

                          <div>
                            <Label>Images du véhicule (max 5)</Label>
                            <div className="space-y-2">
                              {/* File Upload Dropzone */}
                              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-zinc-600 transition-colors">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    
                                    if ((formData.images?.length || 0) + files.length > 5) {
                                      toast.error("Vous ne pouvez pas ajouter plus de 5 photos.");
                                      return;
                                    }

                                    files.forEach(file => {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setFormData(prev => ({
                                          ...prev,
                                          images: [...(prev.images || []), reader.result as string].slice(0, 5),
                                          image_url: prev.images?.length === 0 ? reader.result as string : prev.image_url
                                        }));
                                      };
                                      reader.readAsDataURL(file);
                                    });
                                  }}
                                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crimson file:text-white hover:file:bg-crimson/90"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                  Glissez-déposez des images ou cliquez pour sélectionner (max 5)
                                </p>
                              </div>

                              {/* Image Preview Grid */}
                              {formData.images && formData.images.length > 0 && (
                                <div className="grid grid-cols-5 gap-2">
                                  {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                      <img
                                        src={img}
                                        alt={`Image ${idx + 1}`}
                                        className="w-full h-20 object-cover rounded border border-zinc-700"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newImages = formData.images.filter((_, i) => i !== idx);
                                          setFormData({ 
                                            ...formData, 
                                            images: newImages,
                                            image_url: newImages.length > 0 ? newImages[0] : ''
                                          });
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                                        {idx + 1}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="seats">Places</Label>
                              <Input
                                id="seats"
                                type="number"
                                min="1"
                                max="9"
                                value={formData.seats}
                                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="luggage">Bagages</Label>
                              <Input
                                id="luggage"
                                type="number"
                                min="0"
                                max="10"
                                value={formData.luggage}
                                onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) })}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="transmission">Transmission</Label>
                            <Select
                              value={formData.transmission}
                              onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {transmissions.map((trans) => (
                                  <SelectItem key={trans} value={trans}>
                                    {trans}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="fuel">Carburant</Label>
                            <Select
                              value={formData.fuel}
                              onValueChange={(value) => setFormData({ ...formData, fuel: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fuels.map((fuel) => (
                                  <SelectItem key={fuel} value={fuel}>
                                    {fuel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="price_per_day">Prix par jour (MAD)</Label>
                            <Input
                              id="price_per_day"
                              type="number"
                              min="0"
                              step="0.01"
                              value={formData.price_per_day}
                              onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="status">Statut</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {rentalStatuses.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_available"
                          checked={formData.is_available}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                        />
                        <Label htmlFor="is_available">Disponible</Label>
                      </div>
                          
                          {/* Submit Buttons inside form */}
                          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setIsDialogOpen(false);
                                resetForm();
                              }}
                            >
                              Annuler
                            </Button>
                            <Button
                              type="submit"
                              className="text-white font-semibold"
                              style={{ backgroundColor: '#FF2D38' }}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {editingCar ? 'Mettre à jour' : 'Ajouter le Véhicule'}
                            </Button>
                          </div>
                          </form>
                        </div>

                        {/* Live Preview - Right Panel */}
                        <div className="sticky top-0">
                          <h3 className="font-semibold mb-4 text-foreground">Aperçu en direct</h3>
                          <CarCard car={previewCar} />
                        </div>
                      </div>
                  </DialogContent>
              </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Cars Table */}
        {activeTab === 'cars' && (
          <Card>
            <CardHeader>
              <CardTitle>Liste des véhicules</CardTitle>
            </CardHeader>
            <CardContent>
              {cars.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                  <Plus className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  Aucun véhicule dans la flotte
                </h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter votre premier véhicule
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un véhicule
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix/jour</TableHead>
                      <TableHead>Transmission</TableHead>
                      <TableHead>Carburant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Disponible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell>
                          <img
                            src={car.image_url}
                            alt={car.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{car.name}</TableCell>
                        <TableCell>{car.category}</TableCell>
                        <TableCell>{(car as any).price_per_day ? `${(car as any).price_per_day} MAD` : 'N/A'}</TableCell>
                        <TableCell>{car.transmission}</TableCell>
                        <TableCell>{car.fuel}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            (car as any).status === 'Disponible' ? 'bg-green-500/20 text-green-400' :
                            (car as any).status === 'Loué' ? 'bg-blue-500/20 text-blue-400' :
                            (car as any).status === 'Réservé' ? 'bg-yellow-500/20 text-yellow-400' :
                            (car as any).status === 'Maintenance' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {(car as any).status || 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={car.is_available}
                            onCheckedChange={() => handleToggleAvailability(car)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(car)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(car.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Reservations Table */}
        {activeTab === 'reservations' && (
          <Card>
            <CardHeader>
              <CardTitle>Liste des réservations</CardTitle>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Aucune réservation
                  </h3>
                  <p className="text-muted-foreground">
                    Les réservations apparaîtront ici
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Véhicule</TableHead>
                        <TableHead>Date début</TableHead>
                        <TableHead>Date fin</TableHead>
                        <TableHead>Prix total</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((res) => (
                        <TableRow key={res.id}>
                          <TableCell className="font-medium">{res.customer_name}</TableCell>
                          <TableCell>{res.phone}</TableCell>
                          <TableCell>{res.car_name}</TableCell>
                          <TableCell>{new Date(res.start_date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{new Date(res.end_date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{res.total_price} MAD</TableCell>
                          <TableCell>{res.pickup_location}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              res.status === 'Confirmé' ? 'bg-green-500/20 text-green-400' :
                              res.status === 'En attente' ? 'bg-yellow-500/20 text-yellow-400' :
                              res.status === 'Annulé' ? 'bg-red-500/20 text-red-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {res.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
    </AdminAuth>
  );
};

export default AdminDashboard;
