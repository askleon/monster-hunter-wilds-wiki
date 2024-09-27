import React, { useEffect, useRef, useState } from 'react';
import { ArmorPiece } from '@/lib/armors';

interface ArmorPieceTooltipProps {
  piece: ArmorPiece;
}

export function ArmorPieceTooltip({ piece }: ArmorPieceTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'bottom' | 'right' | 'left'>('bottom');

  useEffect(() => {
    const updatePosition = () => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        const parentRect = tooltipRef.current.offsetParent?.getBoundingClientRect();

        if (parentRect) {
          if (rect.right > window.innerWidth - 20) {
            setPosition('left');
          } else if (rect.left < 20) {
            setPosition('right');
          } else {
            setPosition('bottom');
          }
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const tooltipClass =
    position === 'bottom' ? 'top-full left-1/2 transform -translate-x-1/2 mt-2' :
    position === 'right' ? 'top-0 left-full ml-2' :
    'top-0 right-full mr-2';

  return (
    <div
      ref={tooltipRef}
      className={`absolute z-10 ${tooltipClass} bg-gray-800 text-white p-4 rounded-lg shadow-lg w-[500px]`}
    >
      <h3 className="text-lg font-semibold mb-2">{piece.name}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Defense: {piece.defense}</p>
          <p>Rarity: {piece.rarity}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Resistances:</h4>
            <ul className="grid grid-cols-2 gap-2">
              <li>Fire: {piece.resistances.fire}</li>
              <li>Water: {piece.resistances.water}</li>
              <li>Thunder: {piece.resistances.thunder}</li>
              <li>Ice: {piece.resistances.ice}</li>
              <li>Dragon: {piece.resistances.dragon}</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="mt-2">
            <h4 className="font-semibold">Skills:</h4>
            <ul>
              {piece.skills.map((skill, index) => (
                <li key={index}>{skill.name} Lv. {skill.level}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold">Materials:</h4>
            <ul>
              {piece.materials.map((material, index) => (
                <li key={index}>{material.name} x{material.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
