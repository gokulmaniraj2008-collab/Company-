interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-crimson-600/30 bg-crimson-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-crimson-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-ink-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
