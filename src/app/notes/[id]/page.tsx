
import { mockNotes } from '@/lib/mock-data';
import NoteDetailPageClientComponent from './NoteDetailPageClient.tsx';

export async function generateStaticParams() {
  return mockNotes.map((note) => ({
    id: note.id,
  }));
}

export default function NoteDetailPage() {
  return <NoteDetailPageClientComponent />;
}
