"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      const user = auth.currentUser;
      if (user) {
        // we deliberately avoid storing cookie here; Next API will check token in calls
        window.location.href = '/chat';
      }
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong');
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h1>Aurora AI</h1>
      <p>{mode === 'login' ? 'Log in' : 'Sign up'}</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '8px' }}
      />
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <button onClick={submit} style={{ width: '100%', padding: '12px', marginTop: '12px' }}>
        {mode === 'login' ? 'Log in' : 'Create account'}
      </button>
      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        style={{ width: '100%', padding: '12px', marginTop: '8px' }}
      >
        {mode === 'login' ? 'Create account' : 'Already have an account'}
      </button>
    </main>
  );
}