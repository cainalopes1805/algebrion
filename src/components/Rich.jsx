// Renderiza **negrito** e quebras de linha simples
export default function Rich({ text, className = '' }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <b key={i} className="text-accent2 font-black">{p.slice(2, -2)}</b>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}
