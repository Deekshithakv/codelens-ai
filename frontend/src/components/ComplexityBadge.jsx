export default function ComplexityBadge({ text }) {
  return (
    <div style={{ padding: 15 }}>
      <h3>Complexity Analysis</h3>
      <pre>{text}</pre>
    </div>
  );
}