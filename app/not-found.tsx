import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center px-6">
      <div className="relative brackets px-10 py-12">
        <div className="mono-label mb-4">Error 404</div>
        <h1
          className="font-display font-extrabold tracking-tight leading-none"
          style={{ fontSize: "clamp(72px, 18vw, 200px)", color: "var(--ink)" }}
        >
          404
        </h1>
        <p
          className="font-sans mt-6 max-w-sm mx-auto leading-relaxed"
          style={{ color: "var(--muted)", fontSize: "15px" }}
        >
          This page doesn&rsquo;t exist — or it moved. Let&rsquo;s get you back to
          something real.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
          <Link href="/" className="btn btn-primary">
            Back home
            <span className="btn-icon">→</span>
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            See the projects
            <span className="btn-icon">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
