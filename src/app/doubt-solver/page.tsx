
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doubtSolver, type DoubtSolverInput, type DoubtSolverOutput } from '@/ai/flows/doubt-solver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Brain, Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from 'react-markdown';

const doubtSchema = z.object({
  courseName: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  doubt: z.string().min(10, { message: "Doubt must be at least 10 characters." }),
});

type DoubtFormValues = z.infer<typeof doubtSchema>;

export default function DoubtSolverPage() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DoubtFormValues>({
    resolver: zodResolver(doubtSchema),
    defaultValues: {
      courseName: "",
      doubt: "",
    },
  });

  const onSubmit: SubmitHandler<DoubtFormValues> = async (data) => {
    setIsLoading(true);
    setExplanation(null);
    setError(null);
    try {
      const input: DoubtSolverInput = {
        courseName: data.courseName,
        doubt: data.doubt,
      };
      const result: DoubtSolverOutput = await doubtSolver(input);
      setExplanation(result.explanation);
    } catch (e) {
      console.error("Error solving doubt:", e);
      setError("An error occurred while processing your doubt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12 text-center">
        <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">AI Doubt Solver</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stuck on a concept? Describe your doubt and the course it relates to, and our AI will provide an explanation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Ask Your Doubt</CardTitle>
            <CardDescription>Fill in the details below to get help from our AI.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="courseName">Course Name</FormLabel>
                      <FormControl>
                        <Input id="courseName" placeholder="e.g., Introduction to Physics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doubt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="doubt">Your Doubt</FormLabel>
                      <FormControl>
                        <Textarea
                          id="doubt"
                          placeholder="e.g., I don't understand Newton's third law."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Explanation...
                    </>
                  ) : (
                    <>
                     <Lightbulb className="mr-2 h-4 w-4" />
                      Explain My Doubt
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="md:sticky md:top-24"> {/* Sticky explanation card */}
          <Card className="shadow-lg min-h-[200px]">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">AI Explanation</CardTitle>
              <CardDescription>The AI's response will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
                  <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                  <p>Generating explanation...</p>
                </div>
              )}
              {error && (
                 <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {explanation && !isLoading && (
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md">
                  <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
              )}
              {!explanation && !isLoading && !error && (
                <p className="text-muted-foreground text-center py-8">
                  Your explanation will be shown here once you submit a doubt.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
