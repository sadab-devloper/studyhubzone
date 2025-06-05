"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SubscriptionPage() {
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (auth?.isLoading) return;

    if (auth?.isAuthenticated === false) {
      const redirectUrl = searchParams.get('redirect') || '/subscription';
      router.push(`/login?redirect=${redirectUrl}`);
    }
  }, [auth.isAuthenticated, auth.isLoading, router, searchParams]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.isAuthenticated) {
    return <div>Access Required, redirecting to login...</div>;
  }

  const { user, isLoading } = useAuth();
  const currentStatus = user?.subscriptionStatus || 'Free';

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Access to limited notes',
        'View selected course videos',
        'Basic AI Doubt Solver access (3 queries/day)',
      ],
      cta: 'Continue with Free',
      isCurrent: (status: string) => status === 'Free',
      highlight: false,
    },
    {
      name: 'Premium',
      price: '$1',
      period: '/month',
      features: [
        'Unlimited access to all notes',
        'Access to all course videos',
        'Unlimited AI Doubt Solver access',
        'Priority support',
        'Download notes for offline access',
      ],
      cta: 'Upgrade to Premium',
      isCurrent: (status: string) => status === 'Premium',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$2',
      period: '/month',
      features: [
        'All Premium features',
        'Exclusive AI tools (e.g., Note Summarization)',
        'Personalized study tips from AI',
        'Early access to new features',
        'One-on-one doubt clearing sessions (2/month)',
      ],
      cta: 'Upgrade to Pro',
      isCurrent: (status: string) => status === 'Pro',
      highlight: false,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Choose Your Plan</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of Study Hub Zone with our subscription plans. Get access to premium content and advanced AI tools.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${plan.highlight ? 'border-primary ring-2 ring-primary' : ''}`}
          >
            <CardHeader className="text-center">
              {plan.name === "Premium" && <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />}
              {plan.name === "Pro" && <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />}
              <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.isCurrent(currentStatus) ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {plan.cta}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {auth?.user && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Your current plan is: <strong className="text-foreground">{currentStatus}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your billing and subscription details in your <Link href="/dashboard" className="text-primary hover:underline">dashboard</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
