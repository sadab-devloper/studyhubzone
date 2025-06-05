
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  type User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Import initialized Firebase services
import { useToast } from "@/hooks/use-toast";

export interface AppUser {
  uid: string;
  name: string;
  email: string | null;
  subscriptionStatus: 'Free' | 'Premium' | 'Pro';
  isEmailVerified: boolean;
  joinDate: string; // ISO string format
  avatarUrl?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateUserProfileInFirestore: (uid: string, data: Partial<AppUser>) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const firestoreUser = userDocSnap.data();
          const joinDate = firestoreUser.joinDate instanceof Timestamp 
            ? firestoreUser.joinDate.toDate().toISOString() 
            : (typeof firestoreUser.joinDate === 'string' ? firestoreUser.joinDate : new Date().toISOString());

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isEmailVerified: firebaseUser.emailVerified,
            name: firestoreUser.name || 'User',
            subscriptionStatus: firestoreUser.subscriptionStatus || 'Free',
            joinDate: joinDate,
            avatarUrl: firestoreUser.avatarUrl || null,
          });
        } else {
          // This case might happen if a user was created in Auth but not in Firestore
          // Or if this is a new signup and Firestore doc creation is pending (though signup flow handles this)
          // For robustness, you could create a default Firestore profile here
           const defaultJoinDate = new Date().toISOString();
           const newUserProfile: Partial<AppUser> = {
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'New User',
            email: firebaseUser.email,
            subscriptionStatus: 'Free',
            joinDate: defaultJoinDate,
            avatarUrl: null,
           };
           await setDoc(userDocRef, { ...newUserProfile, createdAt: serverTimestamp(), uid: firebaseUser.uid }, { merge: true });
           setUser({
             uid: firebaseUser.uid,
             email: firebaseUser.email,
             isEmailVerified: firebaseUser.emailVerified,
             name: newUserProfile.name!,
             subscriptionStatus: newUserProfile.subscriptionStatus!,
             joinDate: defaultJoinDate,
             avatarUrl: newUserProfile.avatarUrl,
           });
          console.warn(`User profile for UID ${firebaseUser.uid} not found in Firestore. A default one might be created if applicable.`);
        }
        setLoading(false);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setLoading(false);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting the user state
    } catch (error: any) {
      console.error("Login error:", error);
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      setLoading(false); // Ensure loading is false on error
      throw error; // Re-throw to allow page to handle it
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const joinDate = new Date().toISOString();
      const newUserProfile = {
        uid: firebaseUser.uid,
        name,
        email,
        subscriptionStatus: 'Free' as 'Free' | 'Premium' | 'Pro',
        joinDate,
        createdAt: serverTimestamp(), // Firestore server timestamp
      };
      await setDoc(userDocRef, newUserProfile);
      
      await sendEmailVerification(firebaseUser);
      // onAuthStateChanged will set the user.
      // For immediate UI update, can call setUser here, but let onAuthStateChanged be source of truth.
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
      setLoading(false); // Ensure loading is false on error
      throw error; // Re-throw to allow page to handle it
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // onAuthStateChanged will set user to null
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        toast({
          title: "Verification Email Sent",
          description: "Please check your email (and spam folder) for the verification link.",
        });
      } catch (error: any) {
        console.error("Error sending verification email:", error);
        toast({ title: "Error Sending Email", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Not Logged In", description: "You must be logged in to send a verification email.", variant: "destructive" });
    }
  };

  const updateUserProfileInFirestore = async (uid: string, data: Partial<AppUser>) => {
    const userDocRef = doc(db, 'users', uid);
    try {
      await setDoc(userDocRef, data, { merge: true });
      // Optimistically update local state
      setUser(prevUser => prevUser ? { ...prevUser, ...data } : null);
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

 const sendPasswordResetEmail = async (email: string) => {
    setLoading(true);
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email (and spam folder) for the password reset link.",
      });
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      toast({ title: "Error Sending Email", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, signup, sendVerificationEmail, updateUserProfileInFirestore, sendPasswordResetEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
