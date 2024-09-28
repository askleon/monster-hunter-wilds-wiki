'use client'

import LoadoutBuilder from '@/app/components/LoadoutBuilder';
import { useSearchParams } from 'next/navigation';

export default function EditLoadoutPage() {
  const searchParams = useSearchParams();
  const loadoutName = searchParams.get('name');

  return <LoadoutBuilder loadoutName={loadoutName || undefined} />;
}
