/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  usePropertyViewModel,
  SortOption,
} from "./viewmodels/usePropertyViewModel";
import { FilterSidebar } from "./components/FilterSidebar";
import { PropertyCard } from "./components/PropertyCard";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Filter, Search, House, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const {
    properties,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    loading,
    resultCount,
    resetFilters,
  } = usePropertyViewModel();

  const handleNavClick = (item: string) => {
    toast.info(`Navigating to ${item}`, {
      description: "This feature is currently under development for the demo.",
    });
  };

  const handleListProperty = () => {
    toast.success("Property listing form opened", {
      description: "Our team will review your submission shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
              <House className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter uppercase leading-none">
                LuxeLoft
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1 font-medium">
                Premier Real Estate
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            {["Rentals", "Sales", "Developments", "About"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden rounded-none border-gray-200"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 w-80">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onReset={resetFilters}
                />
              </SheetContent>
            </Sheet>
            <Button
              onClick={handleListProperty}
              className="rounded-none bg-black text-white hover:bg-gray-800 px-6 hidden sm:flex"
            >
              List Property
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 mb-32 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                <span>Directory</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{resultCount} Results Found</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                <span className="font-serif italic">Available Residences</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs font-bold uppercase tracking-widest border-none focus:ring-0 cursor-pointer outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-gray-300" />
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                Updating Catalog...
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {properties.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-40 text-center"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-medium mb-2">
                    No properties match your criteria
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Try adjusting your filters or searching for a different
                    neighborhood to find your dream loft.
                  </p>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="rounded-none border-black hover:bg-black hover:text-white transition-all"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
                <House className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tighter uppercase">
                LuxeLoft
              </h1>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              The premier destination for luxury urban living. We curate the
              finest lofts, apartments, and penthouses for the discerning modern
              professional.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Downtown Lofts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Heights Penthouses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Harbor Flats
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Arts District Studios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>info@luxeloft.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Skyline Blvd, Suite 500</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <p>© 2024 LuxeLoft Directory. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
