export default function SecurityWarnings({ text }) {
  return (
    <div style={{ padding: 15 }}>
      <h3>Security Scan</h3>
      <pre>{text}</pre>
    </div>
  );
}