"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockNotes, type Note, mockVideos, type Video } from '@/lib/mock-data';
import { NoteCard } from '@/components/cards/note-card';
import { VideoCard } from '@/components/cards/video-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search as SearchIcon, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

function SearchResults() {
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (auth?.isLoading) return;

    if (auth?.isAuthenticated === false) {
      const redirectUrl = searchParams.get('q') ? `/search?q=${searchParams.get('q')}` : '/search';
      router.push(`/login?redirect=${redirectUrl}`);
    }
  }, [auth.isAuthenticated, auth.isLoading, router, searchParams, query]);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (query) {
      const lowerQuery = query.toLowerCase();
      const notesResults = mockNotes.filter(note => {
        const queryInNote =
          note.title.toLowerCase().includes(lowerQuery) ||
          note.summary.toLowerCase().includes(lowerQuery) ||
          (note.content && note.content.toLowerCase().includes(lowerQuery)) ||
          note.subject.toLowerCase().includes(lowerQuery) ||
          note.category.toLowerCase().includes(lowerQuery);

        const queryInUnits = note.units && note.units.some(unit =>
          unit.title.toLowerCase().includes(lowerQuery) ||
          unit.summary.toLowerCase().includes(lowerQuery) ||
          (note.content && note.content.toLowerCase().includes(lowerQuery))
        );

        return queryInNote || queryInUnits;
      });

      const videosResults = mockVideos.filter(video =>
        video.title.toLowerCase().includes(lowerQuery) ||
        video.description.toLowerCase().includes(lowerQuery) ||
        video.subject.toLowerCase().includes(lowerQuery) ||
        video.category.toLowerCase().includes(lowerQuery) ||
        video.uploader.toLowerCase().includes(lowerQuery)
      );
      setFilteredNotes(notesResults);
      setFilteredVideos(videosResults);
    } else {
      setFilteredNotes([]);
      setFilteredVideos([]);
    }
    setIsLoading(false);
  }, [query]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <Skeleton className="h-10 w-3/4 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-72 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-72 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <Info className="h-12 w-12 text-primary mx-auto mb-3" />
            <CardTitle className="font-headline text-2xl">Enter a Search Term</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please go back to the homepage or use the site navigation to find content.</p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/" >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-center sm:text-left">
          Search Results for: <span className="text-primary">"{query}"</span>
        </h1>
      </header>

      {filteredNotes.length === 0 && filteredVideos.length === 0 ? (
        <div className="text-center py-12">
            <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-headline font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any notes or videos matching your search for "{query}". Try a different term or explore our categories.
            </p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredNotes.length > 0 && (
            <section>
              <h2 className="text-3xl font-headline font-semibold mb-6 pb-2 border-b">
                Matching Notes ({filteredNotes.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {filteredNotes.map(note => <NoteCard key={`note-${note.id}`} note={note} />)}
              </div>
            </section>
          )}
          {filteredVideos.length > 0 && (
            <section>
              <h2 className="text-3xl font-headline font-semibold mb-6 pb-2 border-b">
                Matching Videos ({filteredVideos.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {filteredVideos.map(video => <VideoCard key={`video-${video.id}`} video={video} />)}
              </div>
            </section>
          )}
        </div>
      )}
       <div className="mt-16 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-8"><Skeleton className="h-10 w-3/4 mb-8" /><Skeleton className="h-64 w-full" /></div>}>
      <SearchResults />
    </Suspense>
  );
}
