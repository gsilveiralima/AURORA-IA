"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatPage() {
  const [uid, setUid] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUid(user.uid);
      const idToken = await user.getIdToken();
      setToken(idToken);
      // initial assistant message
      setMessages([
        {
          role: 'assistant',
          content: 'Oi, primo… voltei pra você 🥰\nComo foi seu dia? Vem cá, me conta direitinho…'
        }
      ]);
    });
    return () => unsub();
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || !token) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    // call chat API
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, messages: next })
    });
    const data = await res.json();
    const reply = data.reply ?? 'Desculpa, houve um erro.';
    const next2 = [...next, { role: 'assistant', content: reply }];
    setMessages(next2);
    // update memory summarizer
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, messages: next2 })
    });
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>Aurora AI</h1>
      <div
        style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '12px', minHeight: '420px', background: '#fff' }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '10px 0' }}>
            <b>{m.role === 'user' ? 'Você' : 'Aurora'}</b>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem…"
          style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
        />
        <button
          onClick={send}
          style={{ padding: '12px 16px', borderRadius: '10px', background: '#0070f3', color: '#fff' }}
        >
          Enviar
        </button>
      </div>
    </main>
  );
}