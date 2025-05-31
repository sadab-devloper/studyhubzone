
"use client"; 

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookOpenText, Video, Brain, Search as SearchIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth'; 

export default function HomePage() {
  const { user } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-headline font-bold">Find Your Study Material</h2>
              <p className="text-muted-foreground mt-2">
                Search for notes, videos, and more across all subjects.
              </p>
            </div>
            <div>
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="search"
                  placeholder="e.g., 'Calculus', 'Python programming', 'French Revolution'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow text-base h-12"
                  aria-label="Search Study Hub Zone"
                />
                <Button type="submit" size="lg" className="h-12">
                  <SearchIcon className="mr-2 h-5 w-5" /> Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pt-6 md:pt-8 lg:pt-12 pb-12 md:pb-24 lg:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-12 sm:text-4xl">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <BookOpenText className="h-10 w-10 text-primary" />
                  <CardTitle className="font-headline text-2xl">Curated Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  Access a vast library of pre-uploaded notes, categorized by subject and topic for easy navigation. Find what you need quickly with our powerful search.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" asChild className="w-full">
                  <Link href="/notes">
                    Explore Notes <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Video className="h-10 w-10 text-primary" />
                  <CardTitle className="font-headline text-2xl">Course Videos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  Watch high-quality educational videos covering a wide range of subjects. Learn at your own pace with engaging visual content.
                </CardDescription>
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" asChild className="w-full">
                  <Link href="/videos">
                    Watch Videos <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Brain className="h-10 w-10 text-primary" />
                  <CardTitle className="font-headline text-2xl">AI Doubt Solver</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">
                  Stuck on a concept? Our AI-powered Doubt Solver provides clear explanations to help you understand complex topics related to your courses.
                </CardDescription>
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" asChild className="w-full">
                  <Link href="/doubt-solver">
                    Ask AI <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 lg:p-16 text-center shadow-xl">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Study Hub Zone
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl mt-4 mb-8">
              Your all-in-one platform for accessing educational notes, course videos, and AI-powered study tools. Elevate your learning experience today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90 shadow-md">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90 shadow-md">
                <Link href="/notes">
                  Explore Content
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {!user && ( 
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 rounded-lg mt-8"> {/* Added margin-top for spacing */}
          <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tighter mb-6 sm:text-4xl">
                  Ready to Boost Your Learning?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg mb-8">
                  Join Study Hub Zone today and unlock a world of knowledge and tools designed for your success.
              </p>
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                  <Link href="/signup">
                      Sign Up for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
        </section>
      )}
    </div>
  );
}
