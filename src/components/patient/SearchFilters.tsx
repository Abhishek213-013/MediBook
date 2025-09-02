"use client";

import { useState, useEffect } from "react";

interface SearchFiltersProps {
  specializations: string[];
  filters: {
    search: string;
    specialization: string;
  };
  onFilterChange: (filters: { search?: string; specialization?: string }) => void;
}

export default function SearchFilters({ 
  specializations, 
  filters, 
  onFilterChange 
}: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Update local search term when filters change from outside
  useEffect(() => {
    setSearchTerm(filters.search);
  }, [filters.search]);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchTerm });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ specialization: e.target.value });
  };

  const clearFilters = () => {
    setSearchTerm("");
    onFilterChange({ search: "", specialization: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search by Doctor Name
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Start typing to search doctors..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Specialization
          </label>
          <select
            id="specialization"
            value={filters.specialization}
            onChange={handleSpecializationChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 whitespace-nowrap"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}