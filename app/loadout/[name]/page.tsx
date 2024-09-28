import LoadoutBuilder from '@/app/components/LoadoutBuilder';

export default function EditLoadoutPage({ params }: { params: { name: string } }) {
  return <LoadoutBuilder loadoutName={decodeURIComponent(params.name)} />;
}
