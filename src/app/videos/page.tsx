
"use client";

import { useState, useMemo } from 'react';
import { mockVideos, type Video } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { VideoCard } from '@/components/cards/video-card'; // Import VideoCard

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = useMemo(() => {
    return mockVideos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Course Videos</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore a wide range_of educational videos to enhance your learning.
        </p>
      </header>

      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos by title, subject, or keyword..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search videos"
          />
        </div>
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-headline font-semibold mb-2">No Videos Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search term. New videos are added regularly!
          </p>
        </div>
      )}
    </div>
  );
}
