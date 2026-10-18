import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { IconArrowRight, IconBook2, IconHeart, IconMail, IconSparkles, IconX } from "@tabler/icons-react";
import { languageCatalog } from "@/lib/language-catalog";

const sections = [
  { title: "LA MEVA COL·LECCIÓ", subtitle: "My collection", href: "/collection", image: "/collection-assets/recents/2026/01.webp", icon: IconBook2 },
  { title: "LLIBRES RECENTS", subtitle: "My latest books", href: "/recents/2026", image: "/collection-assets/recents/2026/02.webp", icon: IconSparkles },
  { title: "DOBLES", subtitle: "My doubles", href: "/doubles", image: "/collection-assets/doubles/c516b429eccb44cd_r98l.webp", icon: IconBook2 },
  { title: "LLIBRES BUSCATS", subtitle: "Wishlist", href: "/wishlist", image: "/collection-assets/wishlist/6fc602cf6f63927c_ny_3.webp", icon: IconHeart },
  { title: "LLIBRES ESPECIALS", subtitle: "Special books", href: "/special", image: "/collection-assets/special/e9a34ad7b5f5362c_d-Wd.webp", icon: IconSparkles },
  { title: "CONTACTE", subtitle: "Contact", href: "/contact", image: "/collection-assets/recents/2026/03.webp", icon: IconMail },
];

const categories = [
  { ca: "Idiomes", en: "Languages", count: 667, note: "Abkhaz, Afrikaans, Aimara, Alemany…" },
  { ca: "Idiomes artificials", en: "Constructed languages", count: 21, note: "Esperanto, Interlingua, Toki Pona…" },
  { ca: "Transcripcions", en: "Transcripts", count: 22, note: "Alfabets i sistemes d’escriptura" },
  { ca: "Adaptacions", en: "Adaptations", count: 8, note: "Teatre, còmics i versions lliures" },
  { ca: "Llibres en Braille", en: "Braille books", count: 9, note: "Edicions accessibles en diversos idiomes" },
  { ca: "Lectura fàcil", en: "Easy read", count: 9, note: "Versions adaptades per facilitar la lectura" },
  { ca: "Altres", en: "Others", count: 8, note: "Edicions especials i materials relacionats" },
];

const specialBooks = [
  { title: "El Principito", image: "e9a34ad7b5f5362c_d-Wd.webp", text: "Aquest és el meu primer Petit Príncep. Me'l van regalar quan vaig fer set anys. Va ser el primer cop que el vaig llegir.", english: "This is my first Little Prince. Someone gave it to me when I turned seven. It was the first time I had read it." },
  { title: "El Pequeño Príncipe", image: "edefebe341c8d7b4_d-Wd.webp", text: "Mecanoscrit amb aquarel·les pintades. Traducció desconeguda. Conté una targeta on li dedica a ‘El poeta’. Hi ha molta dedicació i amor en aquest llibre.", english: "A typescript with original watercolors and a handwritten dedication." },
  { title: "Pti Prens", image: "855fbf80c0a67e63_d-Wd.webp", text: "Menzy em va regalar el llibre que tenia des de petita de manera desinteressada.", english: "Menzy selflessly gave me the book she had from an early age." },
  { title: "Маленькі прынц", image: "eab40c347cdfde15_d-Wd.webp", text: "Вераніка em va anar a buscar aquest llibre durant les festes del Nadal Bielorús i per això sempre li estaré agraït.", english: "Veranika found this book during the Belarusian Christmas holidays; I will always be grateful." },
  { title: "Жима эла", image: "09e824b8ed8e69f7_d-Wd.webp", text: "Malika em va enviar el seu llibre i, per això, sempre estaré en deute amb ella.", english: "Malika sent me her book, and for that I will always be indebted to her." },
  { title: "El nene principito", image: "cde149d1d13068c5_d-Wd.webp", text: "Aquest llibre l'ha traduït i editat un gran amic i una millor persona.", english: "This book was translated and edited by a great friend and an even better person." },
  { title: "Piquina Plinchipi", image: "0f78426a486ad14b_d-Wd.webp", text: "Aquest llibre l'ha editat una gran amiga i una persona generosa.", english: "This book was edited by a great friend and a generous person." },
  { title: "Quyllur llaqtayuq wawamanta", image: "5a30e1953d0b1417_d-Wd.webp", text: "Després d'anys buscant-lo i de diverses ocasions en què se m'havia escapat, finalment he aconseguit aquest llibre fetitx.", english: "After years of searching and several near misses, I finally found this treasured edition." },
  { title: "Ang Munting Prinsipe", image: "fe4f938eb0d210e9_d-Wd.webp", text: "Una reil·lustració amb animació de quadrícula de barrera, creada per Loren per a la seva tesi universitària.", english: "A reillustrated edition using barrier-grid animation, created by Loren for a university thesis." },
  { title: "Irechaeri Wap'a", image: "ea72b62f75e806ea_d-Wd.webp", text: "Una edició creada amb esforç, bondat i molta il·lusió, amb il·lustracions inspirades en els paisatges de Michoacán.", english: "An edition made with care and beautifully illustrated with the landscapes of Michoacán." },
];

const recentCounts: Record<number, number> = { 2020: 75, 2021: 139, 2022: 93, 2023: 86, 2024: 143, 2025: 79, 2026: 78 };

const doubles = [
  ["Català / Catalan (1967)", "c516b429eccb44cd_r98l.webp"], ["Anglès / English (1975)", "5412fd84ebeb591b_r98l.webp"], ["Espanyol / Spanish (1985)", "05963d37785ddc1a_r98l.webp"], ["Romanès / Romanian (1990)", "2fad31d36058ee1e_r98l.webp"], ["Xinès / Chinese (1992?)", "4bd1ec1c896b3436_r98l.webp"], ["Romanès / Romanian (1992)", "033099e0ae121892_r98l.webp"], ["Birmà / Burmese (2004)", "0129e473bf5aecec_r98l.webp"], ["Islandès / Icelandic (2010?)", "88640001cffb7ac9_r98l.webp"], ["Albanès Tosc / Albanian Tosk (2010)", "78dbdbd11d0fe43d_r98l.webp"], ["Català balear / Balearic Catalan (2022)", "f75d6e2f40801516_r98l.webp"], ["Gaèlic irlandès / Irish Gaelic (2015)", "d446033d57fa1ae0_r98l.webp"], ["Romanès / Romanian (2015)", "d89e2abe3fd6f6e6_r98l.webp"], ["Romanès / Romanian (2015)", "b7f1906167650b2f_r98l.webp"], ["Romanès / Romanian (2015)", "dae03ad838aabd98_r98l.webp"], ["Maltès / Maltese (2016)", "23e14915e4d7193c_r98l.webp"], ["Txuvaix / Chuvash (2017)", "0142fe4b136b84fe_r98l.webp"], ["Friburg / Fribourgeois (2017)", "ee220037b4ad158c_r98l.webp"], ["Bielorús / Belarusian (2017)", "b36a0bb2c057b6ef_r98l.webp"], ["Kumyk (2018)", "38fd46b0e1294574_r98l.webp"], ["Maputxe / Mapuche (2018)", "ee359a5190d7e97c_r98l.webp"], ["Toki Pona (Sitelen Pona) (2020)", "afcf2f775209c385_r98l.webp"], ["Intereslau / Interslavic (2021)", "30967dc64026bb57_r98l.webp"], ["Àzeri àrab / Azeri Arabic (2007)", "1e46aaec72fd6956_r98l.webp"], ["Hongarès rúnic / Runic Hungarian (2018)", "c98955854f56ee8a_r98l.webp"], ["Xinès Hakka / Hakka Chinese (2000)", "5edd27b329c3eb11_r98l.webp"],
];

function PageHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return <div className="page-heading"><span className="page-kicker">{kicker}</span><h1>{title}</h1><p>{subtitle}</p></div>;
}

function BookPreview({ image, title, onClose }: { image: string; title: string; onClose: () => void }) {
  return <div className="book-preview-backdrop" role="presentation" onClick={onClose}><div className="book-preview" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><button className="preview-close" type="button" aria-label="Tanca" onClick={onClose}><IconX size={19} /></button><img src={image} alt={title} /><span>{title}</span></div></div>;
}

export function HomePage() {
  return <>
    <section className="home-hero">
      <div className="home-hero-text"><span className="home-eyebrow"><span>✦</span> COL·LECCIÓ DE LLIBRES</span><h1>El Petit Príncep</h1><p className="home-translation">The Little Prince</p><span className="gold-rule" /><p className="home-description">Col·lecció en diferents idiomes<br /><em>Collection in different languages</em></p><Link className="hero-link" to="/collection">Explora la col·lecció <IconArrowRight size={16} /></Link></div>
      <div className="home-hero-art"><img src="/collection-assets/recents/2026/01.webp" alt="El Petit Príncep al seu planeta" /><span className="hero-art-caption">Josep · Barcelona</span></div>
    </section>
    <section className="home-stat-strip" aria-label="Resum de la col·lecció"><div><strong>1.779</strong><span>Llibres <em>Books</em></span></div><div><strong>688</strong><span>Idiomes <em>Languages</em></span></div><div><strong>22</strong><span>Transcripcions <em>Transcripts</em></span></div><div><strong>8</strong><span>Adaptacions <em>Adaptations</em></span></div></section>
    <section className="home-sections"><div className="section-intro"><span className="page-kicker">DESCOBREIX · EXPLORE</span><h2>Un univers de petits prínceps</h2><p>Cada llibre explica la mateixa història amb una veu pròpia.</p></div><div className="home-card-grid">{sections.map((section) => {const Icon = section.icon; return <Link className="home-card" to={section.href} key={section.title}><span className="home-card-image"><img src={section.image} alt="" /></span><span className="home-card-caption"><span><strong>{section.title}</strong><em>{section.subtitle}</em></span><Icon size={17} stroke={1.6} /></span></Link>;})}</div></section>
  </>;
}

export function CollectionPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim().toLocaleLowerCase("ca");
  const filteredLanguages = query ? languageCatalog.filter((language) => language.name.toLocaleLowerCase("ca").includes(query)) : languageCatalog;
  return <section className="content-page">
    <PageHeading kicker="EL PETIT PRÍNCEP · THE LITTLE PRINCE" title="La meva col·lecció" subtitle="My collection" />
    <div className="collection-intro"><p>Una història que ha viatjat arreu del món i ha trobat una veu en centenars de llengües.</p><span><strong>1.779</strong> llibres reunits en diferents idiomes.</span></div>
    <div className="collection-category-grid">{categories.map((item) => <article className="collection-category" key={item.en}><span className="category-count">{item.count}</span><h2>{item.ca}</h2><p>{item.en}</p><span className="category-note">{item.note}</span></article>)}</div>
    <div className="language-section"><div className="language-heading"><div><span className="page-kicker">667 LLENGÜES</span><h2>Idiomes</h2></div><span>{filteredLanguages.length} resultats</span></div><div className="language-list">{filteredLanguages.map((language) => <div className="language-item" key={language.name}><span>{language.name}</span><span>{language.count}</span></div>)}{query && filteredLanguages.length === 0 && <p className="empty-search">No hem trobat cap idioma amb «{query}».</p>}</div></div>
    <Link className="text-link" to="/recents/2026">Veure les últimes edicions <IconArrowRight size={16} /></Link>
  </section>;
}

export function RecentPage() {
  const { year: yearParam } = useParams();
  const year = Number(yearParam);
  const validYear = year >= 2020 && year <= 2026;
  const [preview, setPreview] = useState<number | null>(null);
  const imageUrl = (index: number) => `/collection-assets/recents/${year}/${String(index + 1).padStart(2, "0")}.webp`;
  return <section className="content-page recent-page">
    <PageHeading kicker="LLIBRES RECENTS · MY LATEST BOOKS" title="Llibres recents" subtitle="New editions added to the collection" />
    <div className="year-tabs" aria-label="Tria l'any">{[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((item) => <Link className={item === year ? "year-tab year-tab-active" : "year-tab"} key={item} to={`/recents/${item}`}>{item}</Link>)}</div>
    <div className="year-title"><span>✦</span><h2>{validYear ? year : "Any no disponible"}</h2><span>✦</span></div>
    {validYear ? <div className="edition-grid">{Array.from({ length: recentCounts[year] }, (_, i) => <button className="edition-tile" key={i} type="button" onClick={() => setPreview(i)} aria-label={`Amplia la coberta ${i + 1}, ${year}`}><img loading="lazy" src={imageUrl(i)} alt={`Edició del Petit Príncep, ${year}`} /></button>)}</div> : <p className="section-empty">No hi ha una pàgina disponible per a aquest any.</p>}
    <div className="recent-quote"><span>✦</span><p>«Anant tot recte, no es pot anar gaire lluny.»<em>Straight ahead of him, nobody can go very far.</em></p></div>
    {preview !== null && <BookPreview image={imageUrl(preview)} title={`Edició del Petit Príncep · ${year}`} onClose={() => setPreview(null)} />}
  </section>;
}

export function SpecialPage() {
  return <section className="content-page"><PageHeading kicker="EDICIONS SINGULARS" title="Llibres especials" subtitle="Special books" /><div className="special-book-grid">{specialBooks.map((book) => <article className="special-book" key={book.title}><div className="special-book-cover"><img loading="lazy" src={`/collection-assets/special/${book.image}`} alt={book.title} /></div><div className="special-book-copy"><h2>{book.title}</h2><p>{book.text}</p><em>{book.english}</em></div></article>)}</div></section>;
}

export function WishlistPage() {
  const images = ["6fc602cf6f63927c_ny_3.webp", "22391261d9d832e7_ny_3.webp"];
  const [preview, setPreview] = useState<number | null>(null);
  return <section className="content-page"><PageHeading kicker="EDICIONS PER TROBAR" title="Llibres buscats" subtitle="Wishlist" /><div className="wishlist-intro"><IconHeart size={19} /><p>Algunes edicions que encara busco.<em> Editions I’m still looking for.</em></p></div><div className="wishlist-grid">{images.map((image, i) => <button className="edition-tile" type="button" key={image} onClick={() => setPreview(i)} aria-label={`Amplia la coberta ${i + 1}`}><img src={`/collection-assets/wishlist/${image}`} alt="Edició buscada del Petit Príncep" /></button>)}</div>{preview !== null && <BookPreview image={`/collection-assets/wishlist/${images[preview]}`} title="Edició buscada del Petit Príncep" onClose={() => setPreview(null)} />}</section>;
}

export function DoublesPage() {
  return <section className="content-page"><PageHeading kicker="PER INTERCANVIAR" title="Dobles" subtitle="Doubles" /><div className="doubles-intro"><p>Si teniu el buriat, el turcman ciríl·lic o alguna primera edició interessant... parleu amb mi, potser tinc altres llibres repetits que us podrien interessar.</p><em>If you have the Buryat, Cyrillic Turkmen or an interesting first edition, get in touch; I may have other doubles to trade.</em><Link to="/contact">Parlem-ne <IconArrowRight size={15} /></Link></div><div className="doubles-grid">{doubles.map(([title, image]) => <article className="double-card" key={image}><img loading="lazy" src={`/collection-assets/doubles/${image}`} alt={title} /><p>{title}</p></article>)}</div></section>;
}

export function ContactPage() {
  return <section className="content-page contact-page"><PageHeading kicker="ESCRIU-ME · GET IN TOUCH" title="Contacte" subtitle="Contact" /><div className="contact-panel"><span className="contact-star">✦</span><h2>Compartim històries</h2><p>Vols parlar d’una edició, proposar un intercanvi o compartir una història del Petit Príncep?</p><a href="mailto:idiomes.del.petit.princep@gmail.com">idiomes.del.petit.princep@gmail.com <IconArrowRight size={16} /></a><a href="mailto:littleprincecollection@gmail.com">littleprincecollection@gmail.com <IconArrowRight size={16} /></a></div></section>;
}

export function CollectorsPage() {
  return <section className="content-page"><PageHeading kicker="UNA HISTÒRIA COMPARTIDA" title="Altres col·leccionistes" subtitle="Other collectors" /><div className="section-empty collectors-empty"><span>✦</span><p>Aquesta secció encara no té contingut.</p><Link to="/contact">Posa’t en contacte <IconArrowRight size={16} /></Link></div></section>;
}
