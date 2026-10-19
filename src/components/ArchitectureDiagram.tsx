// Layered stack diagram for projects without public screenshots. Shows the documented
// architecture only; it is not a picture of the interface.

export function ArchitectureDiagram({
  layers,
  label = "Documented architecture",
}: {
  layers: { layer: string; items: string[] }[];
  label?: string;
}) {
  return (
    <figure className="font-mono text-xs">
      <figcaption className="mb-4 text-[11px] uppercase tracking-[0.16em] text-subtle">{label}</figcaption>
      <ol className="space-y-0">
        {layers.map((layer, i) => (
          <li key={layer.layer}>
            <div className="rounded-lg border border-line-strong bg-bg/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-accent-soft">{layer.layer}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <li key={item} className="rounded border border-line px-2 py-1 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div aria-hidden="true" className="ml-6 flex h-6 items-center">
                <span className="h-full w-px bg-line-strong" />
                <span className="ml-3 text-[10px] text-subtle">{i === 0 ? "HTTP" : "SQL"}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
