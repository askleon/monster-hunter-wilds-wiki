import React from 'react';
import { MonsterMaterial } from '@/lib/monsters';
import styles from './MaterialDropTable.module.css';

export type SortKey = 'Material' | 'Rarity' | 'Rank' | 'Method' | 'Rate' | 'Quantity' | 'Condition';
export type SortOrder = 'asc' | 'desc';

interface MaterialDropTableProps {
  materials: (MonsterMaterial)[];
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
            <th onClick={() => handleSort('Rank')}>Rank <SortIndicator column="Rank" /></th>
            <th onClick={() => handleSort('Material')}>Material <SortIndicator column="Material" /></th>
            <th onClick={() => handleSort('Rarity')}>Rarity <SortIndicator column="Rarity" /></th>
            <th onClick={() => handleSort('Method')}>Method <SortIndicator column="Method" /></th>
            <th onClick={() => handleSort('Condition')}>Condition <SortIndicator column="Condition" /></th>
            <th onClick={() => handleSort('Rate')}>Rate <SortIndicator column="Rate" /></th>
            <th onClick={() => handleSort('Quantity')}>Quantity <SortIndicator column="Quantity" /></th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={`${material.monster}-${index}`}>
              <td>{material.rank}</td>
              <td>{material.material}</td>
              <td>{material.rarity}</td>
              <td>{material.method}</td>
              <td>{material.condition || '-'}</td>
              <td>{material.rate}%</td>
              <td>{material.quantity || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
