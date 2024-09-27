'use client'
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { WeaponNode } from '@/lib/weapons';
import styles from './WeaponTree.module.css';

interface WeaponTreeProps {
  baseWeapon: WeaponNode;
}

export function WeaponTree({ baseWeapon }: WeaponTreeProps) {
  const [activeTooltip, setActiveTooltip] = useState<WeaponNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (node: WeaponNode, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX + rect.width / 2
    });
    setActiveTooltip(node);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const renderTooltip = (node: WeaponNode) => (
    <div
      className={styles.tooltip}
      style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
    >
      <h3>{node.name}</h3>
      <p>{node.description}</p>
      <div>
        <strong>Stats:</strong>
        <ul>
          <li>Attack: {node.stats.attack}</li>
          <li>Affinity: {node.stats.affinity}%</li>
          {node.stats.element && (
            <li>{node.stats.element.type}: {node.stats.element.value}</li>
          )}
        </ul>
      </div>
      <div>
        <strong>Materials:</strong>
        <ul>
          {node.materials.map((material, index) => (
            <li key={index}>{material.name} x{material.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  const renderNode = (node: WeaponNode) => (
    <div key={node.id} className={`${styles.node} ${node.children.length > 0 ? styles.parentNode : ''}`}>
      <div
        className={styles.nodeContent}
        onMouseEnter={(e) => handleMouseEnter(node, e)}
        onMouseLeave={handleMouseLeave}
      >
        {node.name}
      </div>
      {node.children.length > 0 && (
        <div className={styles.children}>
          {node.children.map(renderNode)}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.weaponTreeContainer}>
      <h2 className={styles.title}>Weapon Upgrade Tree</h2>
      <div className={styles.weaponTree}>
        {renderNode(baseWeapon)}
      </div>
      {activeTooltip && createPortal(
        renderTooltip(activeTooltip),
        document.body
      )}
    </div>
  );
}
