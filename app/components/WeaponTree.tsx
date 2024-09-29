'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { WeaponNode, WeaponTree as WeaponTreeType } from '@/lib/weapons';
import styles from './WeaponTree.module.css';

interface WeaponTreeProps {
  weaponTree: WeaponTreeType;
}

export function WeaponTree({ weaponTree }: WeaponTreeProps) {
  const [activeTooltip, setActiveTooltip] = useState<WeaponNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [treeHeights, setTreeHeights] = useState<number[]>([]);
  const treeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setTreeRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    treeRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const calculateTreeDimensions = () => {
      const heights = treeRefs.current.map(ref => ref?.offsetHeight || 0);
      setTreeHeights(heights);

      // Calculate total width
      const totalWidth = treeRefs.current.reduce((width, ref) => {
        if (!ref) return width;
        return width + ref.scrollWidth;
      }, 0);

      // Set minimum width for the weapon tree
      const treeElement = document.querySelector(`.${styles.weaponTree}`) as HTMLElement | null;
      if (treeElement) {
        treeElement.style.minWidth = `${totalWidth}px`;
        const isScrollNeeded = treeElement.scrollWidth > treeElement.clientWidth;
        treeElement.style.overflowX = isScrollNeeded ? 'auto' : 'hidden';
      }
    };

    calculateTreeDimensions();
    window.addEventListener('resize', calculateTreeDimensions);
    return () => window.removeEventListener('resize', calculateTreeDimensions);
  }, [weaponTree]);

  const handleMouseEnter = (node: WeaponNode, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
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
          {node.stats.status && (
            <li>{node.stats.status.type}: {node.stats.status.value}</li>
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
    <div className={styles.node}>
      <div
        className={styles.nodeContent}
        onMouseEnter={(e) => handleMouseEnter(node, e)}
        onMouseLeave={handleMouseLeave}
      >
        {node.name}
      </div>
    </div>
  );

  const renderBranch = (node: WeaponNode): JSX.Element => {
    return (
      <div className={styles.branch}>
        <div className={styles.mainPath}>
          {renderNode(node)}
          {node.upgrade && (
            <>
              <div className={styles.connector} />
              {renderBranch(node.upgrade)}
            </>
          )}
        </div>
        {node.branches && (
          <div className={styles.subBranches}>
            {node.branches.map((branch, index) => (
              <div key={branch.id} className={styles.subBranch}>
                <div className={styles.branchConnector} />
                {renderBranch(branch)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!weaponTree) {
    return <div>No weapon tree data available.</div>;
  }

  return (
    <div className={styles.weaponTreeContainer}>
      <h2 className={styles.title}>{weaponTree.name} Upgrade Tree</h2>
      <div className={styles.weaponTree}>
        {weaponTree.baseWeapons.map((baseWeapon, index) => (
          <div
            key={baseWeapon.id}
            className={styles.treeRoot}
            ref={setTreeRef(index)}
            style={{ minHeight: `${treeHeights[index] || 0}px` }}
          >
            {renderBranch(baseWeapon)}
          </div>
        ))}
      </div>
      {activeTooltip && createPortal(
        renderTooltip(activeTooltip),
        document.body
      )}
    </div>
  );
}
