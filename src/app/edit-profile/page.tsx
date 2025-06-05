"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from 'lucide-react';

const avatarOptions = [
  "https://placehold.co/100x100/718096/fff?text=A1",
  "https://placehold.co/100x100/718096/fff?text=B2",
  "https://placehold.co/100x100/a0aec0/fff?text=C3",
  "https://placehold.co/100x100/cbd5e0/fff?text=D4",
  "https://placehold.co/100x100/e2e8f0/4a5568?text=E5",
];

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateUserProfileInFirestore, sendPasswordResetEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(user?.avatarUrl || null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (user) {
        await updateUserProfileInFirestore(user.uid, { ...data, avatarUrl: selectedAvatar });
        setSuccess(true);
      } else {
        setError("User not found. Please log in again.");
      }
    } catch (e: any) {
      setError(e.message || "An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your profile has been updated successfully.</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Select Avatar</FormLabel>
                <div className="flex gap-2">
                  {avatarOptions.map((avatar) => (
                    <Button
                      key={avatar}
                      variant="outline"
                      className={selectedAvatar === avatar ? "ring-2 ring-primary" : ""}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <img src={avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
              <Button variant="link" disabled={isLoading} className="w-full" onClick={async () => {
                if (user?.email) {
                  setIsLoading(true);
                  try {
                    await sendPasswordResetEmail(user.email);
                    setSuccess(true);
                  } catch (error: any) {
                    setError(error.message || "Failed to send password reset email.");
                  } finally {
                    setIsLoading(false);
                  }
                } else {
                  setError("User email not found. Please log in again.");
                }
              }}>
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
