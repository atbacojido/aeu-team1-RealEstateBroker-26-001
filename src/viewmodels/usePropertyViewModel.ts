import { useState, useEffect, useCallback, useMemo } from 'react';
import { Property, FilterState } from '../types';
import { supabase } from '../lib/supabaseMock';

const INITIAL_FILTERS: FilterState = {
  search: '',
  neighborhoods: [],
  minPrice: 0,
  maxPrice: 15000,
  is_pet_friendly: false,
  has_washer: false,
  has_parking: false,
  has_gym: false,
  has_pool: false,
};

export type SortOption = 'newest' | 'price-low' | 'price-high';

export function usePropertyViewModel() {
  // --- State ---
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Logic ---
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('properties').select('*');

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters.neighborhoods.length > 0) {
        query = query.in('neighborhood', filters.neighborhoods);
      }

      query = query.gte('price', filters.minPrice).lte('price', filters.maxPrice);

      // Dynamic scanning of boolean feature columns
      const booleanFeatures: (keyof FilterState)[] = ['is_pet_friendly', 'has_washer', 'has_parking', 'has_gym', 'has_pool'];
      booleanFeatures.forEach(feature => {
        if (filters[feature]) {
          query = query.eq(feature as keyof Property, true);
        }
      });

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        setError(supabaseError.message || 'Failed to fetch properties');
      } else {
        let result = data || [];
        
        // Apply sorting locally for the mock
        if (sortBy === 'price-low') {
          result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          result = [...result].sort((a, b) => b.price - a.price);
        }
        // 'newest' is default (mock data order)

        setProperties(result);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(debounce);
  }, [fetchProperties]);

  // --- Commands ---
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSortBy('newest');
  }, []);

  // --- Computed Properties ---
  const resultCount = useMemo(() => properties.length, [properties]);
  const hasFiltersActive = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS) || sortBy !== 'newest';
  }, [filters, sortBy]);

  return {
    // Data
    properties,
    filters,
    sortBy,
    loading,
    error,
    resultCount,
    hasFiltersActive,
    
    // Actions
    setFilters,
    setSortBy,
    updateFilters,
    resetFilters,
    refresh: fetchProperties
  };
}
