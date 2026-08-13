import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase, Car } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CarCard } from '@/components/cars/CarCard';
import { 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Calendar,
  Shield,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const VehiculeDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      if (!supabase) {
        console.warn('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        setCar(data);
        
        // Fetch related cars (same category)
        const { data: relatedData, error: relatedError } = await supabase
          .from('cars')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .limit(4);

        if (relatedError) {
          console.warn('Error fetching related cars:', relatedError);
        } else {
          setRelatedCars(relatedData || []);
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <section className="section-padding pt-20 sm:pt-32">
          <div className="container-luxury text-center">
            <p>Chargement...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <section className="section-padding pt-20 sm:pt-32">
          <div className="container-luxury text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Véhicule non trouvé</h1>
            <p className="text-muted-foreground mb-8">Le véhicule que vous recherchez n'existe pas.</p>
            <Link to="/vehicules">
              <Button style={{ backgroundColor: '#C8AD7F' }}>Voir tous les véhicules</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-20 sm:pt-24 pb-4 bg-secondary">
        <div className="container-luxury">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/vehicules" className="text-muted-foreground hover:text-foreground transition-colors">
              Véhicules
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{car.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <div className="relative rounded-xl overflow-hidden bg-gradient-gold-subtle shadow-elevated">
                  {car.images && car.images.length > 0 ? (
                    <>
                      <img
                        src={car.images[currentImageIndex]}
                        alt={`${car.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-auto aspect-[4/3] object-cover"
                      />
                      
                      {/* Carousel Navigation */}
                      {car.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + car.images!.length) % car.images!.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % car.images!.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {car.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                  idx === currentImageIndex ? "bg-white" : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <img
                      src={car.image_url}
                      alt={car.name}
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {car.category}
                    </span>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {(car as any).images && (car as any).images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {(car as any).images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex ? "border-gold" : "border-transparent"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category & Name */}
              <p className="text-gold font-medium uppercase tracking-wider mb-2">
                {car.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                {car.name}
              </h1>
              
              <div className="gold-divider mb-6" />

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Spécifications
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{car.seats} places</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{(car as any).luggage || 0} bagages</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mb-8">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  (car as any).status === 'Disponible' ? 'bg-green-500/20 text-green-400' :
                  (car as any).status === 'Loué' ? 'bg-blue-500/20 text-blue-400' :
                  (car as any).status === 'Réservé' ? 'bg-yellow-500/20 text-yellow-400' :
                  (car as any).status === 'Maintenance' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {(car as any).status || 'Disponible'}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`https://wa.me/212721030775?text=Bonjour, je suis intéressé par la location de ${encodeURIComponent(car.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" className="w-full" style={{ backgroundColor: '#C8AD7F' }}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Réserver sur WhatsApp
                  </Button>
                </a>
              </div>

              {/* Phone */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm mb-2">Appelez-nous directement</p>
                <div className="flex justify-center">
                  <a href="tel:+212721030775" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" />
                    +212 721 030 775
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-luxury">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Véhicules similaires
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar, index) => (
                <CarCard key={relatedCar.id} car={relatedCar as any} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default VehiculeDetail;
