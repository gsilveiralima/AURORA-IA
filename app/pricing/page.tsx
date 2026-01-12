export default function Pricing() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Pricing</h1>
      <p style={{ marginBottom: '1rem' }}>
        Choose the plan that works for you. All plans include a 30-day free trial. Cancel anytime.
      </p>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
          <h2>Free</h2>
          <ul>
            <li>Limited messages per day</li>
            <li>Basic chat modes</li>
            <li>No memory</li>
          </ul>
        </div>
        <div style={{ flex: '1 1 250px', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
          <h2>Premium</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$3.99/mo</p>
          <ul>
            <li>Unlimited chat</li>
            <li>Memory enabled</li>
            <li>All conversation modes</li>
            <li>Priority access to new features</li>
          </ul>
        </div>
      </div>
    </main>
  );
}