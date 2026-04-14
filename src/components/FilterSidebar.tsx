import { FilterState } from '../types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onReset: () => void;
}

const NEIGHBORHOODS = ['Downtown', 'Heights', 'Old Town', 'Westside', 'Arts District', 'Harbor'];

export function FilterSidebar({ filters, setFilters, onReset }: FilterSidebarProps) {
  const handleNeighborhoodToggle = (neighborhood: string) => {
    const newNeighborhoods = filters.neighborhoods.includes(neighborhood)
      ? filters.neighborhoods.filter((n) => n !== neighborhood)
      : [...filters.neighborhoods, neighborhood];
    setFilters({ ...filters, neighborhoods: newNeighborhoods });
  };

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-xl border-r border-gray-100">
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-semibold tracking-tight uppercase">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-muted-foreground hover:text-black">
          Reset All
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Search */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Keywords, lofts..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 bg-white border-gray-100 focus:ring-black rounded-none h-11"
              />
            </div>
          </div>

          <Separator className="bg-gray-100" />

          {/* Neighborhoods */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Neighborhoods</Label>
            <div className="grid grid-cols-1 gap-3">
              {NEIGHBORHOODS.map((n) => (
                <div key={n} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNeighborhoodToggle(n)}>
                  <Checkbox
                    id={n}
                    checked={filters.neighborhoods.includes(n)}
                    onCheckedChange={() => handleNeighborhoodToggle(n)}
                    className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <Label
                    htmlFor={n}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-black transition-colors"
                  >
                    {n}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-100" />

          {/* Price Range */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price Range</Label>
              <span className="text-xs font-mono font-medium">${filters.minPrice} - ${filters.maxPrice}</span>
            </div>
            <Slider
              defaultValue={[filters.minPrice, filters.maxPrice]}
              max={15000}
              step={500}
              onValueChange={(value) => {
                const [min, max] = value as number[];
                setFilters({ ...filters, minPrice: min, maxPrice: max });
              }}
              className="py-4"
            />
          </div>

          <Separator className="bg-gray-100" />

          {/* Amenities */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Amenities</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setFilters({ ...filters, is_pet_friendly: !filters.is_pet_friendly })}>
                <Checkbox
                  id="pet-friendly"
                  checked={filters.is_pet_friendly}
                  onCheckedChange={(checked) => setFilters({ ...filters, is_pet_friendly: !!checked })}
                  className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="pet-friendly" className="text-sm font-medium cursor-pointer group-hover:text-black">Pet Friendly</Label>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setFilters({ ...filters, has_washer: !filters.has_washer })}>
                <Checkbox
                  id="washer"
                  checked={filters.has_washer}
                  onCheckedChange={(checked) => setFilters({ ...filters, has_washer: !!checked })}
                  className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="washer" className="text-sm font-medium cursor-pointer group-hover:text-black">In-Unit Washer</Label>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setFilters({ ...filters, has_parking: !filters.has_parking })}>
                <Checkbox
                  id="parking"
                  checked={filters.has_parking}
                  onCheckedChange={(checked) => setFilters({ ...filters, has_parking: !!checked })}
                  className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="parking" className="text-sm font-medium cursor-pointer group-hover:text-black">Parking Included</Label>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setFilters({ ...filters, has_gym: !filters.has_gym })}>
                <Checkbox
                  id="gym"
                  checked={filters.has_gym}
                  onCheckedChange={(checked) => setFilters({ ...filters, has_gym: !!checked })}
                  className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="gym" className="text-sm font-medium cursor-pointer group-hover:text-black">Fitness Center</Label>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setFilters({ ...filters, has_pool: !filters.has_pool })}>
                <Checkbox
                  id="pool"
                  checked={filters.has_pool}
                  onCheckedChange={(checked) => setFilters({ ...filters, has_pool: !!checked })}
                  className="rounded-none border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label htmlFor="pool" className="text-sm font-medium cursor-pointer group-hover:text-black">Swimming Pool</Label>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
