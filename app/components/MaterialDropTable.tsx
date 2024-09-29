import React from 'react';
import { MonsterMaterial } from '@/lib/monsters';
import styles from './MaterialDropTable.module.css';

export type SortKey = 'name' | 'rarity' | 'rank' | 'method' | 'rate' | 'quantity' | 'condition';
export type SortOrder = 'asc' | 'desc';

interface MaterialDropTableProps {
  materials: (MonsterMaterial & { rank: string; method: string; rate: number; quantity?: number; condition?: string })[];
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
            <th onClick={() => handleSort('name')}>Material <SortIndicator column="name" /></th>
            <th onClick={() => handleSort('rarity')}>Rarity <SortIndicator column="rarity" /></th>
            <th onClick={() => handleSort('rank')}>Rank <SortIndicator column="rank" /></th>
            <th onClick={() => handleSort('method')}>Method <SortIndicator column="method" /></th>
            <th onClick={() => handleSort('rate')}>Rate <SortIndicator column="rate" /></th>
            <th onClick={() => handleSort('quantity')}>Quantity <SortIndicator column="quantity" /></th>
            <th onClick={() => handleSort('condition')}>Condition <SortIndicator column="condition" /></th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={`${material.id}-${index}`}>
              <td>{material.name}</td>
              <td>{material.rarity}</td>
              <td>{material.rank}</td>
              <td>{material.method}</td>
              <td>{material.rate}%</td>
              <td>{material.quantity || '-'}</td>
              <td>{material.condition || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
