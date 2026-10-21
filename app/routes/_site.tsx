import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { IconSearch } from "@tabler/icons-react";
import { FoxIllustration, StarField } from "@/components/collection-pages";

const navigation = [
  { label: "Inici", mobile: "Inici / Home", to: "/" },
  { label: "Col·lecció", mobile: "La meva col·lecció / My collection", to: "/collection" },
  { label: "Recents", mobile: "Recents / Latest", to: "/recents/2026" },
  { label: "Especials", mobile: "Llibres especials / Special books", to: "/special" },
  { label: "Buscats", mobile: "Llibres buscats / Wishlist", to: "/wishlist" },
  { label: "Dobles", mobile: "Dobles / Doubles", to: "/doubles" },
  { label: "Col·leccionistes", mobile: "Altres col·leccionistes / Other collectors", to: "/collectors" },
  { label: "Contacte", mobile: "Contacte / Contact", to: "/contact" },
];

const quotePairs = [
  { ca: "Tothom té estrelles, però no són les mateixes per a tothom.", en: "All men have the stars, but they are not the same things for different people." },
  { ca: "Si us plau… dibuixa’m un xai!", en: "If you please — draw me a sheep!" },
  { ca: "Els homes ja no tenen temps de conèixer res. Compren les coses fetes a les botigues.", en: "Men have no more time to understand anything. They buy things all ready made at the shops." },
  { ca: "Totes les persones grans han estat primer infants. (Però poques se’n recorden.)", en: "All grown-ups were once children — although few of them remember it." },
  { ca: "Quan un està molt trist, li agraden les postes de sol.", en: "One loves the sunset, when one is so sad." },
  { ca: "He de suportar dues o tres erugues si vull conèixer les papallones.", en: "I must endure the presence of two or three caterpillars if I wish to become acquainted with the butterflies." },
  { ca: "S’ha d’exigir a cadascú el que cadascú pot donar.", en: "One must require from each one the duty which each one can perform." },
  { ca: "Les estrelles són boniques per una flor que no es veu.", en: "The stars are beautiful, because of a flower that cannot be seen." },
  { ca: "Et tornes responsable per sempre del que has domesticat. Ets responsable de la teva rosa.", en: "You become responsible, forever, for what you have tamed. You are responsible for your rose." },
  { ca: "Si algú estima una flor de la qual només hi ha un exemplar entre milions i milions d’estrelles, n’hi ha prou que les miri per ser feliç.", en: "If someone loves a flower, of which just one single blossom grows in all the millions and millions of stars, it is enough to make him happy just to look at the stars." },
  { ca: "Només s'hi veu bé amb el cor. L'essencial és invisible als ulls.", en: "It is only with the heart that one can see rightly; what is essential is invisible to the eye." },
  { ca: "Sou boniques, però sou buides. No es pot morir per vosaltres.", en: "You are beautiful, but you are empty. One could not die for you." },
  { ca: "Només els infants saben el que busquen.", en: "Only the children know what they are looking for." },
  { ca: "Em pregunto si les estrelles estan enceses perquè cadascú pugui trobar un dia la seva.", en: "I wonder whether the stars are set alight in heaven so that one day each one of us may find his own again." },
  { ca: "Mai no s’està bé allà on s’és.", en: "No one is ever satisfied where he is." },
  { ca: "És el temps que has perdut per la teva rosa el que fa que la teva rosa sigui tan important.", en: "It is the time you have wasted for your rose that makes your rose so important." },
  { ca: "Anant tot recte, no es pot anar gaire lluny.", en: "Straight ahead of him, nobody can go very far." },
  { ca: "El llenguatge és font de malentesos.", en: "Words are the source of misunderstandings." },
  { ca: "El que fa bonic el desert és que amaga un pou en algun lloc.", en: "What makes the desert beautiful is that somewhere it hides a well." },
  { ca: "És molt més difícil jutjar-se a un mateix que no pas jutjar els altres.", en: "It is much more difficult to judge oneself than to judge others." },
  { ca: "Per a mi, encara no ets més que un nen semblant a cent mil altres nens.", en: "To me, you are still nothing more than a little boy who is just like a hundred thousand other little boys." },
  { ca: "Tu tindràs estrelles que saben riure!", en: "You — only you — will have stars that can laugh!" },
  { ca: "A les persones grans els agraden les xifres.", en: "Grown-ups love figures." },
  { ca: "Era massa jove per saber-la estimar.", en: "I was too young to know how to love her." },
  { ca: "Quan un s’ha deixat domesticar, s’exposa a plorar una mica.", en: "One runs the risk of weeping a little, if one lets himself be tamed." },
  { ca: "Les persones grans no entenen mai res soles, i és molt pesat per als infants haver-los de donar sempre explicacions.", en: "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them." },
  { ca: "És tan misteriós, el país de les llàgrimes!", en: "It is such a secret place, the land of tears." },
  { ca: "Si em domestiques, tindrem necessitat l’un de l’altre. Tu seràs per a mi únic al món.", en: "If you tame me, then we shall need each other. To me, you will be unique in all the world." },
  { ca: "Si véns, per exemple, a les quatre de la tarda, a partir de les tres ja començaré a ser feliç.", en: "If, for example, you come at four o’clock in the afternoon, then at three o’clock I shall begin to be happy." },
  { ca: "L’hauria hagut de jutjar pels fets i no per les paraules.", en: "I ought to have judged by deeds and not by words." },
] as const;

export function meta() {
  return [
    { title: "Col·lecció El Petit Príncep" },
    { name: "description", content: "Col·lecció del Petit Príncep en diferents idiomes." },
  ];
}

export default function SiteLayout() {
  const [quote, setQuote] = useState<(typeof quotePairs)[number] | null>(null);
  const location = useLocation();
  useEffect(() => {
    setQuote(quotePairs[Math.floor(Math.random() * quotePairs.length)]);
  }, [location.key]);
  const searchLink = <Link aria-label="Cercar / Search" title="Cercar / Search" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-yellow" to="/search"><IconSearch size={18} /></Link>;

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink antialiased">
      <header className="starry sticky top-0 z-40 border-b border-white/10 text-white shadow-[0_8px_30px_rgba(11,21,51,0.25)]">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
          <Link className="group flex shrink-0 items-center gap-3" to="/">
            <span className="ring-yellow/60 relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 ring-2"><img alt="El Petit Príncep" loading="lazy" width="42" height="42" className="h-9 w-9 object-contain transition-transform group-hover:-rotate-12" src="/collection-assets/home/little-prince-mark_-V0I.png" /></span>
            <span className="flex flex-col leading-none"><span className="font-display hidden text-xl font-semibold sm:block">Col·lecció El Petit Príncep</span><span className="font-display text-xl font-semibold sm:hidden">El Petit Príncep</span><span className="font-hand text-yellow mt-0.5 hidden text-base sm:block">The Little Prince Collection</span></span>
          </Link>
          <nav aria-label="Navegació principal" className="hidden xl:block">
            <ul className="flex items-center gap-1 text-[13px] font-semibold">
              {navigation.slice(0, 7).map((item) => <li key={item.to}><NavLink end={item.to === "/"} className="hover:text-yellow focus-visible:outline-yellow rounded-full px-2.5 py-2 text-white/85 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2" to={item.to}>{item.label}</NavLink></li>)}
              <li>{searchLink}</li>
              <li><NavLink className="bg-yellow text-night ml-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-bold transition hover:bg-white" to="/contact"><StarIcon className="h-3 w-3" />Contacte</NavLink></li>
            </ul>
          </nav>
          <div className="flex items-center gap-2 xl:hidden">
            {searchLink}
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-full border border-white/30 px-4 py-2 text-xs font-bold tracking-[0.12em] uppercase">Menú</summary>
              <div className="starry absolute top-12 right-0 w-[min(19rem,calc(100vw-2.5rem))] rounded-2xl border border-white/15 p-5 shadow-2xl">
                <ul className="grid gap-4 text-sm">{navigation.map((item) => <li key={item.to}><NavLink end={item.to === "/"} className="hover:text-yellow flex items-center gap-2 font-medium text-white" to={item.to}><StarIcon className="text-yellow h-2.5 w-2.5" />{item.mobile}</NavLink></li>)}</ul>
              </div>
            </details>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="starry relative isolate overflow-hidden text-white">
        <StarField footer />
        <div className="mx-auto max-w-[1360px] px-5 pt-6 pb-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <FoxIllustration />
            {quote && <>
              <p className="font-hand text-yellow mt-6 max-w-3xl text-3xl leading-tight sm:text-4xl">« {quote.ca} »</p>
              <p className="font-display mx-auto mt-3 max-w-2xl text-lg text-blue-200 italic">{quote.en}</p>
            </>}
          </div>
          <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-[1fr_auto]">
            <div><Link className="font-display hover:text-yellow text-2xl font-semibold" to="/">Col·lecció El Petit Príncep</Link><p className="mt-3 max-w-md text-sm leading-6 text-white/80">Josep (Barcelona, Spain)</p><p className="mt-5 text-xs leading-5 text-white/55">© 2019-2026 Josep (Barcelona, Spain)</p></div>
            <div className="lg:min-w-[23rem]"><p className="text-yellow flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase"><StarIcon className="h-3 w-3" />Contact</p><div className="mt-4 grid gap-3 text-sm"><a className="hover:text-yellow hover:decoration-yellow flex items-center gap-2 text-white underline decoration-white/40 underline-offset-4" href="mailto:idiomes.del.petit.princep@gmail.com"><MailIcon />idiomes.del.petit.princep@gmail.com</a><a className="hover:text-yellow hover:decoration-yellow flex items-center gap-2 text-white underline decoration-white/40 underline-offset-4" href="mailto:littleprincecollection@gmail.com"><MailIcon />littleprincecollection@gmail.com</a></div></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MailIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>;
}

function StarIcon({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6l-6.2 4.1 2-7.2L2 8.9l7.4-.3z" /></svg>;
}
