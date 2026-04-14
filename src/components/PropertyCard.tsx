import React from 'react';
import { Property } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bed, Bath, Square, MapPin, Check, Dumbbell, Waves, Car, Wind, Dog } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface PropertyCardProps {
  property: Property;
  key?: string;
}

export function PropertyCard({ property }: PropertyCardProps): React.JSX.Element {
  const handleViewDetails = () => {
    toast.info(`Opening ${property.title}`, {
      duration: 1500,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={property.image_url}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-black/60 backdrop-blur-md text-white border-none px-3 py-1">
              {property.type}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-white text-black font-bold text-lg px-4 py-2 shadow-lg">
              ${property.price.toLocaleString()}/mo
            </Badge>
          </div>
        </div>
        
        <CardHeader className="p-5 pb-2">
          <div className="flex items-center gap-1 text-muted-foreground text-xs uppercase tracking-widest mb-1">
            <MapPin className="w-3 h-3" />
            {property.neighborhood}
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </CardHeader>
        
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {property.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-b border-gray-100 py-3">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
              <Check className="w-3 h-3 text-green-500" />
              {amenity}
            </div>
          ))}
          
          <Dialog>
            <DialogTrigger render={
              <Button 
                variant="ghost" 
                onClick={handleViewDetails}
                className="w-full mt-4 group-hover:bg-black group-hover:text-white transition-all duration-300 rounded-none border-t border-gray-100"
              >
                View Details
              </Button>
            } />
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-none border-none">
              <div className="relative aspect-video">
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black text-white border-none px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                    {property.type}
                  </Badge>
                </div>
              </div>
              
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    <MapPin className="w-3 h-3" />
                    {property.neighborhood}
                  </div>
                  <DialogTitle className="text-3xl font-light tracking-tight mb-2">
                    {property.title}
                  </DialogTitle>
                  <DialogDescription className="text-2xl font-bold text-black">
                    ${property.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100 mb-6">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Bedrooms</p>
                    <p className="text-lg font-medium">{property.bedrooms}</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Bathrooms</p>
                    <p className="text-lg font-medium">{property.bathrooms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Square Feet</p>
                    <p className="text-lg font-medium">{property.sqft}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Description</h4>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {property.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Key Features & Amenities</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div className="flex items-center gap-3 text-sm">
                        <Dog className={cn("w-4 h-4", property.is_pet_friendly ? "text-black" : "text-gray-200")} />
                        <span className={property.is_pet_friendly ? "text-black" : "text-gray-400"}>Pet Friendly</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Wind className={cn("w-4 h-4", property.has_washer ? "text-black" : "text-gray-200")} />
                        <span className={property.has_washer ? "text-black" : "text-gray-400"}>In-Unit Washer</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Car className={cn("w-4 h-4", property.has_parking ? "text-black" : "text-gray-200")} />
                        <span className={property.has_parking ? "text-black" : "text-gray-400"}>Parking Included</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Dumbbell className={cn("w-4 h-4", property.has_gym ? "text-black" : "text-gray-200")} />
                        <span className={property.has_gym ? "text-black" : "text-gray-400"}>Fitness Center</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Waves className={cn("w-4 h-4", property.has_pool ? "text-black" : "text-gray-200")} />
                        <span className={property.has_pool ? "text-black" : "text-gray-400"}>Swimming Pool</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <Button className="flex-1 rounded-none bg-black text-white hover:bg-gray-800 h-12 text-xs font-bold uppercase tracking-widest">
                    Schedule a Tour
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-none border-gray-200 h-12 text-xs font-bold uppercase tracking-widest">
                    Contact Agent
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
