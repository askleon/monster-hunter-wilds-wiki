import React, { useState, useMemo } from 'react';
import { MonsterMaterial } from '@/lib/monsters';
import MaterialDropTable, { SortKey, SortOrder } from './MaterialDropTable';
import { FilterPanel, FilterOption } from '@/app/components/FilterPanel';
import styles from '@/app/components/SortableFilterableMaterialDropTable.module.css';

interface SortableFilterableMaterialDropTableProps {
  materials: MonsterMaterial[];
}

export default function SortableFilterableMaterialDropTable({ materials }: SortableFilterableMaterialDropTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [rankFilter, setRankFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string[]>([]);
  const [rarityFilter, setRarityFilter] = useState<string[]>([]);
  const [conditionFilter, setConditionFilter] = useState<string[]>([]);

  const nameOptions = useMemo(() => {
    const names = Array.from(new Set(materials.map(m => m.name)));
    return [{ value: '', label: 'All Names' }, ...names.map(name => ({ value: name, label: name }))];
  }, [materials]);

  const rankOptions = useMemo(() => {
    const ranks = Array.from(new Set(materials.flatMap(m => m.sources.map(s => s.rank))));
    return [{ value: 'All', label: 'All Ranks' }, ...ranks.map(rank => ({ value: rank, label: rank }))];
  }, [materials]);

  const methodOptions = useMemo(() => {
    const methods = Array.from(new Set(materials.flatMap(m => m.sources.map(s => s.method))));
    return methods;
  }, [materials]);

  const rarityOptions = useMemo(() => {
    const rarities = Array.from(new Set(materials.map(m => m.rarity))).sort((a, b) => a - b);
    return rarities.map(rarity => rarity.toString());
  }, [materials]);

  const conditionOptions = useMemo(() => {
    const conditions = Array.from(new Set(materials.flatMap(m => m.sources.map(s => s.condition || 'None'))));
    return conditions;
  }, [materials]);

  const filters: FilterOption[] = [
    { type: 'dropdown', label: 'Filter by Name', options: nameOptions, value: nameFilter },
    { type: 'dropdown', label: 'Filter by Rank', options: rankOptions, value: rankFilter },
    { type: 'checkbox', label: 'Filter by Method', options: methodOptions, value: methodFilter },
    { type: 'checkbox', label: 'Filter by Rarity', options: rarityOptions, value: rarityFilter },
    { type: 'checkbox', label: 'Filter by Condition', options: conditionOptions, value: conditionFilter },
  ];

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    switch (filterType) {
      case 'Filter by Name':
        setNameFilter(value as string);
        break;
      case 'Filter by Rank':
        setRankFilter(value as string);
        break;
      case 'Filter by Method':
        setMethodFilter(prev => {
          if (prev.includes(value as string)) {
            return prev.filter(method => method !== value);
          } else {
            return [...prev, value as string];
          }
        });
        break;
      case 'Filter by Rarity':
        setRarityFilter(prev => {
          if (prev.includes(value as string)) {
            return prev.filter(rarity => rarity !== value);
          } else {
            return [...prev, value as string];
          }
        });
        break;
      case 'Filter by Condition':
        setConditionFilter(prev => {
          if (prev.includes(value as string)) {
            return prev.filter(condition => condition !== value);
          } else {
            return [...prev, value as string];
          }
        });
        break;
    }
  };

  const handleClearFilters = () => {
    setNameFilter('');
    setRankFilter('All');
    setMethodFilter([]);
    setRarityFilter([]);
    setConditionFilter([]);
  };

  const sortedAndFilteredMaterials = useMemo(() => {
    let result = materials.flatMap(material =>
      material.sources.map(source => ({ ...material, ...source }))
    );

    if (nameFilter) {
      result = result.filter(item => item.name === nameFilter);
    }

    if (rankFilter !== 'All') {
      result = result.filter(item => item.rank === rankFilter);
    }

    if (methodFilter.length > 0) {
      result = result.filter(item => methodFilter.includes(item.method));
    }

    if (rarityFilter.length > 0) {
      result = result.filter(item => rarityFilter.includes(item.rarity.toString()));
    }

    if (conditionFilter.length > 0) {
      result = result.filter(item => conditionFilter.includes(item.condition || 'None'));
    }

    return result.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [materials, sortKey, sortOrder, nameFilter, rankFilter, methodFilter, rarityFilter, conditionFilter]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Material Drops</h2>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <MaterialDropTable
        materials={sortedAndFilteredMaterials}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </div>
  );
}
