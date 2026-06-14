export default function ExplanationPanel({ text }) {
  return (
    <div style={{ padding: 15 }}>
      <h3>Explanation</h3>
      <pre>{text}</pre>
    </div>
  );
}