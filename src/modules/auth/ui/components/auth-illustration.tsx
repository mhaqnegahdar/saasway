interface AuthIllustrationProps {
  emoji: string;
  title: string;
  description: string;
}

export default function AuthIllustration({
  emoji,
  title,
  description,
}: AuthIllustrationProps) {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-accent to-secondary/10 items-center justify-center p-12">
      <div className="max-w-md space-y-6 text-center">
        <div className="text-6xl mb-8">{emoji}</div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
