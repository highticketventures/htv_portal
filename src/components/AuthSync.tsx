"use client";

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export function AuthSync() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(console.error);
    }
  }, [isSignedIn]);

  return null; 
} 