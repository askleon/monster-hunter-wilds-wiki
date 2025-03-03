'use client'

import { useState, useMemo } from 'react';
import { getAllSkills, Skill } from '@/lib/skills';

type SkillGroup = Skill[];

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const skills = useMemo(() => getAllSkills(), []);

  const groupedSkills = useMemo<SkillGroup[]>(() => {
    const groups = new Map<string, SkillGroup>();
    skills.forEach(skill => {
      if (!groups.has(skill.name)) {
        groups.set(skill.name, []);
      }
      groups.get(skill.name)!.push(skill);
    });
    return Array.from(groups.values());
  }, [skills]);

  const filteredSkillGroups = useMemo(() => {
    return groupedSkills.filter(group =>
      group[0].name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groupedSkills, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Skills</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full max-w-md p-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkillGroups.map((skillGroup) => (
          <div className="space-y-2 rounded border border-gray-300 p-2" key={skillGroup[0].name}>
            <h1 className="font-semibold text-lg">
              {skillGroup[0].name}
            </h1>
            {skillGroup.map((skill, index) => (
              <div key={index} className="text-sm">
                {skill.effect}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
