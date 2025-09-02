//src/app/patient/SearchFilters.tsx
interface SearchFiltersProps {
  specializations?: string[]; // optional
  filters: { search?: string; specialization?: string };
  onFilterChange: (filters: Partial<{ search: string; specialization: string }>) => void;
}

export default function SearchFilters({
  specializations = [], // fallback to empty array
  filters,
  onFilterChange,
}: SearchFiltersProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4">
      <input
        type="text"
        placeholder="Search doctors..."
        value={filters.search || ""}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        className="mb-2 md:mb-0 px-4 py-2 border rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={filters.specialization || ""}
        onChange={(e) => onFilterChange({ specialization: e.target.value })}
        className="px-4 py-2 border rounded-md w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Specializations</option>
        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>
  );
}
