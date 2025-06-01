
"use client";

import { useState, useEffect } from 'react';
import type { AppUser } from '@/contexts/auth-context'; // Use AppUser type
import { useAuth } from '@/hooks/use-auth';
import { mockUserProfile, type UserProfile as MockUserProfileType } from '@/lib/mock-data'; // Keep for recentlyViewed
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Edit3, LogOut, ShieldCheck, History, ExternalLink, BookOpenText, VideoIcon as LucideVideoIcon, UserCircle2, MailWarning, MailCheck, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO, isValid } from 'date-fns';

function AuthRequiredMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
      <UserCircle2 className="h-24 w-24 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-headline font-semibold mb-2">Access Denied</h2>
      <p className="text-muted-foreground mb-6">Please log in to view your dashboard.</p>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}

interface RecentItemCardProps {
  item: MockUserProfileType['recentlyViewed'][0];
}

function RecentItemCard({item}: RecentItemCardProps) {
  const Icon = item.type === 'note' ? BookOpenText : LucideVideoIcon;
  const link = item.type === 'note' ? `/notes/${item.id}` : `/videos/${item.id}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-start gap-4">
        <Icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <h4 className="font-semibold font-headline text-md leading-tight">{item.title}</h4>
          <p className="text-xs text-muted-foreground">
            {item.timestamp && isValid(parseISO(item.timestamp)) 
              ? `Viewed ${format(parseISO(item.timestamp), "MMM d, yyyy 'at' h:mm a")}`
              : 'Viewed recently'}
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="self-start">
          <Link href={link}><ExternalLink className="h-4 w-4" /></Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function EmailVerificationCard() {
  const { user, sendVerificationEmail } = useAuth();
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setIsSending(true);
    await sendVerificationEmail();
    setIsSending(false);
  };

  if (!user || user.isEmailVerified) {
    return null;
  }

  return (
    <Card className="lg:col-span-3 shadow-lg border-yellow-500/50 dark:border-yellow-400/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MailWarning className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          <CardTitle className="font-headline text-xl">Verify Your Email Address</CardTitle>
        </div>
        <CardDescription>
          To ensure account security and access all features, please verify your email address.
          A verification link has been sent to <strong>{user.email}</strong>. Please check your inbox (and spam folder).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSendVerification} disabled={isSending} className="w-full sm:w-auto">
          {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Resend Verification Email
        </Button>
      </CardContent>
    </Card>
  );
}

// Use AppUser from auth context for profileData
interface DashboardUserProfile extends AppUser {
  avatarUrl: string; // Add avatarUrl if not directly in AppUser, or generate it
  dataAiHint?: string;
  recentlyViewed: MockUserProfileType['recentlyViewed']; // Still using mock data for recently viewed items
}


export default function DashboardPage() {
  const { user, loading, logout } = useAuth(); // user is now AppUser | null

  if (loading) {
    return <div className="container mx-auto py-8 animate-pulse"><Card><CardHeader><CardTitle>Loading Dashboard...</CardTitle></CardHeader><CardContent><div className="h-64 bg-muted rounded-md"></div></CardContent></Card></div>;
  }

  if (!user) {
    return <AuthRequiredMessage />;
  }

  // Construct profileData using the authenticated user and supplementing where needed
  const profileData: DashboardUserProfile = {
    ...user, // Spread AppUser properties
    avatarUrl: `https://placehold.co/100x100.png?text=${user.name ? user.name.charAt(0).toUpperCase() : 'U'}`,
    dataAiHint: 'profile avatar',
    recentlyViewed: mockUserProfile.recentlyViewed, // Still using mock data for recently viewed items
  };

  const formattedJoinDate = () => {
    if (profileData.joinDate) {
      const date = parseISO(profileData.joinDate);
      if (isValid(date)) {
        return format(date, 'MMMM d, yyyy');
      }
    }
    return 'Not available';
  };


  return (
    <div className="container mx-auto py-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">My Dashboard</h1>
      </header>

      {!profileData.isEmailVerified && <EmailVerificationCard />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint={profileData.dataAiHint || 'profile avatar'} />
              <AvatarFallback>{profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-2xl">{profileData.name || 'User'}</CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground">
              {profileData.email}
              {profileData.isEmailVerified ? (
                <MailCheck className="h-4 w-4 text-green-500" title="Email Verified" />
              ) : (
                <MailWarning className="h-4 w-4 text-yellow-500" title="Email Not Verified" />
              )}
            </div>
            <Badge variant={profileData.subscriptionStatus === 'Premium' || profileData.subscriptionStatus === 'Pro' ? 'default' : 'secondary'} className="mt-2">
              <ShieldCheck className="mr-1 h-4 w-4" /> {profileData.subscriptionStatus} Plan
            </Badge>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>Joined:</strong> {formattedJoinDate()}</p>
            <Separator />
            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" size="sm">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />} Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <History className="mr-2 h-5 w-5 text-primary" /> Recently Viewed
            </CardTitle>
            <CardDescription>Your latest activity on Study Hub Zone. (Mock data)</CardDescription>
          </CardHeader>
          <CardContent>
            {profileData.recentlyViewed.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {profileData.recentlyViewed.map(item => (
                  <RecentItemCard key={`${item.type}-${item.id}`} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent activity yet. Start exploring notes and videos!</p>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
                <p className="text-sm text-muted-foreground">
                    You are on the <strong className="text-foreground">{profileData.subscriptionStatus}</strong> plan.
                </p>
                <Button asChild variant="default">
                    <Link href="/subscription">
                        {profileData.subscriptionStatus === 'Free' ? 'Upgrade Plan' : 'Manage Subscription'}
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
