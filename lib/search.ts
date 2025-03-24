/**
 * Search library
 * The search library should be able to query all data.
 * Example usage: from:monster name:Rath -> Rathalos, Rathian from monsters
 * Example usage: from:monster type:Bird,Wyvern habitat:Desert -> All monsters that are birds or wyverns that live in the desert
 * Example usage: from:weapons name:rath element:fire -> All weapons with "rath" in name and fire element
 * /help should return a list of all possible queries and their usage
 */

import * as mon from '@/lib/monsters';
import * as weapons from '@/lib/weapons';
import { Skill, skills } from './skills';
import { ArmorSet, getAllArmorSets } from './armors';
import { Decoration, decorations } from './decorations';
import { maps, MapViewItem } from './maps';

export type ResultType = 'monster'
  | 'weapon'
  | 'skill'
  | 'help'
  | 'map'
  | 'armor'
  | 'decoration'
  | 'unknown';

export interface HelpEntry {
  command: string;
  description: string;
  example?: string;
  category?: string;
  subcommands?: HelpEntry[];
}

export interface SearchResult {
  type: ResultType;
  data: mon.Monster | weapons.Weapon | Skill | HelpEntry | MapViewItem | ArmorSet | Decoration | unknown;
  url?: string;
}

interface DataSourceConfig<T> {
  data: T[];
  filters: Record<string, (item: T, values: string[]) => boolean>;
  resultType: ResultType;
  getUrl: (item: T) => string;
}

// Generic filter factory that automatically determines filter type based on property structure
function createFilterCollection<T>(sampleObject: T): Record<string, (item: T, values: string[]) => boolean> {
  const filters: Record<string, (item: T, values: string[]) => boolean> = {};

  // Examine each property and create appropriate filter
  Object.keys(sampleObject || {}).forEach(key => {
    const property = key as keyof T;
    const value = sampleObject[property];

    if (Array.isArray(value)) {
      // Array filter for array properties
      filters[key] = (item, values) => {
        if (!item) return false;
        const arr = item[property] as unknown as unknown[];
        if (!arr) return false;
        return values.some(value =>
          arr.some(element =>
            element !== undefined && element !== null &&
            String(element).toLowerCase().includes(value.toLowerCase())
          )
        );
      };
    } else if (typeof value === 'number') {
      // Exact match filter for numbers
      filters[key] = (item, values) => {
        if (!item || item[property] === undefined) return false;
        return values.includes(String(item[property]));
      };
    } else {
      // String filter for everything else
      filters[key] = (item, values) => {
        if (!item || item[property] === undefined || item[property] === null) return false;
        return values.some(value =>
          String(item[property]).toLowerCase().includes(value.toLowerCase())
        );
      };
    }
  });

  return filters;
}

// Create filters dynamically using sample objects
const monsterFilters = createFilterCollection<mon.Monster>(mon.monsters[0] || {});
const weaponFilters = createFilterCollection<weapons.Weapon>(weapons.weapons[0] || {});
const skillFilters = createFilterCollection<Skill>(skills[0] || {});
const mapFilters = createFilterCollection<MapViewItem>(maps[0] || {});
const armorFilters = createFilterCollection<ArmorSet>(getAllArmorSets()[0] || {});
const decorationFilters = createFilterCollection<Decoration>(decorations[0] || {});

// TODO: Implement custom filter for weakness search (IE: weakness:fire)
// Add any custom filters that need special handling
// monsterFilters.custom = (monster, values) => {
//   // Custom filter logic for special cases
//   return true;
// };

// The problem is with the dataSources type declaration. Let's create a more specific type:
interface DataSourceMap {
  monster: DataSourceConfig<mon.Monster>;
  weapon: DataSourceConfig<weapons.Weapon>;
  skill: DataSourceConfig<Skill>;
  map: DataSourceConfig<MapViewItem>;
  armor: DataSourceConfig<ArmorSet>;
  decoration: DataSourceConfig<Decoration>;
}

const dataSources: DataSourceMap = {
  monster: {
    data: mon.monsters,
    filters: monsterFilters,
    resultType: 'monster',
    getUrl: (monster: mon.Monster) => `/monsters/${monster.id}`
  },
  weapon: {
    data: weapons.weapons || [],
    filters: weaponFilters,
    resultType: 'weapon',
    getUrl: (weapon: weapons.Weapon) => `/weapons/${weapon.type}#${weapon.slug}`
  },
  skill: {
    data: skills,
    filters: skillFilters,
    resultType: 'skill',
    getUrl: (skill: Skill) => `/skills?search=${skill.name}`
  },
  map: {
    data: maps,
    filters: mapFilters,
    resultType: 'map',
    getUrl: (map: MapViewItem) => `/maps/${map.id}`
  },
  armor: {
    data: getAllArmorSets(),
    filters: armorFilters,
    resultType: 'armor',
    getUrl: (armorSet: ArmorSet) => `/armors/${armorSet.id}`
  },
  decoration: {
    data: decorations,
    filters: decorationFilters,
    resultType: 'decoration',
    getUrl: (decoration: Decoration) => `/decorations/${decoration.id}`
  }
};

// Metadata to enhance help documentation
const filterDescriptions: Record<string, Record<string, string>> = {
  monster: {
    name: "Search monsters by name: name:Rathalos",
    type: "Search monsters by type: type:Flying,Wyvern",
    habitat: "Search monsters by habitat: habitat:Desert",
    custom: "Special search options: custom:value"
  },
  weapon: {
    name: "Search weapons by name: name:Sword",
    element: "Search weapons by element: element:fire,water"
  },
  skill: {
    name: "Search skills by name: name:Attack Boost",
    description: "Search skills by description: description:attack"
  },
  map: {
    name: "Search maps by name: name:Ancient Forest",
    type: "Search maps by type: type:forest"
  },
  armor: {
    name: "Search armors by name: name:Rathalos",
    type: "Search armors by type: type:head,chest"
  },
  decoration: {
    name: "Search decorations by name: name:Attack",
    skill: "Search decorations by skill: skill:Attack Boost"
  }
};

// Dynamically create available commands
const availableCommands: Record<string, string | Record<string, string>> = {
  from: "Specify data source: from:monster, from:weapon, from:skill"
};

// Add data sources and their filters to available commands
Object.keys(filterDescriptions).forEach(dataType => {
  // Get the appropriate filter collection based on data type
  let filtersForType;
  switch (dataType) {
    case 'monster': filtersForType = monsterFilters; break;
    case 'weapon': filtersForType = weaponFilters; break;
    case 'skill': filtersForType = skillFilters; break;
    case 'map': filtersForType = mapFilters; break;
    case 'armor': filtersForType = armorFilters; break;
    case 'decoration': filtersForType = decorationFilters; break;
    default: filtersForType = {};
  }

  // Create entry for this data type with its available filters
  availableCommands[dataType] = {};

  // Add filters that actually exist in our filter collection
  Object.keys(filtersForType).forEach(filterName => {
    // Use the description from metadata if available, or generate a default one
    (availableCommands[dataType] as Record<string, string>)[filterName] = filterDescriptions[dataType][filterName] ||
      `Search ${dataType}s by ${filterName}: ${filterName}:value`;
  });
});


function searchData<T>(
  sourceData: T[],
  filters: string[],
  filterCollection: Record<string, (item: T, values: string[]) => boolean>,
  resultType: ResultType,
  urlGenerator: (item: T) => string
): SearchResult[] {
  let filteredItems = [...sourceData];

  filters.forEach(filter => {
    // Skip empty filters
    if (!filter) return;

    // Extract property and value
    const colonIndex = filter.indexOf(':');
    if (colonIndex === -1) {
      // Simple text search if no colon - search across all filterable properties
      filteredItems = filteredItems.filter(item => {
        // Check each available filter to see if it matches
        return Object.keys(filterCollection).some(key => {
          // Create a single-value array with our search term
          return filterCollection[key](item, [filter]);
        });
      });
      return;
    }

    const property = filter.substring(0, colonIndex).trim();
    const valueString = filter.substring(colonIndex + 1).trim();
    const values = valueString.split(',').map(v => v.trim());

    // Apply the filter if it exists
    const filterFunction = filterCollection[property];
    if (filterFunction) {
      filteredItems = filteredItems.filter(item => filterFunction(item, values));
    }
  });

  // Convert to SearchResult objects
  return filteredItems.map(item => ({
    type: resultType,
    data: item,
    url: urlGenerator(item)
  }));
}

export function search(query: string): SearchResult[] {
  // Handle help command
  if (query.trim() === "/help") {
    return formatHelpResponse();
  }

  // Return empty array if no query
  if (!query.trim()) {
    return [];
  }

  // Parse query into separate filter conditions
  const conditions = parseQueryConditions(query);

  // Find the 'from' parameter to determine which dataset to search
  const fromParam = conditions.find(c => c.startsWith('from:'));

  // Remove the from parameter from conditions
  const filters = conditions.filter(c => !c.startsWith('from:'));

  // Default to searching all data if no from parameter
  if (!fromParam) {
    return searchAllData(filters);
  }

  // Extract the data source name
  const dataSource = fromParam.substring(5).trim().toLowerCase();

  // Special handling for 'skills' -> 'skill'
  const singularSource = dataSource === 'skills' ? 'skill' :
    dataSource.endsWith('s') ? dataSource.slice(0, -1) : dataSource;

  // Check if we have this data source registered
  if (singularSource in dataSources) {
    // Fix the type issue by using a type assertion and extracting the source
    const sourceKey = singularSource as keyof DataSourceMap;
    const source = dataSources[sourceKey];

    // Use proper type parameters with searchData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return searchData<any>(
      source.data,
      filters,
      source.filters,
      source.resultType,
      source.getUrl
    );
  }

  // Fall back to searching all data
  return searchAllData(filters);
}

function searchAllData(filters: string[]): SearchResult[] {
  // Combine results from all data sources
  const results: SearchResult[] = [];

  // eslint-disable-next-line
  Object.entries(dataSources).forEach(([_, source]) => {
    const sourceResults = searchData(
      source.data,
      filters,
      source.filters,
      source.resultType,
      source.getUrl
    );
    results.push(...sourceResults);
  });

  return results;
}


/**
 * Parse a search query into conditions, respecting quoted strings
 * Example: from:monster name:"Great Jagras" type:Brute
 * Should return ["from:monster", "name:Great Jagras", "type:Brute"]
 */
function parseQueryConditions(query: string): string[] {
  const conditions: string[] = [];
  let currentCondition = '';
  let inQuotes = false;

  for (let i = 0; i < query.length; i++) {
    const char = query[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      currentCondition += char;
    } else if (char === ' ' && !inQuotes) {
      if (currentCondition) {
        conditions.push(currentCondition);
        currentCondition = '';
      }
    } else {
      currentCondition += char;
    }
  }

  if (currentCondition) {
    conditions.push(currentCondition);
  }

  // Process quoted values to remove the quotes
  return conditions.map(condition => {
    const colonIndex = condition.indexOf(':');
    if (colonIndex > -1) {
      const key = condition.substring(0, colonIndex);
      let value = condition.substring(colonIndex + 1);

      // Remove surrounding quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }

      return `${key}:${value}`;
    }
    return condition;
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function formatHelpResponse(): SearchResult[] {
  const helpEntries: HelpEntry[] = [];

  // Process each top-level command
  Object.entries(availableCommands).forEach(([command, value]) => {
    if (typeof value === 'string') {
      const [description, example] = value.split(': ');
      helpEntries.push({
        command,
        description,
        example
      });
    } else {
      const categoryEntry: HelpEntry = {
        command,
        description: `Available ${command} filters:`,
        category: command,
        subcommands: []
      };

      if (isRecord(value)) {
        // Process subcommands
        Object.entries(value).forEach(([subCommand, subDescription]) => {
          if (typeof subDescription === 'string') {
            const [desc, example] = subDescription.split(': ');
            categoryEntry.subcommands?.push({
              command: `${subCommand}`,
              description: desc,
              example,
              category: command
            });
          }
        });

      }
      helpEntries.push(categoryEntry);
    }
  });

  return helpEntries.map(entry => ({
    type: 'help' as ResultType,
    data: entry
  }));
}
