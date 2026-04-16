interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      <p className="section-tag">{eyebrow}</p>
      <div className="space-y-3">
        <h2 className="section-title">{title}</h2>
        <p className={`section-copy ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      </div>
    </div>
  );
}
