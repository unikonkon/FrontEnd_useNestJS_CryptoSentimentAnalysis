import AnalysisPage from './analysis';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <AnalysisPage articleId={parseInt(id)} />;
}
