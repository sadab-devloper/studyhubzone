
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';

export function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-video">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint={video.dataAiHint || 'video education'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="h-16 w-16 text-white" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{video.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{video.category}</Badge>
          <Badge variant="outline">{video.subject}</Badge>
        </div>
         <p className="text-xs text-muted-foreground mt-1">By {video.uploader} &bull; {video.duration}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{video.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full">
          <Link href={`https://www.youtube.com/watch?v=${video.videoUrl}`} target="_blank" rel="noopener noreferrer">
            Watch Video <PlayCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
