import { NextResponse } from 'next/server';
import { AURORA_SYSTEM_PROMPT } from '@/lib/auroraPrompt';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

type Msg = { role: 'user' | 'assistant'; content: string };

// POST handler for chat completions
export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token as string;
  const messages = (body.messages as Msg[]) ?? [];
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }
  // verify token using Firebase Admin
  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const uid = decoded.uid;
  // fetch current memory
  const memRef = adminDb.collection('memories').doc(uid);
  const memSnap = await memRef.get();
  const memory: string = memSnap.exists ? (memSnap.data()?.summary ?? '') : '';
  // build system prompt with memory
  const system = `${AURORA_SYSTEM_PROMPT}\n\nMemória do usuário (resumo):\n${memory || '(vazio)'}`;
  // call OpenAI chat completions
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: system },
        ...messages
      ]
    })
  });
  if (!resp.ok) {
    const txt = await resp.text();
    return NextResponse.json({ error: txt }, { status: 500 });
  }
  const data = await resp.json();
  const reply = data.choices?.[0]?.message?.content ?? '';
  return NextResponse.json({ reply });
}