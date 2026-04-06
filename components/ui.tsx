import Link from "next/link";
import type { PropsWithChildren } from "react";

export function Container({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className={`text-4xl font-black tracking-tight md:text-6xl ${invert ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-lg leading-8 ${invert ? "text-white/75" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-[2rem] border border-line bg-white shadow-soft ${className}`}>{children}</div>;
}

export function DarkCard({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur ${className}`}>{children}</div>;
}

export function PrimaryButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-glow transition hover:opacity-95"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
