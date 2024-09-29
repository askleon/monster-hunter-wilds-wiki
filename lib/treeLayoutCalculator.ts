import { WeaponTree, WeaponNode } from './weapons';

interface TreeDimensions {
  height: number;
  depth: number;
  maxNodeWidth: number;
}

export function calculateNodeDimensions(node: WeaponNode): TreeDimensions {
  const nodeHeight = 40; // Height of a single node
  const verticalGap = 20; // Gap between vertical nodes
  const connectorWidth = 20; // Match this with the value in the component

  let height = nodeHeight;
  let depth = 0;
  let maxNodeWidth = node.name.length * 10 + connectorWidth; // Add connector width to node width

  if (node.upgrade) {
    const upgradeDimensions = calculateNodeDimensions(node.upgrade);
    height += upgradeDimensions.height + verticalGap;
    depth = upgradeDimensions.depth + 1;
    maxNodeWidth = Math.max(maxNodeWidth, upgradeDimensions.maxNodeWidth);
  }

  if (node.branches && node.branches.length > 0) {
    const branchDimensions = node.branches.map(calculateNodeDimensions);
    const maxBranchHeight = Math.max(...branchDimensions.map(d => d.height));
    height = Math.max(height, nodeHeight + verticalGap + maxBranchHeight);
    depth = Math.max(depth, Math.max(...branchDimensions.map(d => d.depth)) + 1);
    maxNodeWidth = Math.max(maxNodeWidth, ...branchDimensions.map(d => d.maxNodeWidth));
  }

  return { height, depth, maxNodeWidth };
}

export function calculateTreeDimensions(tree: WeaponTree): TreeDimensions {
  const dimensions = tree.baseWeapons.map(calculateNodeDimensions);
  return {
    height: dimensions.reduce((sum, d) => sum + d.height, 0),
    depth: Math.max(...dimensions.map(d => d.depth)),
    maxNodeWidth: Math.max(...dimensions.map(d => d.maxNodeWidth))
  };
}
