import Navigation from '../../components/Navigation/Navigation';
import { Category } from '@/app/components/Category/Category';

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div>
      <Navigation />
      <Category slug={flokkur} />
    </div>
  );
}
