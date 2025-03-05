import { Select, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import '@mantine/dates/styles.css';

export default function Filters({ filters, setFilters, onFilterChange }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <TextInput
        placeholder="Fournisseur"
        value={filters.fournisseur}
        onChange={(e) => onFilterChange('fournisseur', e.target.value)}
      />
      <TextInput
        placeholder="Catégorie"
        value={filters.categorie}
        onChange={(e) => onFilterChange('categorie', e.target.value)}
      />
      <TextInput
        placeholder="Qualité"
        value={filters.qualite}
        onChange={(e) => onFilterChange('qualite', e.target.value)}
      />
      <TextInput
        placeholder="Dépôt"
        value={filters.depot}
        onChange={(e) => onFilterChange('depot', e.target.value)}
      />
      <TextInput
        placeholder="Sous-Catégorie"
        value={filters.sousCategorie}
        onChange={(e) => onFilterChange('sousCategorie', e.target.value)}
      />
      <TextInput
        placeholder="Longueur"
        value={filters.longueur}
        onChange={(e) => onFilterChange('longueur', e.target.value)}
      />
      <TextInput
        placeholder="Largeur"
        value={filters.largeur}
        onChange={(e) => onFilterChange('largeur', e.target.value)}
      />
      <TextInput
        placeholder="Épaisseur"
        value={filters.epaisseur}
        onChange={(e) => onFilterChange('epaisseur', e.target.value)}
      />
      <Select
        placeholder="Unité"
        value={filters.unite}
        onChange={(value) => onFilterChange('unite', value)}
        data={['M²', 'M³']}
      />
      <Select
        placeholder="Local / Import"
        value={filters.localImport}
        onChange={(value) => onFilterChange('localImport', value)}
        data={['Local', 'Import']}
      />
      <DatePickerInput
        placeholder="Pick date"
        value={new Date(filters.date)}
        onChange={(value) => onFilterChange('date', value?.toISOString())}
      />
    </div>
  );
}
