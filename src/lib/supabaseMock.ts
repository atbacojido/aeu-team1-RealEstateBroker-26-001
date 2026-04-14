import { properties } from '../data/properties';
import { Property } from '../types';

class MockSupabaseQuery {
  private data: Property[];

  constructor(data: Property[]) {
    this.data = [...data];
  }

  select(columns: string = '*') {
    // In a real Supabase client, this would select columns. 
    // For our mock, we just return the query object to continue chaining.
    return this;
  }

  eq(column: keyof Property, value: any) {
    if (value === undefined || value === null || value === '') return this;
    this.data = this.data.filter(item => item[column] === value);
    return this;
  }

  ilike(column: keyof Property, pattern: string) {
    if (!pattern) return this;
    const search = pattern.replace(/%/g, '').toLowerCase();
    this.data = this.data.filter(item => {
      const val = item[column];
      if (typeof val === 'string') {
        return val.toLowerCase().includes(search);
      }
      return false;
    });
    return this;
  }

  gte(column: keyof Property, value: number) {
    if (value === undefined || value === null) return this;
    this.data = this.data.filter(item => (item[column] as number) >= value);
    return this;
  }

  lte(column: keyof Property, value: number) {
    if (value === undefined || value === null) return this;
    this.data = this.data.filter(item => (item[column] as number) <= value);
    return this;
  }

  in(column: keyof Property, values: any[]) {
    if (!values || values.length === 0) return this;
    this.data = this.data.filter(item => values.includes(item[column]));
    return this;
  }

  // Simulate the final execution
  async then(resolve: (res: { data: Property[] | null; error: any }) => void) {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 300));
    resolve({ data: this.data, error: null });
  }
}

export const supabase = {
  from(table: string) {
    if (table === 'properties') {
      return new MockSupabaseQuery(properties);
    }
    throw new Error(`Table ${table} not found in mock`);
  }
};
