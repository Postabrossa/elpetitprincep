import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import { collectionSections } from "@/lib/collection-sections";
import { specialBooks } from "@/lib/special-books";
import { doubles } from "@/lib/doubles";

const homepageSections = [
  { code: "B-325", title: "LA MEVA COL·LECCIÓ", subtitle: "My collection", detail: "Idiomes / Languages", href: "/collection" },
  { code: "B-326", title: "LLIBRES RECENTS", subtitle: "My latest books", detail: "Recents / Latest", href: "/recents/2026" },
  { code: "B-327", title: "DOBLES", subtitle: "My doubles", detail: "Dobles per intercanviar / Doubles for exchange", href: "/doubles" },
  { code: "B-328", title: "LLIBRES BUSCATS", subtitle: "Wishlist", detail: "Buriat /Buryat · Turcman Ciríl·lic /Tukmen Cyrillic", href: "/wishlist" },
  { code: "B-329", title: "CONTACTE", subtitle: "Contact", detail: "Josep (Barcelona, Spain)", href: "/contact" },
  { code: "B-330", title: "LLIBRES ESPECIALS", subtitle: "Special books", detail: "El Principito", href: "/special" },
];

function StarIcon({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6l-6.2 4.1 2-7.2L2 8.9l7.4-.3z" /></svg>;
}

const starPositions = [
  { top: "12%", left: "8%", size: 10, delay: "0s" }, { top: "22%", left: "42%", size: 7, delay: "1.2s" },
  { top: "8%", left: "68%", size: 12, delay: "0.6s" }, { top: "35%", left: "88%", size: 8, delay: "2s" },
  { top: "64%", left: "6%", size: 7, delay: "1.6s" }, { top: "78%", left: "36%", size: 9, delay: "0.3s" },
  { top: "55%", left: "58%", size: 6, delay: "2.4s" }, { top: "84%", left: "80%", size: 11, delay: "1s" },
  { top: "44%", left: "24%", size: 5, delay: "2.8s" },
];

export function StarField({ footer = false }: { footer?: boolean }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${footer ? "opacity-70" : ""}`}>{starPositions.map((star) => <svg key={`${star.top}-${star.left}`} viewBox="0 0 24 24" aria-hidden="true" className="twinkle text-yellow absolute" style={{ top: star.top, left: star.left, width: star.size, height: star.size, animationDelay: star.delay }} fill="currentColor"><path d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6l-6.2 4.1 2-7.2L2 8.9l7.4-.3z" /></svg>)}</div>;
}

export function FoxIllustration() {
  return <img src="/collection-assets/home/fox.svg" alt="" className="sway h-28 w-auto" />;
}

function SectionHeroIllustration({ className = "" }: { className?: string }) {
  return <img aria-hidden="true" src="/collection-assets/home/planet-cutout.png" alt="" className={`pointer-events-none object-contain ${className}`} />;
}

function PlanetIllustration() {
  return <img src="/collection-assets/home/planet-cutout.png" alt="" className="absolute -right-6 -bottom-8 h-28 w-auto opacity-25 saturate-50 transition duration-300 group-hover:rotate-6 group-hover:opacity-100 group-hover:saturate-100" />;
}

function RoseIllustration() {
  return <img src="/collection-assets/home/rose-cutout.png" alt="" className="absolute -top-10 -right-3 h-32 w-auto rotate-[8deg]" />;
}

const recentCounts: Record<number, number> = { 2020: 75, 2021: 139, 2022: 93, 2023: 86, 2024: 143, 2025: 79, 2026: 78 };

function SectionHero({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return <section className="starry relative isolate overflow-hidden text-white">
    <StarField />
    <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
    <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />{kicker}</p>
      <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">{title}</h1>
      <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">{subtitle}</p>
    </div>
    <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 10 480 0 720 14 C960 28 1200 30 1440 8 L1440 40Z" fill="currentColor" /></svg>
  </section>;
}

function BookPreview({ image, title, onClose }: { image: string; title: string; onClose: () => void }) {
  return <div className="book-preview-backdrop" role="presentation" onClick={onClose}><div className="book-preview" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><button className="preview-close" type="button" aria-label="Tanca" onClick={onClose}><IconX size={19} /></button><img src={image} alt={title} /><span>{title}</span></div></div>;
}

export function HomePage() {
  const recentCovers = Array.from({ length: 12 }, (_, index) => `/collection-assets/home/editions/${String(index + 2).padStart(2, "0")}.webp`);
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1360px] items-center gap-14 px-5 pt-16 pb-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pt-20 lg:pb-32">
        <div className="max-w-3xl">
          <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Col·lecció de llibres</p>
          <h1 className="font-display mt-6 max-w-3xl text-6xl leading-[0.92] font-semibold tracking-[-0.02em] sm:text-8xl lg:text-[7.4rem]">El Petit Príncep</h1>
          <p className="font-hand text-yellow mt-4 text-4xl sm:text-5xl">The Little Prince</p>
          <p className="mt-8 max-w-md text-lg leading-8 text-white/85">Col·lecció en diferents idiomes<span className="font-display mt-1 block text-xl text-white/65 italic">Collection in different languages</span></p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link className="bg-yellow text-night inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-[0_0_30px_rgba(242,193,78,0.35)] transition hover:bg-white" to="/collection"><StarIcon className="h-4 w-4" />La meva col·lecció</Link>
            <a className="hover:text-yellow hover:border-yellow inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition" href="#archive">Explora / Explore<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg></a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[32rem] lg:ml-auto">
          <div className="bg-yellow/20 absolute -inset-10 rounded-full blur-3xl" />
          <div className="drift ring-yellow/40 relative aspect-square overflow-hidden rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-4"><img alt="El Petit Príncep al seu planeta" className="absolute inset-0 h-full w-full object-cover" src="https://cdn.builder.io/api/v1/image/assets%2F645fb30e9e9b40a7a07ff1db19df68d4%2F45a6ea1bc5c54cf584139cc7b3cea7ee?format=webp&width=800&height=1200" /></div>
          <div className="border-line absolute -bottom-6 -left-2 w-28 rotate-[-6deg] rounded-lg border-4 border-white bg-white shadow-2xl sm:w-36"><img alt="El Principito, el meu primer Petit Príncep" className="h-auto w-full rounded" loading="lazy" src="/collection-assets/home/editions/01.webp" /></div>
          <p className="font-hand text-yellow absolute -right-2 -bottom-8 rotate-[-4deg] text-2xl">Josep · Barcelona</p>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-10 w-full sm:h-16"><path d="M0 60 C240 20 480 0 720 18 C960 36 1200 40 1440 10 L1440 60Z" fill="currentColor" /></svg>
    </section>
    <section id="archive" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />El Petit Príncep / The Little Prince</p>
            <h2 className="font-display mt-5 max-w-xl text-4xl leading-tight font-semibold sm:text-6xl">Col·lecció en diferents idiomes</h2>
            <p className="font-hand text-blue mt-4 text-3xl">Collection in different languages</p>
            <div className="border-line relative mt-10 rounded-3xl border bg-white/70 p-7 shadow-[0_10px_30px_rgba(27,42,74,0.07)]">
              <RoseIllustration />
              <dl className="grid gap-5"><div><dt className="font-display text-blue text-5xl font-semibold">1779</dt><dd className="text-ink-soft text-sm">Llibres / Books</dd></div><div><dt className="font-display text-blue text-5xl font-semibold">688</dt><dd className="text-ink-soft text-sm">Idiomes (reals i artificials)</dd></div><div className="border-line border-t pt-4 text-sm">22 transcripcions, 8 adaptacions i més...</div></dl>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {homepageSections.map((section) => <Link className="group border-line relative overflow-hidden rounded-3xl border bg-white/80 p-7 shadow-[0_6px_20px_rgba(27,42,74,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,42,74,0.14)]" key={section.code} to={section.href}>
              <PlanetIllustration />
              <div className="flex items-start justify-between gap-4"><span className="bg-night text-yellow inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.12em]"><StarIcon className="h-2.5 w-2.5" />{section.code}</span><svg className="text-blue transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></div>
              <h3 className="text-ink mt-8 text-sm font-extrabold tracking-[0.12em] uppercase">{section.title}</h3><p className="font-hand text-blue mt-1 text-2xl">{section.subtitle}</p><p className="text-ink-soft relative mt-5 text-xs leading-5">{section.detail}</p>
            </Link>)}
          </div>
        </div>
        <div className="mt-20 flex items-center justify-center gap-3 text-gold"><span className="bg-line h-px w-16" /><StarIcon className="h-3 w-3" /><StarIcon className="h-4 w-4" /><StarIcon className="h-3 w-3" /><span className="bg-line h-px w-16" /></div>
      </div>
    </section>
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Recents / Latest</p><h2 className="font-display mt-4 text-4xl font-semibold sm:text-6xl">Llibres recents</h2></div><Link className="group text-blue decoration-blue/30 hover:decoration-blue inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4" to="/recents/2026">Darreres incorporacions / My latest books<IconArrowRight size={16} /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{recentCovers.map((image) => <Link className="group border-line block overflow-hidden rounded-xl border bg-white p-2 shadow-[0_6px_18px_rgba(27,42,74,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:shadow-[0_14px_30px_rgba(27,42,74,0.16)]" key={image} to="/recents/2026"><img alt="El Petit Príncep" loading="lazy" width="640" height="860" className="h-full min-h-48 w-full rounded-lg object-cover" src={image} /></Link>)}</div>
      </div>
    </section>
  </>;
}

export function CollectionPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim().toLocaleLowerCase("ca");
  const filteredCount = collectionSections.catala.reduce((total, section) => total + section.items.filter((item) => item.name.toLocaleLowerCase("ca").includes(query)).length, 0) + collectionSections.english.reduce((total, section) => total + section.items.filter((item) => item.name.toLocaleLowerCase("ca").includes(query)).length, 0);
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
      <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />El Petit Príncep / The Little Prince</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">La meva col·lecció</h1>
        <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">My collection</p>
        <p className="mt-6 text-lg text-white/90">1779 Llibres / Books - Actualitzat / Updated: 8/10/2026</p>
        <div className="mt-3 grid gap-1 text-sm text-white/75"><p>688 Idiomes (reals i artificials)</p><p>688 Languages (real &amp; constructed)</p><p>22 transcripcions, 8 adaptacions i més...</p><p>22 Transcripts, 8 adaptations and more...</p></div>
        <div className="mt-8 flex flex-wrap gap-3 [&_a]:no-underline"><a className="bg-yellow !text-night rounded-full px-5 py-2.5 text-sm font-bold" href="#catala">Idiomes (en català)</a><a className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold !text-white" href="#english">Languages (in English)</a></div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 15 480 0 720 12 C960 24 1200 25 1440 5 L1440 40Z" fill="currentColor" /></svg>
    </section>
    <section id="catala" className="scroll-mt-24 px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1360px]">{collectionSections.catala.map((section) => {
        const items = query ? section.items.filter((item) => item.name.toLocaleLowerCase("ca").includes(query)) : section.items;
        if (!items.length) return null;
        return <div className="mt-12 first:mt-0" key={section.title}>
          <h3 className="font-display text-ink flex items-center gap-3 text-3xl font-semibold"><StarIcon className="text-gold h-4 w-4" />{section.title}<span className="text-ink-soft font-sans text-sm font-normal">({query ? items.length : section.count})</span></h3><ul className="mt-5 gap-x-8 sm:columns-2 lg:columns-3 xl:columns-4">{items.map((item) => <li className="break-inside-avoid" key={item.name}><Link className="hover:bg-paper-deep hover:text-blue flex items-start gap-3 rounded-lg px-2 py-1.5 text-sm leading-5 transition-colors" to={`/collection?q=${encodeURIComponent(item.name)}`}><span>{item.name}</span><span className="bg-sky text-blue ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold">{item.count}</span></Link></li>)}</ul>
        </div>;
      })}</div>
    </section>
    <section id="english" className="bg-paper-deep/60 border-line scroll-mt-24 border-t px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1360px]">{collectionSections.english.map((section) => {
        const items = query ? section.items.filter((item) => item.name.toLocaleLowerCase("ca").includes(query)) : section.items;
        if (!items.length) return null;
        return <div className="mt-12 first:mt-0" key={section.title}>
          <h3 className="font-display text-ink flex items-center gap-3 text-3xl font-semibold"><StarIcon className="text-gold h-4 w-4" />{section.title}<span className="text-ink-soft font-sans text-sm font-normal">({query ? items.length : section.count})</span></h3><ul className="mt-5 gap-x-8 sm:columns-2 lg:columns-3 xl:columns-4">{items.map((item) => <li className="break-inside-avoid" key={item.name}><Link className="hover:bg-paper-deep hover:text-blue flex items-start gap-3 rounded-lg px-2 py-1.5 text-sm leading-5 transition-colors" to={`/collection?q=${encodeURIComponent(item.name)}`}><span>{item.name}</span><span className="bg-sky text-blue ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold">{item.count}</span></Link></li>)}</ul>
        </div>;
      })}</div>
    </section>
    {query && filteredCount === 0 && <p className="mx-auto max-w-[1360px] px-5 py-10 text-sm text-ink-soft sm:px-8 lg:px-12">No s’han trobat edicions amb «{params.get("q")}».</p>}
  </>;
}

export function RecentPage() {
  const { year: yearParam } = useParams();
  const year = Number(yearParam);
  const validYear = year in recentCounts;
  const [preview, setPreview] = useState<number | null>(null);
  const imageUrl = (index: number) => `/collection-assets/recents/${year}/${String(index + 1).padStart(2, "0")}.webp`;
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
      <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Recents / Latest</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">{year === 2026 ? "Llibres recents" : validYear ? `Llibres del ${year}` : "Any no disponible"}</h1>
        <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">Latest books</p>
        <div className="mt-8 flex flex-wrap gap-2 [&_a]:no-underline">{[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((item) => <Link className={`rounded-full px-4 py-2 text-sm font-bold ${item === year ? "bg-yellow !text-night" : "border border-white/30 !text-white"}`} key={item} to={`/recents/${item}`}>{item}</Link>)}</div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 10 480 0 720 14 C960 28 1200 30 1440 8 L1440 40Z" fill="currentColor" /></svg>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1360px]"><div className="grid gap-12">
      {year === 2026 && <div className="grid gap-4"><div aria-hidden="true" className="text-gold flex justify-center"><StarIcon className="h-4 w-4" /></div><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-ink mt-6 text-3xl font-semibold first:mt-0"><span>2026</span></h2></div></div>}
      {validYear ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{Array.from({ length: recentCounts[year] }, (_, index) => <button className="border-line rounded-xl border bg-white p-2 text-left shadow-[0_6px_18px_rgba(27,42,74,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]" key={index} type="button" onClick={() => setPreview(index)} aria-label={`Amplia la coberta ${index + 1}, ${year}`}><img alt="El Petit Príncep" loading="lazy" width="600" height="820" className="h-auto w-full rounded-md" src={imageUrl(index)} /></button>)}</div> : <p className="section-empty">No hi ha una pàgina disponible per a aquest any.</p>}
    </div></div></section>
    {preview !== null && <BookPreview image={imageUrl(preview)} title={`Edició del Petit Príncep · ${year}`} onClose={() => setPreview(null)} />}
  </>;
}

export function SpecialPage() {
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
      <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Llibres especials / Special books</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">Llibres especials</h1>
        <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">Special books</p>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 10 480 0 720 14 C960 28 1200 30 1440 8 L1440 40Z" fill="currentColor" /></svg>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1360px]"><div className="grid gap-12"><div className="grid gap-6 xl:grid-cols-2">
      {specialBooks.map((book) => <article id={book.title === "El Principito" ? "llibre-0" : undefined} className="border-line grid scroll-mt-28 gap-5 rounded-3xl border bg-white/85 p-5 shadow-[0_6px_20px_rgba(27,42,74,0.06)] sm:grid-cols-[11rem_1fr] sm:p-6" key={book.title}>
        <div className="grid gap-3"><div className="border-line rounded-lg border bg-white p-1.5 shadow-sm"><Link to={`/collection?q=${encodeURIComponent(book.language)}`}><img alt={book.title} loading="lazy" width="600" height="820" className="h-auto w-full rounded-md" src={`/collection-assets/special/${book.image}`} /></Link></div></div>
        <div className="min-w-0"><h2 className="font-display text-ink mb-2 text-2xl leading-tight font-semibold break-words">{book.title}</h2><p className="text-ink py-1.5 text-sm leading-6 font-semibold">{book.text}</p><p className="text-ink py-1.5 text-sm leading-6 font-semibold">{book.english}</p></div>
      </article>)}
    </div><div className="grid gap-4"><div aria-hidden="true" className="text-gold flex justify-center"><StarIcon className="h-4 w-4" /></div><div className="mx-auto max-w-3xl text-center"><p className="text-ink mt-3 text-base leading-7"><a href="https://drive.google.com/file/d/12-MofWXNQralPSXQA6iS2qYwQ0zND5cx/view" target="_blank" rel="noreferrer" className="text-blue decoration-blue/30 hover:decoration-blue font-semibold underline underline-offset-4">Aquí podeu veure'l en moviment ➠</a></p><p className="text-ink mt-3 text-base leading-7"><a href="https://drive.google.com/file/d/12-MofWXNQralPSXQA6iS2qYwQ0zND5cx/view" target="_blank" rel="noreferrer" className="text-blue decoration-blue/30 hover:decoration-blue font-semibold underline underline-offset-4">Here you can see it in motion ➠</a></p></div></div></div></div></section>
  </>;
}

export function WishlistPage() {
  const images = ["6fc602cf6f63927c_ny_3.webp", "22391261d9d832e7_ny_3.webp"];
  const [preview, setPreview] = useState<number | null>(null);
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
      <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Llibres buscats / Wishlist</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">Llibres buscats</h1>
        <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">Wishlist</p>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 10 480 0 720 14 C960 28 1200 30 1440 8 L1440 40Z" fill="currentColor" /></svg>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1360px]"><div className="grid gap-12"><div className="grid gap-4"><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{images.map((image, index) => <button className="border-line rounded-xl border bg-white p-2 text-left shadow-[0_6px_18px_rgba(27,42,74,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]" type="button" key={image} onClick={() => setPreview(index)} aria-label={`Amplia la coberta ${index + 1}`}><img alt="El Petit Príncep" loading="lazy" width="600" height="820" className="h-auto w-full rounded-md" src={`/collection-assets/wishlist/${image}`} /></button>)}</div></div></div></div></section>
    {preview !== null && <BookPreview image={`/collection-assets/wishlist/${images[preview]}`} title="Edició buscada del Petit Príncep" onClose={() => setPreview(null)} />}
  </>;
}

export function DoublesPage() {
  const renderCovers = (covers: readonly { title: string; image: string; query: string }[]) => <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{covers.map((cover) => <div className="border-line rounded-xl border bg-white p-2 shadow-[0_6px_18px_rgba(27,42,74,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]" key={cover.image}><Link to={`/collection?q=${encodeURIComponent(cover.query)}`}><img alt={cover.title} loading="lazy" width="600" height="820" className="h-auto w-full rounded-md" src={`/collection-assets/doubles/${cover.image}`} /></Link><p className="text-ink-soft mt-2 px-1 pb-1 text-center text-sm leading-snug">{cover.title}</p></div>)}</div>;
  return <>
    <section className="starry relative isolate overflow-hidden text-white">
      <StarField />
      <SectionHeroIllustration className="absolute top-1/2 right-2 z-0 h-20 w-auto -translate-y-1/2 sm:right-[6%] sm:h-32 md:h-44 lg:h-56" />
      <div className="[&_a]:text-yellow [&_a]:decoration-yellow/40 relative z-10 mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />Dobles / Doubles</p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.02em] sm:text-7xl">Dobles per intercanviar</h1>
        <p className="font-hand text-yellow mt-4 max-w-2xl text-3xl">Doubles for exchange</p>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="text-paper absolute bottom-0 left-0 h-6 w-full sm:h-10"><path d="M0 40 C240 10 480 0 720 14 C960 28 1200 30 1440 8 L1440 40Z" fill="currentColor" /></svg>
    </section>
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1360px]"><div className="grid gap-12">
      <div className="grid gap-4"><div aria-hidden="true" className="text-gold flex justify-center"><StarIcon className="h-4 w-4" /></div><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-ink mt-6 text-3xl font-semibold first:mt-0">Si teniu el Buriat, el turcman ciríl·lic o alguna primera edició interessant... parleu amb mi, potser tinc altres llibres repetits que us podrien interessar.</h2><h2 className="font-display text-ink mt-6 text-3xl font-semibold first:mt-0">If you have the Buryat, the Cyrillic Turkmen or some interesting first edition ... talk to me, maybe i have other doubles that might interest you.</h2></div></div>
      <div className="grid gap-4">{renderCovers(doubles.regular)}</div>
      <div className="grid gap-4"><div aria-hidden="true" className="text-gold flex justify-center"><StarIcon className="h-4 w-4" /></div><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-ink mt-6 text-3xl font-semibold first:mt-0">Llibres per a intercanvis especials / Special Exchange Books :</h2></div></div>
      <div className="grid gap-4">{renderCovers(doubles.special)}</div>
    </div></div></section>
  </>;
}

const nearbyCollectors = [
  { name: "Anna Rodríguez", href: "https://www.instagram.com/b612collection/" },
  { name: "Jordi Villalba", href: "https://www.instagram.com/jordivillalba/" },
  { name: "Mertxe Ibáñez", href: "http://mislibrosdeelprincipito.blogspot.com/" },
  { name: "Julian Blanco", href: "http://www.elprincipito.es/" },
  { name: "Jordi Riera", href: "https://sites.google.com/view/beacesplenes" },
  { name: "Nuri", href: "https://www.petitsprinceps.cat/benvinguts" },
  { name: "Jaume", href: "https://www.auquicu.com/" },
] as const;

const internationalCollectors = [
  { name: "Rosa Maxit", location: "Argentina / Argentina", href: "https://www.facebook.com/pg/El-Principito-colecci%C3%B3n-de-libros-del-Centro-Saboyano-de-San-Jos%C3%A9-235991173235901/photos/?ref=page_internal" },
  { name: "Gerhard R. Volz", location: "Àustria / Austria", href: "http://www.petit-prince.at/" },
  { name: "Patrick Baert", location: "Brussel·les / Brussels", href: "https://www.leslanguesdupetitprince.net/" },
  { name: "Marina Kotarac", location: "Eslovènia / Slovenia", href: "https://marinakotarac.github.io/" },
  { name: "Patrick Tourreau", location: "França / France", href: "http://www.patoche.org/lepetitprince/" },
  { name: "Dominique Durozier", location: "França / France", href: "http://lepetitprince.eu.com/collection_du_Petit_Prince/Bienvenue.html" },
  { name: "Kuncoro Wastuwibowo", location: "Indonèsia / Indonesia", href: "https://pangerankecil.com/" },
  { name: "Anna K. Chiti", location: "Itàlia / Italy", href: "https://annaslittleprincecollection.com/" },
  { name: "Antonio Fragomeni", location: "Itàlia /Italy", href: "http://principito.fragomeni.it/collezione/collezione.php?lang=es" },
  { name: "Estefanía Sierra", location: "Mèxic / Mexico", href: "http://sierrazanella.wixsite.com/principito" },
  { name: "Andries Brouwer", location: "Països Baixos / Netherlands", href: "http://homepages.cwi.nl/~aeb/prive/tlp/tlp.html" },
  { name: "Ferenc Csorba", location: "Països Baixos / Netherlands", href: "https://csorba-ferenc.com/" },
  { name: "Krzysiek Maciejewski", location: "Polònia / Poland", href: "https://malyksiaze.net/en" },
  { name: "Mehmet Sobaci", location: "Turquia / Turkey", href: "http://www.mehmetsobaci.com/1-english-list/" },
  { name: "Oytun Eriş", location: "Turquia / Turkey", href: "https://oytuneris.wixsite.com/littleprince?fbclid=IwAR2Q6fVq5euPR4AFgPZwIfF2sxcUbWAjebGlUKuqKcTnhnNOhZNg1cVa6uQ" },
  { name: "Yildiray Lise", location: "Turquia / Turkey", href: "https://yildiraylise.wordpress.com/kucukprens/" },
] as const;

export function ContactPage() {
  return <>
    <SectionHero kicker="Contacte / Contact" title="Contacte" subtitle="Contact" />
    <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[420px]"><img alt="El Petit Príncep / The Little Prince" loading="lazy" width="375" height="322" className="h-auto w-full mix-blend-multiply" src="/collection-assets/contact/contact-prince.png" /></div>
        <div>
          <p className="text-gold flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"><StarIcon className="h-3 w-3 shrink-0" />EL PETIT PRÍNCEP / THE LITTLE PRINCE</p>
          <div className="mt-7 grid gap-6 text-base leading-8">
            <p>El Petit Príncep (en francès, Le Petit Prince) és l’obra més coneguda d’Antoine de Saint-Exupéry. Publicat el 1943 a Nova York, és un conte poètic i filosòfic sota l’aparença d’un conte per a nens. Degut al seu èxit, l’obra ha esdevingut un dels llibres més traduïts al món.</p>
            <p>Jo col·lecciono aquestes traduccions…</p>
            <p className="text-ink-soft italic">The Little Prince (in French, Le Petit Prince) is the best-known work of Antoine de Saint-Exupéry. Published in 1943 in New York, it is a poetic and philosophical tale in the guise of a children's tale. Due to its success, the book has become one of the most translated books in the world.</p>
            <p className="text-ink-soft italic">I collect these translations ...</p>
          </div>
          <div className="border-line mt-10 border-t pt-6">
            <p className="text-ink-soft text-sm">Si tens alguna suggerència pots escriure a / If you have any suggestions you can write to:</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold">
              <a className="text-blue decoration-blue/30 hover:decoration-blue underline underline-offset-4" href="mailto:idiomes.del.petit.princep@gmail.com">idiomes.del.petit.princep@gmail.com</a>
              <a className="text-blue decoration-blue/30 hover:decoration-blue underline underline-offset-4" href="mailto:littleprincecollection@gmail.com">littleprincecollection@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}

export function CollectorsPage() {
  return <>
    <SectionHero kicker="Altres col·leccionistes / Other collectors" title="Altres Col·leccionistes" subtitle="Other Collectors" />
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1360px]"><div className="grid gap-12">
        <div className="grid gap-4">
          <div aria-hidden="true" className="text-gold flex justify-center"><StarIcon className="h-4 w-4" /></div>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-ink mt-3 text-base leading-7">COL·LECCIONISTES PROPERS / CLOSE COLLECTORS:</p>
            {nearbyCollectors.map((collector) => <p className="text-ink mt-3 text-base leading-7" key={collector.name}><a className="text-blue decoration-blue/30 hover:decoration-blue font-semibold underline underline-offset-4" href={collector.href} target="_blank" rel="noreferrer">{collector.name}</a></p>)}
            <p className="text-ink mt-3 text-base leading-7">COL·LECCIONISTES D&apos;ALTRES PAÏSOS / COLLECTORS FROM OTHER COUNTRIES:</p>
            {internationalCollectors.map((collector) => <p className="text-ink mt-3 text-base leading-7" key={collector.name}><a className="text-blue decoration-blue/30 hover:decoration-blue font-semibold underline underline-offset-4" href={collector.href} target="_blank" rel="noreferrer">{collector.name}</a> ({collector.location})</p>)}
            <p className="text-ink mt-3 text-base leading-7">LA COL·LECCIÓ MÉS GRAN / THE LARGEST COLLECTION:</p>
            <p className="text-ink mt-3 text-base leading-7"><a className="text-blue decoration-blue/30 hover:decoration-blue font-semibold underline underline-offset-4" href="http://www.petit-prince-collection.com/lang/collection.php?lang=es" target="_blank" rel="noreferrer">Jean Marc Probst</a> (Suïssa / Switzerland)</p>
          </div>
        </div>
      </div></div>
    </section>
  </>;
}
