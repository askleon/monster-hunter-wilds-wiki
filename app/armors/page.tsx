'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/app/components/Card';
import { FilterPanel, FilterOption } from '@/app/components/FilterPanel';
import { getAllArmorSets, ArmorSet } from '@/lib/armors';
import { Tooltip } from '@/app/components/Tooltip';

export default function ArmorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allArmorSets = useMemo(() => getAllArmorSets().sort((a, b) => a.tier - b.tier), []);
  const [selectedTier, setSelectedTier] = useState<string>(searchParams.get('tier') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('types')?.split(',').filter(Boolean) || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(searchParams.get('skills')?.split(',').filter(Boolean) || []);

  const tierOptions = useMemo(() => [
    { value: '', label: 'All Tiers' },
    ...Array.from(new Set(allArmorSets.map(set => set.tier)))
      .sort((a, b) => a - b)
      .map(tier => ({ value: tier.toString(), label: `Tier ${tier}` }))
  ], [allArmorSets]);

  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'];

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    allArmorSets.forEach(set => {
      set.pieces.forEach(piece => {
        piece.skills.forEach(skill => skillSet.add(skill.name));
      });
    });
    return Array.from(skillSet).sort();
  }, [allArmorSets]);

  const filters: FilterOption[] = [
    { type: 'dropdown', label: 'Filter by Tier', options: tierOptions, value: selectedTier },
    { type: 'checkbox', label: 'Filter by Piece Type', options: pieceTypes, value: selectedTypes },
    { type: 'checkbox', label: 'Filter by Skills', options: allSkills, value: selectedSkills },
  ];

  const updateUrlQuery = () => {
    const params = new URLSearchParams();
    if (selectedTier) params.set('tier', selectedTier);
    if (selectedTypes.length) params.set('types', selectedTypes.join(','));
    if (selectedSkills.length) params.set('skills', selectedSkills.join(','));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateUrlQuery();
  }, [selectedTier, selectedTypes, selectedSkills]);

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    switch (filterType) {
      case 'Filter by Tier':
        setSelectedTier(value as string);
        break;
      case 'Filter by Piece Type':
        setSelectedTypes(prev => {
          if (prev.includes(value as string)) {
            return prev.filter(type => type !== value);
          } else {
            return [...prev, value as string];
          }
        });
        break;
      case 'Filter by Skills':
        setSelectedSkills(prev => {
          if (prev.includes(value as string)) {
            return prev.filter(skill => skill !== value);
          } else {
            return [...prev, value as string];
          }
        });
        break;
    }
  };

  const handleClearFilters = () => {
    setSelectedTier('');
    setSelectedTypes([]);
    setSelectedSkills([]);
  };

  const filteredArmorSets = allArmorSets.filter(set =>
    (selectedTier === '' || set.tier.toString() === selectedTier) &&
    (selectedTypes.length === 0 || set.pieces.some(piece => selectedTypes.includes(piece.type))) &&
    (selectedSkills.length === 0 || set.pieces.some(piece =>
      piece.skills.some(skill => selectedSkills.includes(skill.name))
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Armor Sets</h1>
      <p className="text-lg text-secondary mb-8">
        Explore the various armor sets available in Monster Hunter Wilds!
      </p>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <div className="space-y-6">
        {filteredArmorSets.map((set) => (
          <ArmorSetCard key={set.id} armorSet={set} />
        ))}
      </div>
    </div>
  );
}

function ArmorSetCard({ armorSet }: { armorSet: ArmorSet }) {
  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{armorSet.name}</span>
          <span className="text-sm text-secondary">Tier {armorSet.tier}</span>
        </div>
      }
      subtitle={`${armorSet.pieces.length} piece${armorSet.pieces.length > 1 ? 's' : ''}`}
      description={
        <div className="space-y-2">
          <div className="flex justify-between">
            {pieceTypes.map(type => {
              const piece = armorSet.pieces.find(p => p.type === type);
              return (
                <Tooltip
                  key={type}
                  content={
                    piece ? (
                      <div>
                        <p className="font-bold">{piece.name}</p>
                        <p>Skills:</p>
                        <ul className="list-disc list-inside">
                          {piece.skills.map(skill => (
                            <li key={skill.name}>{skill.name} Lv. {skill.level}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>No {type} piece in this set</p>
                    )
                  }
                >
                  <div className="text-center w-16 flex flex-col items-center">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <span className={`font-semibold ${!piece ? 'opacity-30' : ''}`}>{type[0]}</span>
                      {!piece && (
                        <span className="absolute inset-0 flex items-center justify-center text-red-500 font-bold">
                          X
                        </span>
                      )}
                    </div>
                    {piece && <span className="text-xs mt-1">{piece.defense}</span>}
                  </div>
                </Tooltip>
              );
            })}
          </div>
          {armorSet.bonus && (
            <p className="text-sm text-secondary">
              Set Bonus: {armorSet.bonus.name} ({armorSet.bonus.requiredPieces} pieces)
            </p>
          )}
        </div>
      }
      link={`/armors/${armorSet.id}`}
      className="bg-secondary hover:shadow-lg transition-shadow w-full"
    />
  );
}
