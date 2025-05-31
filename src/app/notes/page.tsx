
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockNotes, type Note } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Users, BookOpen, Code, TestTube2 as TestTube } from 'lucide-react'; 
import { NoteCard } from '@/components/cards/note-card';

type ViewState = 'courses' | 'semesters' | 'subjects';

const courseCategories = ["BBA", "BCA", "B.Pharm"];

export default function NotesPage() {
  const [currentView, setCurrentView] = useState<ViewState>('courses');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const availableSemesters = useMemo(() => {
    if (!selectedCourse) return [];
    const courseNotes = mockNotes.filter(note => note.category === selectedCourse);
    const semesters = [...new Set(courseNotes.map(note => note.semester))].sort((a, b) => a - b);
    return semesters;
  }, [selectedCourse]);

  const filteredSubjects = useMemo(() => {
    if (!selectedCourse || !selectedSemester) return [];
    return mockNotes.filter(note => {
      const matchesCourse = note.category === selectedCourse;
      const matchesSemester = note.semester === selectedSemester;
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = note.title.toLowerCase().includes(lowerSearchTerm) ||
                            note.summary.toLowerCase().includes(lowerSearchTerm) ||
                            note.subject.toLowerCase().includes(lowerSearchTerm);
      return matchesCourse && matchesSemester && matchesSearch;
    });
  }, [searchTerm, selectedCourse, selectedSemester]);

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setCurrentView('semesters');
    setSearchTerm(''); 
  };

  const handleSemesterSelect = (semester: number) => {
    setSelectedSemester(semester);
    setCurrentView('subjects');
    setSearchTerm(''); 
  };

  const goBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSearchTerm('');
    setCurrentView('courses');
  };

  const goBackToSemesters = () => {
    setSelectedSemester(null);
    setSearchTerm('');
    setCurrentView('semesters');
  };

  const getPageTitle = () => {
    if (currentView === 'courses') return "Select a Course";
    if (currentView === 'semesters' && selectedCourse) return `${selectedCourse} - Select Semester`;
    if (currentView === 'subjects' && selectedCourse && selectedSemester) return `${selectedCourse} - Semester ${selectedSemester} Subjects`;
    return "Explore Notes";
  };
  
  const CourseIcon = ({ course }: { course: string }) => {
    if (course === "BBA") return <BookOpen className="h-12 w-12 text-primary" />;
    if (course === "BCA") return <Code className="h-12 w-12 text-accent" />; 
    if (course === "B.Pharm") return <TestTube className="h-12 w-12 text-green-500" />;
    return null;
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">{getPageTitle()}</h1>
        {currentView === 'courses' && (
           <p className="mt-3 text-lg text-muted-foreground">
            Choose your field of study to find relevant notes.
          </p>
        )}
         {currentView === 'semesters' && (
           <p className="mt-3 text-lg text-muted-foreground">
            Pick a semester to browse subjects.
          </p>
        )}
         {currentView === 'subjects' && (
           <p className="mt-3 text-lg text-muted-foreground">
            Search for specific subjects or browse the list below.
          </p>
        )}
      </header>

      {currentView !== 'courses' && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={currentView === 'semesters' ? goBackToCourses : goBackToSemesters}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      )}

      {currentView === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseCategories.map(course => (
            <Card 
              key={course} 
              className="text-center p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCourseSelect(course)}
            >
              <CardHeader className="items-center">
                <CourseIcon course={course} />
                <CardTitle className="font-headline text-2xl mt-4">{course}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Explore notes for {course} students.</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {currentView === 'semesters' && selectedCourse && (
        <div className="flex flex-wrap justify-center gap-4">
          {availableSemesters.length > 0 ? availableSemesters.map(semester => (
            <Button
              key={semester}
              variant="default"
              size="lg"
              className="min-w-[150px] text-lg"
              onClick={() => handleSemesterSelect(semester)}
            >
              Semester {semester}
            </Button>
          )) : (
            <p className="text-muted-foreground">No semesters found for {selectedCourse}.</p>
          )}
        </div>
      )}

      {currentView === 'subjects' && selectedCourse && selectedSemester && (
        <>
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subjects by title, or keyword..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search subjects"
              />
            </div>
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map(note => (
                 <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-headline font-semibold mb-2">No Subjects Found</h3>
              <p className="text-muted-foreground">
                No subjects match your criteria for {selectedCourse} - Semester {selectedSemester}.
                {searchTerm && " Try a different search term."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
