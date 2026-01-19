"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AccountPage() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setEmail(user.email || '');
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return <p>Loading…</p>;
  }
  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>Minha Conta</h1>
      <p>Email: {email}</p>
      <p>Plano: Em breve</p>
      <button
        onClick={async () => {
          await auth.signOut();
          window.location.href = '/login';
        }}
        style={{ padding: '12px 16px', borderRadius: '8px', marginTop: '1rem' }}
      >
        Sair
      </button>
    </main>
  );
}