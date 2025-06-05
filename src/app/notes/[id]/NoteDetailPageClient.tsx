"use client";

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockNotes, type Note, type Unit } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, BookOpen, Download, Star, DownloadCloud } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function UnitCard({ unit, onDownload }: { unit: Unit, onDownload: (title: string) => void }) {
  return (
    <Card className="shadow-md border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{unit.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Separator className="my-3"/>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DownloadCloud className="mr-1 h-4 w-4 text-primary" />
            <span>{unit.totalDownloads.toLocaleString()} Downloads</span>
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < unit.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50")}
              />
            ))}
            <span className="ml-1">({unit.rating.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownload(unit.title)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Unit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const NoteDetailPageClientComponent = () => {
  const params = useParams();
  const noteId = params.id as string;
  const { toast } = useToast();

  const note = mockNotes.find(n => n.id === noteId);

  if (!note) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Note Not Found</h1>
        <p className="text-muted-foreground mb-4">The note you are looking for does not exist or may have been moved.</p>
        <Button asChild>
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </Button>
      </div>
    );
  }

  const handleDownloadUnit = (unitTitle: string) => {
    toast({
      title: "Download Started (Simulated)",
      description: `Downloading: ${unitTitle}`,
    });
    console.log(`Simulating download for unit: ${unitTitle}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Notes
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        {note.imageUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-t-lg overflow-hidden">
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
          <CardTitle className="font-headline text-3xl md:text-4xl">{note.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{note.category}</Badge>
            <Badge variant="outline">{note.subject}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Created on {format(parseISO(note.createdAt), "MMMM d, yyyy")}</span>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-4">{note.summary}</CardDescription>
          {note.content ? (
            <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
              <p>{note.content}</p>
            </div>
          ) : (
             <p className="text-muted-foreground mb-6">
              {note.units && note.units.length > 0 ?
                'Explore the units below for detailed content.' :
                'Full content for this note is not available.'
              }
            </p>
          )}

          {note.units && note.units.length > 0 && (
            <>
              <Separator className="my-6" />
              <h3 className="text-2xl font-headline font-semibold mb-4 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Course Units
              </h3>
              <div className="space-y-4">
                {note.units.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} onDownload={handleDownloadUnit} />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default dynamic(() => Promise.resolve(NoteDetailPageClientComponent), { ssr: false });
