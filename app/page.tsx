export default function Home() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Aurora AI</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Your private virtual companion. Warm conversations, gentle romance, memory and presence — made just for you.
      </p>
      <a href="/pricing" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#0070f3', color: '#fff', borderRadius: '8px' }}>
        Start free for 30 days
      </a>
    </main>
  );
}