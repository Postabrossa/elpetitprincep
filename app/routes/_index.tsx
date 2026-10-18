import { useState } from "react";
import {
  IconBook2,
  IconChevronDown,
  IconChevronRight,
  IconHeart,
  IconMail,
  IconMenu2,
  IconSearch,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";

const categories = [
  { id: "recent", title: "LLIBRES RECENTS", subtitle: "My latest books", icon: IconSparkles, cover: "cover-sand", mark: "2025" },
  { id: "collection", title: "LA MEVA COL·LECCIÓ", subtitle: "My collection", icon: IconBook2, cover: "cover-blue", mark: "∞" },
  { id: "doubles", title: "DOBLES", subtitle: "My doubles", icon: IconBook2, cover: "cover-rose", mark: "02" },
  { id: "wishlist", title: "LLIBRES BUSCATS", subtitle: "Wishlist", icon: IconHeart, cover: "cover-olive", mark: "♡" },
  { id: "special", title: "LLIBRES ESPECIALS", subtitle: "Special books", icon: IconSparkles, cover: "cover-night", mark: "✦" },
  { id: "contact", title: "CONTACTE", subtitle: "Contact", icon: IconMail, cover: "cover-paper", mark: "✉" },
];

const navItems = [
  { label: "Inici", english: "Home", id: "home" },
  { label: "La meva col·lecció", english: "My collection", id: "collection" },
  { label: "Recents", english: "Latest", id: "recent", expandable: true },
  { label: "Llibres especials", english: "Special books", id: "special" },
  { label: "Llibres buscats", english: "Wishlist", id: "wishlist" },
  { label: "Dobles", english: "Doubles", id: "doubles" },
  { label: "Altres col·leccionistes", english: "Other collectors", id: "collectors" },
  { label: "Contacte", english: "Contact", id: "contact" },
];

export function meta() {
  return [
    { title: "El Petit Príncep — Col·lecció en diferents idiomes" },
    { name: "description", content: "Una col·lecció del Petit Príncep en diferents idiomes." },
  ];
}

export default function HomeRoute() {
  const [selected, setSelected] = useState<string | null>(null);
  const [recentOpen, setRecentOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const activeCategory = categories.find((category) => category.id === selected);

  return (
    <div className="min-h-screen bg-[#f1f0ed] text-[#292726] md:flex">
      <aside className={`collection-sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-star">✦</span>
          <span>Col·lecció<br />El Petit Príncep</span>
        </div>
        <nav className="sidebar-nav" aria-label="Navegació principal">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                className={`nav-link ${item.id === "home" ? "nav-active" : ""}`}
                onClick={() => {
                  if (item.expandable) setRecentOpen(!recentOpen);
                  else if (item.id !== "home") setSelected(item.id);
                  setMobileOpen(false);
                }}
              >
                <span><strong>{item.label}</strong><small>{item.english}</small></span>
                {item.expandable && (recentOpen ? <IconChevronDown size={15} /> : <IconChevronRight size={15} />)}
              </button>
              {item.expandable && recentOpen && (
                <div className="year-list">
                  {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                    <button key={year} type="button" onClick={() => { setSelected(`recent-${year}`); setMobileOpen(false); }}>{year}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-footnote">Una història, molts idiomes.<br /><i>One story, many languages.</i></div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mobile-topbar">
          <button type="button" aria-label="Obre el menú" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <IconX /> : <IconMenu2 />}</button>
          <span>El Petit Príncep</span>
          <button type="button" aria-label="Cerca" onClick={() => setSearchOpen(!searchOpen)}><IconSearch /></button>
        </div>
        <button type="button" aria-label="Cerca a la col·lecció" className="desktop-search" onClick={() => setSearchOpen(!searchOpen)}><IconSearch size={19} /></button>
        {searchOpen && (
          <div className="search-panel">
            <IconSearch size={17} /><input autoFocus placeholder="Cerca un idioma o una edició…" aria-label="Cerca un idioma o una edició" /><button type="button" aria-label="Tanca la cerca" onClick={() => setSearchOpen(false)}><IconX size={17} /></button>
          </div>
        )}
        <header className="hero">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-copy">
            <span className="eyebrow">COL·LECCIÓ INTERNACIONAL · BARCELONA</span>
            <h1>El Petit Príncep</h1>
            <p className="translation">[The Little Prince]</p>
            <span className="hero-divider"><i /></span>
            <p className="hero-subtitle">Col·lecció en diferents idiomes</p>
            <p className="translation subtitle-translation">[Collection in different languages]</p>
          </div>
          <span className="hero-planet" aria-hidden="true">✦</span>
          <span className="hero-caption">Antoine de Saint-Exupéry · 1943</span>
        </header>

        <section className="collection-content">
          <div className="section-heading">
            <div><span className="section-kicker">DESCOBREIX LA COL·LECCIÓ</span><h2>Un petit viatge<br className="mobile-break" /> entre llibres</h2></div>
            <p>Cada edició és un món nou.<br /><i>Every edition is a new world.</i></p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button key={category.id} type="button" className="category-card" onClick={() => setSelected(category.id)}>
                  <span className={`book-art ${category.cover}`}>
                    <span className="book-art-top">LE PETIT PRINCE</span>
                    <span className="book-art-mark">{category.mark}</span>
                    <span className="book-art-orbit" />
                    <span className="book-art-bottom">ANTOINE DE SAINT-EXUPÉRY</span>
                    <span className="book-art-number">{String(index + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="category-caption"><Icon size={14} stroke={1.6} /><span><strong>{category.title}</strong><em>{category.subtitle}</em></span><Icon className="card-arrow" size={15} /></span>
                </button>
              );
            })}
          </div>
          {activeCategory && (
            <div className="selection-note" role="status">
              <div><span className="section-kicker">{activeCategory.id.startsWith("recent-") ? "ARXIU D'EDICIONS" : "EXPLORA"}</span><strong>{activeCategory.id.startsWith("recent-") ? `Edicions de ${activeCategory.id.split("-")[1]}` : activeCategory.title}</strong><span>{activeCategory.id === "contact" ? "Escriu-me per compartir la teva història o una edició especial." : "Aquesta secció de la col·lecció està preparada per descobrir-se."}</span></div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Tanca"><IconX size={18} /></button>
            </div>
          )}
          <footer className="site-footer">
            <span>© 2019–2026 Josep <span className="footer-dot">·</span> Barcelona, Spain</span>
            <span><a href="mailto:idiomes.del.petit.princep@gmail.com">idiomes.del.petit.princep@gmail.com</a><a href="mailto:littleprincecollection@gmail.com">littleprincecollection@gmail.com</a></span>
          </footer>
        </section>
      </main>
    </div>
  );
}
