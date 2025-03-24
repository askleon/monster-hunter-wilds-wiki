import { Monster } from "@/lib/monsters";
import { SearchResult, HelpEntry } from "@/lib/search";
import { Weapon } from "@/lib/weapons";
import { Skill } from "@/lib/skills";
import { MapViewItem } from "@/lib/maps";
import { ArmorSet } from "@/lib/armors";
import { Decoration } from "@/lib/decorations";

export function ResultItem({ item }: { item: SearchResult }) {
  const { type, data, url } = item;

  switch (type) {
    case 'monster': {
      const monster = data as Monster;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{monster.name}</h3>
            <p className="text-sm">{monster.type} | {monster.habitats.join(', ')}</p>
          </a>
        </li>
      );
    }

    case 'weapon': {
      const weapon = data as Weapon;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{weapon.name}</h3>
            <p className="text-sm">{weapon.type} | Rarity: {weapon.rarity}</p>
          </a>
        </li>
      );
    }

    case 'skill': {
      const skill = data as Skill;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{skill.name}</h3>
            <p className="text-sm">{skill.description}</p>
          </a>
        </li>
      );
    }

    case 'map': {
      const map = data as MapViewItem;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{map.name}</h3>
            <p className="text-sm">{map.description}</p>
          </a>
        </li>
      );
    }

    case 'armor': {
      const armor = data as ArmorSet;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{armor.name}</h3>
            <p className="text-sm">Rarity: {armor.rarity} | Defense: {armor.rank}</p>
          </a>
        </li>
      );
    }

    case 'decoration': {
      const decoration = data as Decoration;
      return (
        <li className="p-2">
          <a href={url} className="block">
            <h3 className="text-lg font-bold">{decoration.name}</h3>
            <p className="text-sm">Slot Level: {decoration.slotSize} | Skill: {decoration.skill.name}</p>
          </a>
        </li>
      );
    }

    case 'help': {
      const helpEntry = data as HelpEntry;
      return (
        <li className="p-2">
          <div className="block">
            <h3 className="text-lg font-bold">{helpEntry.command}</h3>
            <p className="text-sm text-gray-500">{helpEntry.description}</p>
            {helpEntry.example && (
              <p className="text-xs italic text-gray-500 mt-1">Example: {helpEntry.example}</p>
            )}

            {/* Display subcommands if they exist */}
            {helpEntry.subcommands && helpEntry.subcommands.length > 0 && (
              <div className="mt-2 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                <ul className="space-y-2">
                  {helpEntry.subcommands.map((subcommand, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{subcommand.command}</span>
                      <p className="text-xs text-gray-500">{subcommand.description}</p>
                      {subcommand.example && (
                        <p className="text-xs italic text-gray-500">Example: {subcommand.example}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
      );
    }

    default:
      return (
        <li className="p-2">
          <div className="block">
            <h3 className="text-lg font-bold">
              {typeof data === 'object' && data !== null && 'name' in data
                ? (data as { name: string }).name
                : 'Unknown Item'}
            </h3>
            <p className="text-sm text-gray-500">No additional details</p>
          </div>
        </li>
      );
  }
}
