import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { IconChevronDown, IconMenu2, IconSearch, IconX } from "@tabler/icons-react";

const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

export function meta() {
  return [
    { title: "Col·lecció El Petit Príncep" },
    { name: "description", content: "Col·lecció del Petit Príncep en diferents idiomes." },
  ];
}

export default function SiteLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentMenuOpen, setRecentMenuOpen] = useState(location.pathname.startsWith("/recents"));
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="prince-site">
      <header className="prince-header">
        <div className="prince-header-inner">
          <Link className="prince-brand" to="/" onClick={closeMenu}>
            <span className="prince-brand-mark"><img src="/collection-assets/home/little-prince-mark_-V0I.png" alt="" /></span>
            <span className="prince-brand-copy"><strong>Col·lecció El Petit Príncep</strong><em>The Little Prince Collection</em></span>
          </Link>
          <button className="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? "Tanca el menú" : "Obre el menú"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <IconX size={21} /> : <IconMenu2 size={21} />}
          </button>
          <nav className={`prince-nav ${mobileMenuOpen ? "prince-nav-open" : ""}`} aria-label="Navegació principal">
            <NavLink to="/" end onClick={closeMenu}>Inici</NavLink>
            <NavLink to="/collection" onClick={closeMenu}>Col·lecció</NavLink>
            <div className="nav-recents">
              <button type="button" className={location.pathname.startsWith("/recents") ? "nav-current" : ""} onClick={() => setRecentMenuOpen(!recentMenuOpen)}>
                Recents <IconChevronDown size={13} />
              </button>
              {recentMenuOpen && <div className="year-menu">{years.map((year) => <NavLink key={year} to={`/recents/${year}`} onClick={closeMenu}>{year}</NavLink>)}</div>}
            </div>
            <NavLink to="/special" onClick={closeMenu}>Especials</NavLink>
            <NavLink to="/wishlist" onClick={closeMenu}>Buscats</NavLink>
            <NavLink to="/doubles" onClick={closeMenu}>Dobles</NavLink>
            <NavLink to="/collectors" onClick={closeMenu}>Col·leccionistes</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contacte</NavLink>
          </nav>
          <button className="header-search-button" type="button" aria-label={searchOpen ? "Tanca la cerca" : "Cerca"} onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <IconX size={18} /> : <IconSearch size={18} />}
          </button>
        </div>
        {searchOpen && <form className="header-search-form" action="/collection" role="search"><IconSearch size={17} /><input name="q" autoFocus placeholder="Cerca un idioma…" aria-label="Cerca un idioma" /><button type="submit">Cerca</button></form>}
      </header>
      <main className="prince-main"><Outlet /></main>
      <footer className="prince-footer">
        <div><span>Col·lecció El Petit Príncep</span><p>Josep · Barcelona, Spain</p></div>
        <p>© 2019–2026 Josep (Barcelona, Spain)</p>
        <div className="footer-contact"><a href="mailto:idiomes.del.petit.princep@gmail.com">idiomes.del.petit.princep@gmail.com</a><a href="mailto:littleprincecollection@gmail.com">littleprincecollection@gmail.com</a></div>
      </footer>
    </div>
  );
}
