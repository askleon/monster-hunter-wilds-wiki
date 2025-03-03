'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { FilterPanel, FilterOption } from '@/components/FilterPanel';
import { getAllArmorSets, ArmorSet } from '@/lib/armors';
import { Tooltip } from '@/components/Tooltip';
import Image from 'next/image';

export default function ArmorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allArmorSets = useMemo(() => getAllArmorSets().sort((a, b) => a.rarity - b.rarity), []);
  const [selectedTier, setSelectedTier] = useState<string>(searchParams.get('tier') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('types')?.split(',').filter(Boolean) || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(searchParams.get('skills')?.split(',').filter(Boolean) || []);

  const tierOptions = useMemo(() => [
    { value: '', label: 'All Tiers' },
    ...Array.from(new Set(allArmorSets.map(set => set.rarity)))
      .sort((a, b) => a - b)
      .map(tier => ({ value: tier.toString(), label: `Tier ${tier}` }))
  ], [allArmorSets]);

  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'];

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    allArmorSets.forEach(set => {
      set.pieces.forEach(piece => {
        if (piece.skills) {
          piece.skills.forEach(skill => {
            skillSet.add(skill.skillName);
          });
        }
      });
    });
    return Array.from(skillSet).sort();
  }, [allArmorSets]);

  const filters: FilterOption[] = [
    { type: 'dropdown', label: 'Filter by Tier', options: tierOptions, value: selectedTier },
    { type: 'checkbox', label: 'Filter by Piece Type', options: pieceTypes, value: selectedTypes },
    { type: 'checkbox', label: 'Filter by Skills', options: allSkills, value: selectedSkills },
  ];

  const updateUrlQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedTier) params.set('tier', selectedTier);
    if (selectedTypes.length) params.set('types', selectedTypes.join(','));
    if (selectedSkills.length) params.set('skills', selectedSkills.join(','));
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedTier, selectedTypes, selectedSkills, router]);

  useEffect(() => {
    updateUrlQuery();
  }, [updateUrlQuery]);

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    const filterHandlers = {
      'Filter by Tier': () => setSelectedTier(value as string),
      'Filter by Piece Type': () => setSelectedTypes(prev =>
        prev.includes(value as string)
          ? prev.filter(type => type !== value)
          : [...prev, value as string]
      ),
      'Filter by Skills': () => setSelectedSkills(prev =>
        prev.includes(value as string)
          ? prev.filter(skill => skill !== value)
          : [...prev, value as string]
      )
    };

    const handler = filterHandlers[filterType as keyof typeof filterHandlers];
    if (handler) {
      handler();
    }
  };

  const handleClearFilters = () => {
    setSelectedTier('');
    setSelectedTypes([]);
    setSelectedSkills([]);
  };

  const filteredArmorSets = allArmorSets.filter(set =>
    (selectedTier === '' || set.rarity.toString() === selectedTier) &&
    (selectedTypes.length === 0 || set.pieces.some(piece => selectedTypes.includes(piece.type))) &&
    (selectedSkills.length === 0 || set.pieces.some(piece =>
      piece.skills?.some(skill => selectedSkills.includes(skill.skillName))
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Armor Sets</h1>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <div className="space-y-6 max-w-3xl">
        {filteredArmorSets.map((set) => (
          <ArmorSetCard key={set.name} armorSet={set} />
        ))}
      </div>
    </div>
  );
}

function ArmorSetCard({ armorSet }: { armorSet: ArmorSet }) {
  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  const armorIcons = {
    Head: '/icons/head.svg',
    Chest: '/icons/chest.svg',
    Arms: '/icons/arms.svg',
    Waist: '/icons/waist.svg',
    Legs: '/icons/legs.svg',
  };

  const getArmorIcon = (type: string) => armorIcons[type as keyof typeof armorIcons] || undefined;

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{armorSet.name}</span>
          <span className="text-sm text-secondary">
            Tier {armorSet.rarity}
          </span>
        </div>
      }
      description={
        <div className="flex justify-between">
          {pieceTypes.map(type => {
            const piece = armorSet.pieces.find(p => p.type === type);
            return (
              <Tooltip
                key={type}
                content={
                  piece ? (
                    <div className="text-sm">
                      <p className="font-bold">{piece.name}</p>
                      <p>Skills:</p>
                      <ul className="list-disc list-inside">
                        {piece.skills?.map(skill => (
                          <li key={`${skill.skillName}-${skill.skillLevel}`}>
                            {skill.skillName} Lv. {skill.skillLevel}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm">No {type} piece in this set</p>
                  )
                }
              >
                <div className="text-center flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <Image src={getArmorIcon(type)!} alt={type} width={64} height={64} />
                    {!piece && (
                      <div className="absolute inset-0 flex items-center justify-center text-red-500">
                        <span className="text-3xl font-bold">✕</span>
                      </div>
                    )}
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      }
      link={`/armors/${armorSet.id}`}
      className="bg-secondary hover:shadow-lg transition-shadow w-full"
    />
  );
}
