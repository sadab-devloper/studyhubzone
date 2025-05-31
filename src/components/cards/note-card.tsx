
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Note } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.id}`} className="block h-full group">
      <Card className="flex flex-col h-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {note.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={note.imageUrl}
              alt={note.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={note.dataAiHint || 'education study'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-headline text-xl">{note.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{note.category} - Sem {note.semester}</Badge>
            <Badge variant="outline">{note.subject}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{note.summary}</CardDescription>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-primary group-hover:underline">
            View Details <ArrowRight className="inline-block ml-1 h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
