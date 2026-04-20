import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import TrackedLink from "@/components/TrackedLink";
import EngagementTracker from "@/components/EngagementTracker";

const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL ?? "";
const VIDEO_POSTER = process.env.NEXT_PUBLIC_VIDEO_POSTER ?? "";
const CTA_KEYWORD = process.env.NEXT_PUBLIC_CTA_KEYWORD ?? "SÍ";
const CTA_NUMBER_DISPLAY =
  process.env.NEXT_PUBLIC_CTA_NUMBER ?? "55 0000 0000";
const CTA_NUMBER_RAW =
  process.env.NEXT_PUBLIC_CTA_NUMBER_RAW ??
  CTA_NUMBER_DISPLAY.replace(/\s+/g, "");
const SITE_URL = "manuelsolis.com";
const SITE_HREF = "https://manuelsolis.com";

export default function Home() {
  const smsHref = `sms:${CTA_NUMBER_RAW}?&body=${encodeURIComponent(CTA_KEYWORD)}`;

  return (
    <div className="relative flex min-h-dvh w-full justify-center bg-background">
      <EngagementTracker />

      <main className="relative z-10 flex w-full max-w-[430px] flex-col bg-background">
        {/* Navy header with logo */}
        <header className="relative overflow-hidden bg-[color:var(--color-navy)] px-6 pb-10 pt-12 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 0%, rgba(201,169,106,0.18) 0%, rgba(201,169,106,0) 70%)",
            }}
          />
          <div className="fade-up relative z-10 flex flex-col items-center">
            <Image
              src="/icon.png"
              alt="Law Offices of Manuel Solis"
              width={260}
              height={140}
              priority
              className="h-auto w-[220px]"
            />
            <p className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.36em] text-accent-soft">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Un mensaje para ti
            </p>
          </div>
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-hairline-on-dark)]"
          />
        </header>

        <section className="px-6">
          {/* Headline */}
          <div className="fade-up fade-up-1 mt-10 text-center">
            <h1
              className="text-balance font-display text-[38px] font-light leading-[1.08] tracking-tight text-[color:var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Estamos <em className="italic shimmer-gold">contigo</em>,
              <br />
              listos para tu caso.
            </h1>
            <p className="mx-auto mt-5 max-w-[320px] text-[15px] leading-relaxed text-muted">
              En{" "}
              <span className="font-medium text-[color:var(--color-navy)]">
                Law Offices of Manuel Solis
              </span>{" "}
              te escuchamos y te acompañamos en cada paso de tu caso.
            </p>
          </div>

          {/* Video centerpiece */}
          <div className="fade-up fade-up-2 mt-10">
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-accent"
              />
              <span
                aria-hidden
                className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-accent"
              />
              <span
                aria-hidden
                className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-accent"
              />
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-accent"
              />

              <div className="overflow-hidden rounded-[2px] bg-[color:var(--color-navy)] shadow-[0_30px_70px_-28px_rgba(10,31,61,0.35)] ring-1 ring-[color:var(--color-hairline)]">
                <div className="relative aspect-[9/16] w-full">
                  {VIDEO_URL ? (
                    <VideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#0a1f3d] to-[#06152a] text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-black/30">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5 translate-x-[1px] text-accent"
                        >
                          <path
                            d="M8 5.5v13l11-6.5L8 5.5z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className="px-8 text-xs uppercase tracking-[0.28em] text-accent-soft">
                        Video en preparación
                      </p>
                      <p className="px-10 text-[11px] leading-relaxed text-accent-soft/70">
                        Configura{" "}
                        <code className="font-mono text-[10px]">
                          NEXT_PUBLIC_VIDEO_URL
                        </code>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-muted">
              · Reproduce con sonido ·
            </p>
          </div>

          {/* Reassurance */}
          <div className="fade-up fade-up-3 mt-12 text-center">
            <p
              className="font-display text-[22px] font-light italic leading-[1.35] text-[color:var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              “No estás solo. Estamos aquí para ti.”
            </p>
            <p className="mt-3 text-[12px] uppercase tracking-[0.32em] text-accent">
              Manuel Solis
            </p>
          </div>

          {/* Text-only CTA */}
          <div className="fade-up fade-up-4 mt-12 text-center">
            <div
              aria-hidden
              className="mx-auto mb-8 h-px w-16 bg-[color:var(--color-hairline)]"
            />
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted">
              Para hablar con nosotros
            </p>

            <p
              className="mt-6 font-display text-[22px] font-light leading-[1.35] text-[color:var(--color-navy)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Responde la palabra
            </p>
            <p
              className="mt-3 font-display text-[60px] font-light italic leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="shimmer-gold">{CTA_KEYWORD}</span>
            </p>
            <p
              className="mt-5 font-display text-[18px] font-light leading-[1.4] text-[color:var(--color-navy)]/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              por mensaje de texto al
            </p>
            <TrackedLink
              event="cta_sms_click"
              properties={{ number: CTA_NUMBER_RAW, keyword: CTA_KEYWORD }}
              href={smsHref}
              className="mt-2 inline-block font-mono text-[20px] tracking-[0.14em] text-[color:var(--color-navy)] no-underline transition-opacity hover:opacity-80 active:opacity-60"
            >
              {CTA_NUMBER_DISPLAY}
            </TrackedLink>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-[color:var(--color-hairline)]"
              />
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted">
                o visita
              </span>
              <span
                aria-hidden
                className="h-px w-8 bg-[color:var(--color-hairline)]"
              />
            </div>

            <TrackedLink
              event="cta_website_click"
              properties={{ destination: SITE_HREF, location: "cta" }}
              href={SITE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-display text-[28px] font-light tracking-tight text-[color:var(--color-navy)] no-underline transition-opacity hover:opacity-80 active:opacity-60"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="shimmer-gold">{SITE_URL}</span>
            </TrackedLink>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Tu caso nos importa.
              <br />
              Estamos listos para atenderte hoy.
            </p>
          </div>
        </section>

        {/* Navy footer */}
        <footer className="fade-up fade-up-5 mt-14 bg-[color:var(--color-navy)] px-6 py-10 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-accent-soft">
            Law Offices of
          </p>
          <p
            className="mt-2 font-display text-[22px] font-light tracking-[0.18em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MANUEL SOLIS
          </p>
          <div
            aria-hidden
            className="mx-auto my-5 h-px w-12 bg-[color:var(--color-hairline-on-dark)]"
          />
          <TrackedLink
            event="cta_website_click"
            properties={{ destination: SITE_HREF, location: "footer" }}
            href={SITE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] leading-relaxed text-white/70 no-underline"
          >
            {SITE_URL}
          </TrackedLink>
          <p className="mx-auto mt-4 max-w-[300px] text-[10px] leading-relaxed text-white/40">
            Este mensaje fue enviado únicamente a ti. Aplican tarifas estándar
            de mensajería. La información aquí no constituye asesoría legal.
          </p>
        </footer>
      </main>
    </div>
  );
}
