// Library Imports
import { useMemo, useState } from "react";
import Papa from "papaparse";
import csvText from "./language.csv?raw";
import "./App.css";
import logo from "./logo.png";

// Language data structure
interface Language {
  identifier: string;
  language_code: string;
  display_name: string;
  shorthand: string;
  native_name: string;
  romanized_language_identifier: string;
  is_romanization_language: boolean;
  flag_image_path: string;
}

<div>
<img src={logo} style={{ width: "200px", height: "100px" }} />
</div>

// Convert CSV text into language objects
const parsedCSV = Papa.parse<Record<string, string>>(csvText, {
  header: true,
  skipEmptyLines: true,
});

const languages: Language[] = parsedCSV.data.map((row) => ({
  identifier: row.identifier ?? "",
  language_code: row.language_code ?? "",
  display_name: row.display_name ?? "",
  shorthand: row.shorthand ?? "",
  native_name: row.native_name ?? "",
  romanized_language_identifier:
    row.romanized_language_identifier ?? "",
  is_romanization_language:
    String(row.is_romanization_language).toLowerCase() === "true" ||
    row.is_romanization_language === "1",
  flag_image_path: row.flag_image_path ?? "",
}));

// Website
function App() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  // Use the identifier to distinguish romanized entries.
  // This works even if the CSV boolean column is inaccurate.
  const isRomanized = (language: Language) =>
    language.identifier.toLowerCase().endsWith("-romanized");

  // Filter languages based on search and selected category
  const filteredLanguages = useMemo(() => {
    return languages.filter((language) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch = [
        language.display_name,
        language.native_name,
        language.language_code,
        language.identifier,
        language.shorthand,
      ].some((value) => value.toLowerCase().includes(searchText));

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "romanized" && isRomanized(language)) ||
        (activeFilter === "original" && !isRomanized(language));

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const romanizedCount = languages.filter(isRomanized).length;
  const originalCount = languages.length - romanizedCount;

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">文</span>
          <span>Lingua<span className="brand-highlight">World</span></span>
        </a>

        <nav className="nav-links">
          <a className="nav-active" href="#home">Home</a>
          <a href="#explore">Explore</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-button" href="#explore">
          Explore languages <span>↗</span>
        </a>
      </header>

      <main>
        {/* Hero section */}
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              DISCOVER THE WORLD THROUGH WORDS
            </div>

            <h1>
              Every language
              <br />
              tells a <span>story.</span>
            </h1>

            <p className="hero-description">
              Explore languages from around the world, discover
              their native names, and find new ways to connect
              through the beauty of words.
            </p>

            <a href="#explore" className="hero-button">
              Discover languages <span>→</span>
            </a>

            <div className="hero-note">
              <span className="note-icon">✳</span>
              A little curiosity opens up a whole new world.
            </div>
          </div>

          <div className="hero-art">
            <div className="art-orbit orbit-one"></div>
            <div className="art-orbit orbit-two"></div>

            <div className="floating-word word-one">Hello</div>
            <div className="floating-word word-two">Hola</div>
            <div className="floating-word word-three">Bonjour</div>
            <div className="floating-word word-four">Xin chào</div>

            <div className="globe">
              <span className="globe-symbol">文</span>
            </div>

            <div className="art-caption">
              <span className="caption-dot"></span>
              ONE WORLD, MANY VOICES
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats-section" aria-label="Language statistics">
          <div className="stat-card">
            <div className="stat-icon green-icon">文</div>
            <div>
              <p className="stat-number">{languages.length}</p>
              <p className="stat-label">Language entries</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon peach-icon">◎</div>
            <div>
              <p className="stat-number">{originalCount}</p>
              <p className="stat-label">Original entries</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow-icon">Aa</div>
            <div>
              <p className="stat-number">{romanizedCount}</p>
              <p className="stat-label">Romanized entries</p>
            </div>
          </div>
        </section>

        {/* Language explorer */}
        <section className="explore-section" id="explore">
          <div className="section-heading">
            <div>
              <p className="section-kicker">YOUR NEXT DISCOVERY</p>
              <h2>Explore languages<span>.</span></h2>
              <p className="section-description">
                Find a language that catches your curiosity.
              </p>
            </div>

            <div className="result-count">
              <span>{filteredLanguages.length}</span> results
            </div>
          </div>

          {/* Search bar */}
          <div className="explore-controls">
            <div className="search-box">
              <span className="search-icon">⌕</span>

              <input
                type="search"
                placeholder="Search a language, native name, or code..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search languages"
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="filter-buttons">
              <button
                className={activeFilter === "all" ? "filter active" : "filter"}
                onClick={() => setActiveFilter("all")}
              >
                All languages
              </button>

              <button
                className={
                  activeFilter === "original" ? "filter active" : "filter"
                }
                onClick={() => setActiveFilter("original")}
              >
                Original
              </button>

              <button
                className={
                  activeFilter === "romanized" ? "filter active" : "filter"
                }
                onClick={() => setActiveFilter("romanized")}
              >
                Romanized
              </button>
            </div>
          </div>

          {/* Language cards */}
          {filteredLanguages.length > 0 ? (
            <div className="language-grid">
              {filteredLanguages.map((language) => (
                <article
                  className="language-card"
                  key={language.identifier}
                  onClick={() => setSelectedLanguage(language)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedLanguage(language);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${language.display_name}`}
                >
                  <div className="card-top">
                    <div className="flag-container">
                      {language.flag_image_path ? (
                        <img
                          className="language-flag"
                          src={language.flag_image_path}
                          alt={`${language.display_name} flag`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="flag-placeholder">文</span>
                      )}
                    </div>

                    <span
                      className={
                        isRomanized(language)
                          ? "language-tag romanized-tag"
                          : "language-tag"
                      }
                    >
                      {isRomanized(language) ? "Romanized" : "Language"}
                    </span>
                  </div>

                  <h3>{language.display_name || "Unnamed language"}</h3>

                  <p className="native-name">
                    {language.native_name || "Native name unavailable"}
                  </p>

                  <div className="card-divider"></div>

                  <div className="card-bottom">
                    <div>
                      <span className="code-label">LANGUAGE CODE</span>
                      <span className="language-code">
                        {language.language_code || "N/A"}
                      </span>
                    </div>

                    <span className="card-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>No languages found</h3>
              <p>
                Try another search term or select a different filter.
              </p>
              <button
                className="hero-button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
              >
                Show all languages
              </button>
            </div>
          )}
        </section>

        {/* Language data table */}
<section className="table-section" id="language-table">
  <div className="section-heading">
    <div>
      <p className="section-kicker">YOUR DATASET</p>
      <h2>Language directory<span>.</span></h2>
      <p className="section-description">
        Explore the complete dataset in a structured table.
      </p>
    </div>
  </div>

  <div className="table-wrapper">
    <table className="language-table">
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Language Code</th>
          <th>Display Name</th>
          <th>Native Name</th>
          <th>Shorthand</th>
          <th>Romanization Identifier</th>
          <th>Romanized Entry</th>
        </tr>
      </thead>

      <tbody>
        {filteredLanguages.map((language) => (
          <tr key={language.identifier}>
            <td>{language.identifier}</td>
            <td>{language.language_code}</td>
            <td className="table-language-name">
              {language.display_name}
            </td>
            <td>{language.native_name || "—"}</td>
            <td>{language.shorthand || "—"}</td>
            <td>
              {language.romanized_language_identifier || "—"}
            </td>
            <td>
              {language.identifier.toLowerCase().endsWith("-romanized")
                ? "Yes"
                : "No"}
            </td>
          </tr>
        ))}

        {filteredLanguages.length === 0 && (
          <tr>
            <td colSpan={7} className="table-empty">
              No languages match your search.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <p className="table-note">
    Showing {filteredLanguages.length} of {languages.length} language entries.
  </p>
</section>

        {/* About section */}
        <section className="about-section" id="about">
          <div className="about-symbol">文</div>
          <div>
            <p className="section-kicker">LANGUAGE IS CONNECTION</p>
            <h2>Different words.<br />One world.</h2>
            <p>
              Every language carries a unique way of seeing the world.
              Explore their names, scripts, and language codes, one
              discovery at a time.
            </p>
          </div>
          <a href="#explore" className="about-link">
            Keep exploring <span>→</span>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">文</span>
          <span>Lingua<span className="brand-highlight">World</span></span>
        </a>

        <p>Made with curiosity and a love for languages.</p>

        <a href="#home" className="back-to-top">
          Back to top ↑
        </a>
      </footer>

      {/* Language details popup */}
      {selectedLanguage && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLanguage(null);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSelectedLanguage(null);
          }}
        >
          <div
            className="language-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelectedLanguage(null)}
              aria-label="Close details"
              autoFocus
            >
              ×
            </button>

            <div className="modal-symbol">文</div>

            <p className="section-kicker">LANGUAGE PROFILE</p>
            <h2 id="modal-title">{selectedLanguage.display_name}</h2>

            <p className="modal-native">
              {selectedLanguage.native_name || "Native name unavailable"}
            </p>

            <div className="detail-list">
              <div className="detail-row">
                <span>Identifier</span>
                <strong>{selectedLanguage.identifier || "N/A"}</strong>
              </div>

              <div className="detail-row">
                <span>Language code</span>
                <strong>{selectedLanguage.language_code || "N/A"}</strong>
              </div>

              <div className="detail-row">
                <span>Shorthand</span>
                <strong>{selectedLanguage.shorthand || "N/A"}</strong>
              </div>

              <div className="detail-row">
                <span>Romanization identifier</span>
                <strong>
                  {selectedLanguage.romanized_language_identifier || "N/A"}
                </strong>
              </div>

              <div className="detail-row">
                <span>Romanized entry</span>
                <strong>
                  {isRomanized(selectedLanguage) ? "Yes" : "No"}
                </strong>
              </div>
            </div>

            <button
              className="hero-button modal-button"
              onClick={() => setSelectedLanguage(null)}
            >
              Done <span>✓</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;