import React from 'react';
import { MonsterMaterial } from '@/lib/monsters';
import styles from './MaterialDropTable.module.css';

export type SortKey = 'Material' | 'Rarity' | 'Rank' | 'Method' | 'Rate' | 'Quantity' | 'Condition';
export type SortOrder = 'asc' | 'desc';

interface MaterialDropTableProps {
  materials: (MonsterMaterial & { rank: string; method: string; rate: string; quantity?: number; condition?: string })[];
  onSort: (key: SortKey) => void;
  sortKey: SortKey;
  sortOrder: SortOrder;
}

export default function MaterialDropTable({ materials, onSort, sortKey, sortOrder }: MaterialDropTableProps) {
  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>;
  };

  const handleSort = (column: SortKey) => {
    onSort(column);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.materialTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('Material')}>Material <SortIndicator column="Material" /></th>
            <th onClick={() => handleSort('Rarity')}>Rarity <SortIndicator column="Rarity" /></th>
            <th onClick={() => handleSort('Rank')}>Rank <SortIndicator column="Rank" /></th>
            <th onClick={() => handleSort('Method')}>Method <SortIndicator column="Method" /></th>
            <th onClick={() => handleSort('Rate')}>Rate <SortIndicator column="Rate" /></th>
            <th onClick={() => handleSort('Quantity')}>Quantity <SortIndicator column="Quantity" /></th>
            <th onClick={() => handleSort('Condition')}>Condition <SortIndicator column="Condition" /></th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={`${material.Monster}-${index}`}>
              <td>{material.Material}</td>
              <td>{material.Rarity}</td>
              <td>{material.Rank}</td>
              <td>{material.Method}</td>
              <td>{material.Rate}</td>
              <td>{material.Quantity || '-'}</td>
              <td>{material.Condition || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
