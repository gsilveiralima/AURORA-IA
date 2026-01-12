import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

type Msg = { role: 'user' | 'assistant'; content: string };

// POST handler to update user memory using OpenAI summarization
export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token as string;
  const messages = (body.messages as Msg[]) ?? [];
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }
  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const uid = decoded.uid;
  const memRef = adminDb.collection('memories').doc(uid);
  const memSnap = await memRef.get();
  const current: string = memSnap.exists ? (memSnap.data()?.summary ?? '') : '';
  // build summarization prompt
  const prompt = `Atualize a memória curta do usuário para um chatbot de companhia.\nMemória atual:\n${current || '(vazio)'}\n\nExtraia SOMENTE fatos estáveis e preferências do usuário com base nas últimas mensagens.\nRegras:\n- Máx 800 caracteres\n- Não inclua dados sensíveis (IDs, senhas, dinheiro, endereços)\n- Foque em preferências, apelidos, limites, rotinas\n- Escreva em PT-BR\n\nMensagens:\n${messages.slice(-12).map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}`;
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
        { role: 'system', content: prompt }
      ]
    })
  });
  if (!resp.ok) {
    const txt = await resp.text();
    return NextResponse.json({ error: txt }, { status: 500 });
  }
  const data = await resp.json();
  const updated: string = data.choices?.[0]?.message?.content?.trim() ?? current;
  await memRef.set({ summary: updated, updatedAt: Date.now() }, { merge: true });
  return NextResponse.json({ memory: updated });
}