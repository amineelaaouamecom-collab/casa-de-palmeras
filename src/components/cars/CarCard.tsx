import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarCardData {
  id: string;
  name: string;
  brand?: string;
  category: string;
  categoryLabel: string;
  image: string;
  images?: string[];
  features: string[];
  idealFor: string;
  comfort: string;
  usage: string[];
  is_available: boolean;
  [key: string]: any;
}

interface CarCardProps {
  car: CarCardData;
  index?: number;
}

export const VehicleCardImage = ({ car }: { car: CarCardData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback array normalization
  const imageList: string[] = 
    Array.isArray(car.images) && car.images.length > 0
      ? car.images
      : car.image
      ? [car.image]
      : ['/placeholder-car.png'];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const currentImage = imageList[currentIndex];

  return (
    <div 
      className="relative w-full h-[250px] sm:h-[250px] lg:h-[250px] max-sm:h-auto overflow-hidden flex-shrink-0 group select-none"
      style={{ borderRadius: '16px 16px 0 0' }}
    >
      <img
        src={currentImage}
        alt={car.name || 'Vehicle'}
        className="w-full h-full max-sm:h-auto object-cover object-[center_68%] max-sm:object-center transition-transform duration-700 group-hover:scale-110"
      />

      {/* Navigation Arrows (Only show if more than 1 image exists) */}
      {imageList.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
          >
            &#10094;
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
          >
            &#10095;
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group"
      >
      <div className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-[3px]" style={{
        background: '#15171b',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(213,183,127,0.25)';
        e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {/* Image Container */}
        <div className="relative">
          <VehicleCardImage car={car} />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-medium bg-gold/90 backdrop-blur-sm rounded-full text-white">
              {car.categoryLabel || car.category}
            </span>
          </div>
          {/* Availability Badge */}
          {!car.is_available && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 text-xs font-medium bg-gray-600/90 backdrop-blur-sm rounded-full text-white">
                RÉSERVÉ
              </span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col" style={{ padding: '14px 14px 16px' }}>
          {/* Category & Name */}
          <div style={{ marginBottom: '12px' }}>
            <p className="text-xs font-medium text-gold uppercase tracking-wider mb-1">
              {car.categoryLabel || car.category}
            </p>
            <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-gold transition-colors">
              {car.name}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-2 flex-shrink-0" style={{ marginBottom: '12px' }}>
            <span className="px-2.5 py-1.5 text-xs font-semibold rounded-full text-white" style={{
              background: 'rgba(174,125,47,0.20)',
              border: '1px solid rgba(209,174,112,0.12)',
              padding: '6px 10px',
              fontSize: '11px'
            }}>
              {car.transmission}
            </span>
            <span className="px-2.5 py-1.5 text-xs font-semibold rounded-full text-white" style={{
              background: 'rgba(174,125,47,0.20)',
              border: '1px solid rgba(209,174,112,0.12)',
              padding: '6px 10px',
              fontSize: '11px'
            }}>
              {car.fuel}
            </span>
            <span className="px-2.5 py-1.5 text-xs font-semibold rounded-full text-white" style={{
              background: 'rgba(174,125,47,0.20)',
              border: '1px solid rgba(209,174,112,0.12)',
              padding: '6px 10px',
              fontSize: '11px'
            }}>
              {car.seats} places
            </span>
          </div>

          {/* Status */}
          <div style={{ marginBottom: '14px' }}>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              (car as any).status === 'Disponible' ? 'bg-green-900/40 text-green-400 border border-green-800/30' :
              (car as any).status === 'Loué' ? 'bg-blue-900/40 text-blue-400 border border-blue-800/30' :
              (car as any).status === 'Réservé' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-800/30' :
              (car as any).status === 'Maintenance' ? 'bg-orange-900/40 text-orange-400 border border-orange-800/30' :
              'bg-gray-800/40 text-gray-400 border border-gray-700/30'
            }`} style={{ fontSize: '11px', padding: '5px 10px' }}>
              {(car as any).status || 'Disponible'}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <a
              href={`https://wa.me/212721030775?text=Bonjour, je suis intéressé par la location de ${encodeURIComponent(car.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-full min-h-[46px] sm:min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200",
                car.is_available
                  ? "text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              )}
              style={{
                backgroundColor: car.is_available ? '#d5b77f' : undefined,
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '15px'
              }}
              onMouseEnter={(e) => {
                if (car.is_available) {
                  e.currentTarget.style.backgroundColor = '#e0c38c';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.24)';
                }
              }}
              onMouseLeave={(e) => {
                if (car.is_available) {
                  e.currentTarget.style.backgroundColor = '#d5b77f';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <MessageCircle className="w-4 h-4" />
              {car.is_available ? "Réserver sur WhatsApp" : "RÉSERVÉ"}
            </a>
          </div>
        </div>
      </div>
    </motion.div>

    </>
  );
};

export const CarCardCompact = ({ car, index = 0 }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/vehicules/${car.id}`}>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-gold/30 hover:shadow-soft transition-all duration-300">
          {/* Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-accent flex-shrink-0">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gold uppercase tracking-wider">
              {car.brand || 'Brand'}
            </p>
            <h4 className="font-display font-semibold text-foreground truncate">
              {car.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {car.category}
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};
