"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/signup')) {
      redirect('/login');
    }
  }, [isAuthenticated, isLoading]);

  // Render null or a loading indicator while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  // If authenticated or on a public page, render the children
  return <>{children}</>;
};

export default AuthCheck;
