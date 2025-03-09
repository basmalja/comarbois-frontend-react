import { Select, TextInput, Checkbox } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import '@mantine/dates/styles.css';

interface FiltersProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  onFilterChange: (field: string, value: any) => void;
}

const fieldNames = [
  'fournisseur',
  'categorie',
  'qualite',
  'depot',
  'sousCategorie',
  'longueur',
  'largeur',
  'epaisseur',
  'unite',
  'localImport',
  'date',
] as const;

type FieldName = (typeof fieldNames)[number];

export default function Filters({ filters, setFilters, onFilterChange }: FiltersProps) {
  const [activeFields, setActiveFields] = useState<Record<FieldName, boolean>>(
    Object.fromEntries(fieldNames.map((field) => [field, true])) as Record<FieldName, boolean>
  );

  const toggleField = (field: FieldName) => {
    setActiveFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {fieldNames.map((field) => (
        <div key={field} className="flex items-center gap-2">
          {field !== 'unite' && field !== 'localImport' && field !== 'date' && (
            <TextInput
              className="flex-grow"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={filters[field]}
              onChange={(e) => onFilterChange(field, e.target.value)}
              disabled={!activeFields[field]}
            />
          )}
          {field === 'unite' && (
            <Select
              className="flex-grow"
              placeholder="Unité"
              value={filters.unite}
              onChange={(value) => onFilterChange('unite', value)}
              data={['M²', 'M³']}
              disabled={!activeFields[field]}
            />
          )}
          {field === 'localImport' && (
            <Select
              className="flex-grow"
              placeholder="Local / Import"
              value={filters.localImport}
              onChange={(value) => onFilterChange('localImport', value)}
              data={['Local', 'Import']}
              disabled={!activeFields[field]}
            />
          )}
          {field === 'date' && (
            <DatePickerInput
              className="flex-grow"
              placeholder="Pick date"
              value={new Date(filters.date)}
              onChange={(value) => onFilterChange('date', value?.toISOString())}
              disabled={!activeFields[field]}
            />
          )}
          <Checkbox checked={activeFields[field]} onChange={() => toggleField(field)} />
        </div>
      ))}
    </div>
  );
}
