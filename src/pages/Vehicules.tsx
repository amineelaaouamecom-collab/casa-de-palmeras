import { useState, useMemo, useEffect } from 'react';
import { supabase, Car } from '@/lib/supabase';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { CarCard } from '@/components/cars/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid, List, X, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'range-rover', label: 'Range Rover / Land Rover' },
  { id: 'volkswagen', label: 'Volkswagen' },
  { id: 'mercedes-benz', label: 'Mercedes-Benz' },
  { id: 'porsche', label: 'Porsche' },
  { id: 'bmw', label: 'BMW' },
  { id: 'audi', label: 'Audi' },
];

const Vehicules = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
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
          setCars([]);
        } else if (data) {
          setCars(data);
        } else {
          setCars([]);
        }
      } catch (err) {
        console.error('Failed to fetch cars from Supabase:', err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    let result = selectedCategory === 'all'
      ? cars
      : cars.filter(car => (car as any).brand === selectedCategory);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(term) ||
          car.category.toLowerCase().includes(term)
      );
    }

    result = result.sort((a: any, b: any) => {
      if (sortBy === 'price-asc') return (a.price_per_day || 0) - (b.price_per_day || 0);
      if (sortBy === 'price-desc') return (b.price_per_day || 0) - (a.price_per_day || 0);
      return 0;
    });

    return result;
  }, [selectedCategory, searchTerm, cars, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Notre Flotte"
            title="Véhicules Disponibles"
            subtitle="Découvrez notre sélection de véhicules premium pour vos déplacements à Marrakech"
          />
        </div>
      </section>

      {/* Unified Control Bar */}
      <section className="py-6 bg-background border-b border-border sticky top-16 z-40 backdrop-blur-md bg-background/95">
        <div className="container-luxury">
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
            {/* Search - Left */}
            <div className="relative w-full xl:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex-shrink-0',
                    selectedCategory === category.id
                      ? 'bg-crimson text-white shadow-lg shadow-crimson/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort & View Toggle - Right */}
            <div className="flex items-center gap-3 w-full xl:w-auto">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full xl:w-[180px]">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price Ascending</SelectItem>
                  <SelectItem value="price-desc">Price Descending</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Chargement des véhicules...</p>
            </div>
          ) : (
            <>
              {/* Results Count with Pulse */}
              <div className="mb-8 flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{filteredCars.length}</span> vehicle{filteredCars.length > 1 ? 's' : ''} available
                </p>
              </div>

              {/* Cars Grid */}
              {filteredCars.length > 0 ? (
                <div className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                    : 'grid-cols-1 max-w-3xl mx-auto'
                )}>
                  {filteredCars.map((car, index) => (
                    <CarCard key={car.id} car={car} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                    Aucun véhicule ne correspond à votre recherche
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie
                  </p>
                  <Button 
                    onClick={() => { setSearchTerm(''); handleCategoryChange('all'); }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Vehicules;
