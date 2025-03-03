'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllWeaponTrees, WeaponNode, getWeaponById } from '@/lib/weapons';
import { ArmorPiece, getArmorPieceById, getAllArmors } from '@/lib/armors';
import { Card } from '@/components/Card';
import { useToast } from '@/components/Toast';
import { StatSummary } from '@/components/StatSummary';
import { SkillSummary } from '@/components/SkillSummary';
import { SearchableDropdown } from '@/components/SearchableDropdown';

export interface Loadout {
  name: string;
  weapon: WeaponNode | null;
  head: ArmorPiece | null;
  chest: ArmorPiece | null;
  arms: ArmorPiece | null;
  waist: ArmorPiece | null;
  legs: ArmorPiece | null;
}

interface LoadoutBuilderProps {
  loadoutName?: string;
}

export default function LoadoutBuilder({ }: LoadoutBuilderProps) {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [loadout, setLoadout] = useState<Loadout>({
    name: '',
    weapon: null,
    head: null,
    chest: null,
    arms: null,
    waist: null,
    legs: null,
  });
  const [shareUrl, setShareUrl] = useState('');
  const shareUrlInputRef = useRef<HTMLInputElement>(null);

  const weaponTrees = getAllWeaponTrees();

  const allWeapons = useMemo(() => {
    return weaponTrees.flatMap(tree => tree.weapons);
  }, [weaponTrees]);

  const armorPieces = useMemo(() => getAllArmors(), []);

  useEffect(() => {
    const initializeLoadout = () => {
      const initialLoadout: Loadout = {
        name: searchParams.get('name') || '',
        weapon: searchParams.get('weapon') ? getWeaponById(searchParams.get('weapon')!) || null : null,
        head: searchParams.get('head') ? getArmorPieceById(searchParams.get('head')!) || null : null,
        chest: searchParams.get('chest') ? getArmorPieceById(searchParams.get('chest')!) || null : null,
        arms: searchParams.get('arms') ? getArmorPieceById(searchParams.get('arms')!) || null : null,
        waist: searchParams.get('waist') ? getArmorPieceById(searchParams.get('waist')!) || null : null,
        legs: searchParams.get('legs') ? getArmorPieceById(searchParams.get('legs')!) || null : null,
      };

      setLoadout(initialLoadout);
      setShareUrl(generateShareUrl(initialLoadout));
    };

    initializeLoadout();
  }, [searchParams]);


  const generateShareUrl = (newLoadout: Loadout) => {
    const params = new URLSearchParams();
    params.set('name', newLoadout.name);
    if (newLoadout.weapon) params.set('weapon', newLoadout.weapon.id);
    if (newLoadout.head) params.set('head', newLoadout.head.id);
    if (newLoadout.chest) params.set('chest', newLoadout.chest.id);
    if (newLoadout.arms) params.set('arms', newLoadout.arms.id);
    if (newLoadout.waist) params.set('waist', newLoadout.waist.id);
    if (newLoadout.legs) params.set('legs', newLoadout.legs.id);
    return `${window.location.origin}/loadout/edit?${params.toString()}`;
  };

  const handleLoadoutChange = (newLoadout: Loadout) => {
    setLoadout(newLoadout);
    setShareUrl(generateShareUrl(newLoadout));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    handleLoadoutChange({ ...loadout, name: newName });
  };

  const handleWeaponSelect = (weaponId: string) => {
    const selectedWeapon = getWeaponById(weaponId);
    handleLoadoutChange({ ...loadout, weapon: selectedWeapon });
  };

  const handleArmorSelect = (pieceType: keyof Omit<Loadout, 'weapon' | 'name'>, armorId: string) => {
    const selectedArmor = armorPieces.find(piece => piece.id === armorId);
    handleLoadoutChange({ ...loadout, [pieceType]: selectedArmor || null });
  };

  const handleSaveLoadout = () => {
    if (!loadout.name) {
      showToast('Please enter a name for your loadout', 'error');
      return;
    }

    const storedLoadouts = JSON.parse(localStorage.getItem('loadouts') || '{}');
    storedLoadouts[loadout.name] = loadout;
    localStorage.setItem('loadouts', JSON.stringify(storedLoadouts));

    setShareUrl(generateShareUrl(loadout));
    showToast('Loadout saved successfully', 'success');
  };

  const handleCopyShareUrl = () => {
    if (shareUrlInputRef.current) {
      shareUrlInputRef.current.select();
      document.execCommand('copy');
      showToast('Share URL copied to clipboard', 'success');
    }
  };

  const renderArmorSelect = (pieceType: keyof Omit<Loadout, 'weapon' | 'name'>) => {
    const options = armorPieces
      .filter(piece => piece.type.toLowerCase() === pieceType)
      .map(piece => ({
        value: piece.id,
        label: `${piece.name} (${piece.set})`
      }));

    return (
      <SearchableDropdown
        options={[{ value: '', label: `Select ${pieceType}` }, ...options]}
        value={loadout[pieceType]?.id || ''}
        onChange={(value) => handleArmorSelect(pieceType, value)}
        placeholder={`Select ${pieceType}`}
        className="w-full"
      />
    );
  };

  const renderSummaryItem = (key: string, value: string | WeaponNode | ArmorPiece | null) => {
    let displayValue: string = 'Not selected';
    if (value) {
      if (typeof value === 'string') {
        displayValue = value;
      } else if ('name' in value) {
        displayValue = value.name;
      }
    }
    return (
      <div key={key} className="flex justify-between">
        <span className="font-bold text-secondary">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
        <span className="text-primary">{displayValue}</span>
      </div>
    );
  };

  const renderWeaponSelect = () => {
    const options = allWeapons.map(weapon => ({
      value: weapon.id,
      label: `${weapon.name} (${weapon.treeName})`
    }));

    return (
      <SearchableDropdown
        options={[{ value: '', label: 'Select Weapon' }, ...options]}
        value={loadout.weapon?.id || ''}
        onChange={handleWeaponSelect}
        placeholder="Select Weapon"
        className="w-full"
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Hunter Loadout Builder</h1>

      <input
        type="text"
        value={loadout.name}
        onChange={handleNameChange}
        placeholder="Enter loadout name"
        className="w-full p-2 border border-color rounded bg-primary text-primary"
      />

      <Card
        title="Weapon"
        className="bg-secondary"
        description={
          <div className="w-full">
            {renderWeaponSelect()}
          </div>
        }
      />

      <Card
        title="Armor"
        className="bg-secondary"
        description={
          <div className="space-y-4 w-full">
            {renderArmorSelect('head')}
            {renderArmorSelect('chest')}
            {renderArmorSelect('arms')}
            {renderArmorSelect('waist')}
            {renderArmorSelect('legs')}
          </div>
        }
      />

      <Card
        title="Loadout Summary"
        className="bg-secondary"
        description={
          <div className="space-y-4">
            <div className="space-y-2">
              {renderSummaryItem('name', loadout.name)}
              {renderSummaryItem('weapon', loadout.weapon)}
              {renderSummaryItem('head', loadout.head)}
              {renderSummaryItem('chest', loadout.chest)}
              {renderSummaryItem('arms', loadout.arms)}
              {renderSummaryItem('waist', loadout.waist)}
              {renderSummaryItem('legs', loadout.legs)}
            </div>
            <StatSummary loadout={loadout} />
            <SkillSummary loadout={loadout} />
          </div>
        }
      />

      <button
        onClick={handleSaveLoadout}
        className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
      >
        Save Loadout
      </button>

      {shareUrl && (
        <div className="flex items-center space-x-2">
          <input
            ref={shareUrlInputRef}
            type="text"
            value={shareUrl}
            readOnly
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCopyShareUrl}
            className="bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
