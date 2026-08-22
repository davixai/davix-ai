// ============================================================================
// /oferta — pagina de prospectare, trimisă pe WhatsApp.
// ----------------------------------------------------------------------------
// Nu e o pagină de site. E răspunsul la două întrebări puse la telefon:
// „cu ce te ocupi?" și „îmi poți trimite ceva să văd ce faci?".
//
// Reguli care au dictat fiecare decizie de aici:
//  · se deschide în browserul din WhatsApp, pe telefon, pe 4G → zero shader,
//    zero framer-motion, zero chatbot, zero calculator;
//  · proiectele stau ÎNAINTEA serviciilor — omul a cerut să vadă ce fac,
//    nu să citească ce vând;
//  · un singur element flotant: bara de WhatsApp;
//  · prețurile vin din lib/pricing.ts, ca să nu existe două liste diferite
//    pe același domeniu;
//  · pagina e privată: noindex, nofollow, în afara sitemap-ului și fără
//    niciun link către ea din site.
// ============================================================================

import type { Metadata } from "next"
import Link from "next/link"

import { Reveal } from "@/components/oferta/reveal"
import { StickyBar } from "@/components/oferta/sticky-bar"
import {
  ArrowDownIcon,
  ArrowIcon,
  CheckIcon,
  GlobeIcon,
  PhoneIcon,
  QrIcon,
  SERVICE_ICONS,
  ShieldIcon,
  WhatsAppIcon,
  WrenchIcon,
  XIcon,
} from "@/components/oferta/icons"
import {
  CITY,
  DIY_CONS,
  EMAIL,
  FAQ,
  INCLUDED,
  LEGAL_NAME,
  MAINTENANCE,
  MENU_INCLUDES,
  MENU_NUTRITION,
  PACKAGES,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROJECTS,
  SERVICES,
  SITE_DEPOSIT_PERCENT,
  STEPS,
  WA_GENERAL,
  WA_MAINT,
  WA_MENU,
  WHY_ME,
  WITH_ME_PROS,
  wa,
} from "@/components/oferta/data"
import { MENU_PRICES, SITE_PRICES, formatLei, siteFromLabel } from "@/lib/pricing"

import "./oferta.css"

export const metadata: Metadata = {
  title: "DaviX AI — Ofertă site-uri și meniuri digitale",
  description:
    "Site-uri de prezentare, magazine online și meniuri digitale cu cod QR pentru afaceri locale. PFA, contract și factură. Suceava.",
  // Pagina e privată: se trimite pe WhatsApp, nu se caută pe Google.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "DaviX AI — Site-uri și meniuri digitale pentru afaceri locale",
    description: "De la 500 lei. PFA, contract și factură. Online în 3–5 zile.",
    images: ["/davix-logo.png"],
  },
}

/** Formatarea prețului fără cuvântul „lei", ca să pot stiliza moneda separat. */
function amount(value: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(value)
}

/** Textul FAQ acceptă **bold** — îl transformăm fără să injectăm HTML brut. */
function renderAnswer(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  )
}

export default function OfertaPage() {
  return (
    <div className="ofr-root">
      {/* Reveal-ul pornește de la opacity:0 și e adus înapoi de JavaScript.
          Dacă JS nu rulează — webview capricios, blocare, eroare de rețea —
          pagina ar rămâne goală, iar asta e inacceptabil pentru un link
          trimis unui client. Fără JS, conținutul apare direct. */}
      <noscript>
        <style>{`.ofr-reveal{opacity:1 !important;transform:none !important}.ofr-bar{transform:none !important}`}</style>
      </noscript>

      {/* ------------------------------------------------------------ HERO -- */}
      <header className="ofr-hero">
        <div className="ofr-wrap">
          <Reveal>
            <div className="ofr-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/davix-avatar.jpg" alt="" width={46} height={46} />
              <div>
                <div className="ofr-brand-name">DaviX AI</div>
                <div className="ofr-brand-sub">David · {CITY}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="ofr-h1">
              Site-uri și meniuri digitale pentru{" "}
              <span className="ofr-accent-text">afaceri locale</span>.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="ofr-lead">
              Eu construiesc tot. Tu îmi trimiți pozele și informațiile — atât. În 3–5 zile ești
              online.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="ofr-trust">
              <span className="ofr-chip">
                <ShieldIcon /> PFA
              </span>
              <span className="ofr-chip">
                <CheckIcon /> Contract
              </span>
              <span className="ofr-chip">
                <CheckIcon /> Factură
              </span>
              <span className="ofr-chip">
                <CheckIcon /> Preț spus din start
              </span>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="ofr-actions">
              <a
                className="ofr-btn ofr-btn--wa ofr-btn--block"
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Scrie pe WhatsApp
              </a>
              <a className="ofr-btn ofr-btn--ghost ofr-btn--block" href={`tel:${PHONE_TEL}`}>
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </div>
            <p className="ofr-legalname">{LEGAL_NAME}</p>
          </Reveal>

          {/* Trei uși, nu un meniu. Omul care deschide linkul vrea una din
              trei lucruri: să vadă cât costă un site, să vadă meniul digital,
              sau să înțeleagă de ce nu îl face singur. Fiecare buton îl duce
              exact acolo — nu îl las să caute derulând. */}
          <Reveal delay={300}>
            <nav className="ofr-jump" aria-label="Sari direct la ce te interesează">
              <a className="ofr-jump-item" href="#preturi">
                <span className="ofr-jump-ico">
                  <GlobeIcon size={18} />
                </span>
                <span className="ofr-jump-text">
                  <span className="ofr-jump-title">Vreau un site</span>
                  <span className="ofr-jump-sub">Pachete și prețuri</span>
                </span>
                <ArrowDownIcon size={14} />
              </a>

              <a className="ofr-jump-item ofr-jump-item--gold" href="#meniu">
                <span className="ofr-jump-ico">
                  <QrIcon size={18} />
                </span>
                <span className="ofr-jump-text">
                  <span className="ofr-jump-title">Vreau meniu digital</span>
                  <span className="ofr-jump-sub">Cod QR pentru local</span>
                </span>
                <ArrowDownIcon size={14} />
              </a>

              <a className="ofr-jump-item" href="#singur">
                <span className="ofr-jump-ico">
                  <ShieldIcon size={18} />
                </span>
                <span className="ofr-jump-text">
                  <span className="ofr-jump-title">De ce să lucrezi cu mine</span>
                  <span className="ofr-jump-sub">Față în față cu „îl fac singur”</span>
                </span>
                <ArrowDownIcon size={14} />
              </a>
            </nav>
          </Reveal>

          <Reveal delay={360}>
            <p className="ofr-scrollhint">
              <span className="ofr-scrollhint-arrow" aria-hidden="true" />
              Derulează — mai jos ai modele reale pe care le poți deschide, prețurile scrise pe
              față și tot ce mă întreabă lumea la telefon.
            </p>
          </Reveal>
        </div>
      </header>

      {/* -------------------------------------------------------- PROIECTE -- */}
      {/* Stau primele, imediat după hero: întrebarea de la care pleacă tot e
          „îmi poți trimite ceva să văd ce faci?". Răspunsul nu are voie să
          stea sub șapte carduri de servicii.

          Formulare importantă: „construite de mine", NU „pentru clienți".
          Sunt modele proprii, complete și funcționale — dar niciun rând de
          aici nu are voie să sugereze un client care nu există. Dacă cineva
          întreabă „al cui e site-ul ăsta?" și nu ai răspuns, ai pierdut tot.
          Reformularea transformă limitarea în ofertă: modelele devin un
          catalog din care clientul alege. */}
      <section className="ofr-section ofr-band" aria-labelledby="proiecte">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Ce construiesc
            </span>
            <h2 className="ofr-h2" id="proiecte">
              Modele construite de mine.
            </h2>
            <p className="ofr-lead">
              Site-uri complete, funcționale, online acum — construite de la zero ca să vezi exact
              ce pot face. Apasă pe oricare și plimbă-te prin el. Îți place unul?{" "}
              <strong style={{ color: "var(--ofr-text)", fontWeight: 600 }}>
                Îl adaptez pe afacerea ta.
              </strong>
            </p>
          </Reveal>

          <div className="ofr-projects">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.url} delay={i * 90}>
                <a
                  className="ofr-project"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ofr-shot">
                    <span className="ofr-shot-tag">{project.tag}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`Site ${project.name}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className="ofr-project-body">
                    <div className="ofr-project-name">{project.name}</div>
                    <p className="ofr-project-desc">{project.desc}</p>
                    <span className="ofr-project-link">
                      Deschide modelul <ArrowIcon />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link className="ofr-btn ofr-btn--ghost ofr-btn--block" href="/proiecte">
              Vezi toate modelele
            </Link>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- SERVICII -- */}
      <section className="ofr-section" aria-labelledby="servicii">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Ce fac
            </span>
            <h2 className="ofr-h2" id="servicii">
              Ce pot construi pentru afacerea ta.
            </h2>
          </Reveal>

          <div className="ofr-grid">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 60}>
                  <div className="ofr-svc">
                    <span className="ofr-svc-ico">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="ofr-h3">{service.title}</h3>
                      <p className="ofr-p" style={{ marginTop: "0.25rem" }}>
                        {service.desc}
                      </p>
                      <span className="ofr-svc-price">{service.price}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={80}>
            <p className="ofr-note">
              Fac și <strong>aplicații personalizate</strong> și{" "}
              <strong>automatizări</strong> — dacă ai nevoie de altceva decât un site, întreabă-mă.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- PREȚURI -- */}
      <section className="ofr-section ofr-band" id="preturi" aria-labelledby="preturi-t">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Prețuri
            </span>
            <h2 className="ofr-h2" id="preturi-t">
              Cât costă.
            </h2>
            <p className="ofr-lead">
              Prețul final depinde de câte pagini are și ce trebuie să facă. Îl stabilim la telefon,
              în 10 minute, și rămâne acolo.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <p className="ofr-note ofr-note--step">
              Începe de jos: ai nevoie doar de <strong>o singură pagină</strong>, pentru o campanie
              sau un singur serviciu? Landing page, {siteFromLabel("landing")}. De aici în sus:
            </p>
          </Reveal>

          <div className="ofr-grid" style={{ gap: "1.25rem" }}>
            {PACKAGES.map((pack, i) => (
              <Reveal key={pack.id} delay={i * 80}>
                <div className={`ofr-price-card${pack.highlight ? " ofr-price-card--hi" : ""}`}>
                  {"badge" in pack && pack.badge ? (
                    <span className="ofr-tagline">{pack.badge}</span>
                  ) : null}

                  <div className="ofr-price-name">{pack.name}</div>
                  <div className="ofr-price-for">{pack.for}</div>

                  <div className="ofr-price-amount">
                    <span className="ofr-price-from">de la</span>
                    <span className="ofr-price-num">{amount(pack.price)}</span>
                    <span className="ofr-price-cur">lei</span>
                  </div>

                  <ul className="ofr-list">
                    {pack.features.map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                    <li>
                      <CheckIcon />
                      <span>Gata în {pack.days}</span>
                    </li>
                  </ul>

                  <a
                    className="ofr-btn ofr-btn--wa ofr-btn--block ofr-btn--sm"
                    style={{ marginTop: "1.25rem" }}
                    href={wa(`Salut, David. ${pack.waLabel} pentru afacerea mea. `)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={16} />
                    {pack.waLabel}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="ofr-included">
              <div className="ofr-included-title">Inclus în orice pachet</div>
              <ul className="ofr-list ofr-included-grid">
                {INCLUDED.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="ofr-note">
              <strong>Cum se plătește:</strong> prin transfer bancar, în contul PFA.{" "}
              {SITE_DEPOSIT_PERCENT}% avans la început, restul la livrare. Contract înainte, factură
              după. Domeniul și găzduirea sunt incluse în primul an; din anul 2, domeniul se
              reînnoiește cu <strong>{formatLei(SITE_PRICES.domainRenewalYearly)} pe an</strong>.
              Atât. Nu apare nimic în plus pe parcurs.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <a className="ofr-bridge" href="#dupa">
              <span className="ofr-bridge-ico">
                <WrenchIcon size={18} />
              </span>
              <span className="ofr-bridge-text">
                <span className="ofr-bridge-title">Vrei și administrare după lansare?</span>
                <span className="ofr-bridge-sub">
                  Opțional. Îmi scrii ce schimbi, schimb eu — vezi cât costă
                </span>
              </span>
              <ArrowDownIcon size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- DUPĂ LANSARE -- */}
      <section className="ofr-section" id="dupa" aria-labelledby="dupa-t">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Opțional
            </span>
            <h2 className="ofr-h2" id="dupa-t">
              După lansare.
            </h2>
            <p className="ofr-lead">
              Site-ul e al tău și rămâne exact cum e, fără să mai plătești nimic lunar.
              Administrarea e pentru cine schimbă des prețuri, poze sau oferte și nu vrea să se
              ocupe singur.
            </p>
          </Reveal>

          <div className="ofr-grid ofr-grid--2">
            {MAINTENANCE.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 80}>
                <div className="ofr-price-card">
                  <div className="ofr-price-name">{plan.name}</div>
                  <div className="ofr-price-for">{plan.for}</div>
                  <div className="ofr-price-amount">
                    <span className="ofr-price-num">{amount(plan.price)}</span>
                    <span className="ofr-price-cur">lei/lună</span>
                  </div>
                  <ul className="ofr-list">
                    {plan.items.map((item) => (
                      <li key={item}>
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <a
              className="ofr-btn ofr-btn--ghost ofr-btn--block"
              style={{ marginTop: "1.25rem" }}
              href={WA_MAINT}
              target="_blank"
              rel="noopener noreferrer"
            >
              Întreabă-mă despre administrare
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- MENIU DIGITAL -- */}
      {/* Bloc propriu, culoare proprie: e alt cumpărător (restaurant, cafenea),
          alt preț și altă decizie decât un site. */}
      <section className="ofr-section ofr-band ofr-section--menu" id="meniu" aria-labelledby="meniu-t">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow" style={{ color: "#f2c46d", background: "rgba(242,196,109,0.12)", borderColor: "rgba(242,196,109,0.28)" }}>
              <span className="ofr-dot" style={{ background: "#f2c46d" }} />
              Pentru restaurante și cafenele
            </span>
            <h2 className="ofr-h2" id="meniu-t">
              Meniu digital cu cod QR.
            </h2>
            <p className="ofr-lead">
              Clientul scanează codul de pe masă și vede meniul pe telefonul lui: poze, prețuri,
              ingrediente, alergeni. Fără meniu fizic, fără retipărire la fiecare schimbare de preț.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="ofr-menu-card">
              <div className="ofr-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/meniu-digital.webp"
                  alt="Meniu digital: carduri de produs cu poză, preț, descriere, calorii și marcaje de alergeni"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="ofr-menu-body">
                {/* Valorile nutriționale sunt argumentul care închide discuția
                    cu localurile serioase: e informație pe care meniul tipărit
                    nu o poate ține la zi. Stă lipită de poză, unde se vede. */}
                <div className="ofr-nutri">
                  <p className="ofr-nutri-lead">
                    <strong>Fiecare produs are și valori nutriționale.</strong> Calorii, alergeni
                    și marcaje — scrise mic, sub preț, exact ca în poză.
                  </p>
                  <div className="ofr-nutri-chips">
                    {MENU_NUTRITION.map((chip) => (
                      <span key={chip} className="ofr-nutri-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ofr-price-name">Ce primești</div>
                <ul className="ofr-list">
                  {MENU_INCLUDES.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="ofr-menu-price">
                  <div className="ofr-menu-price-item">
                    <div className="ofr-menu-price-label">La început</div>
                    <div className="ofr-menu-price-value">
                      {amount(MENU_PRICES.setup)} <span>lei</span>
                    </div>
                    <div className="ofr-menu-price-note">
                      Construiesc meniul complet și generez codul QR.
                    </div>
                  </div>
                  <div className="ofr-menu-price-item">
                    <div className="ofr-menu-price-label">Apoi</div>
                    <div className="ofr-menu-price-value">
                      {amount(MENU_PRICES.monthly)} <span>lei/lună</span>
                    </div>
                    <div className="ofr-menu-price-note">
                      Administrare completă, actualizări periodice.
                    </div>
                  </div>
                </div>

                <p className="ofr-note">
                  <strong>Tu nu faci nimic.</strong> Îmi trimiți pozele, prețurile și informațiile
                  despre produse. Eu construiesc meniul, îl aranjez și îl actualizez de fiecare dată
                  când schimbi un preț sau scoți un produs. Nu intri în niciun panou și nu ai nimic
                  de învățat.
                </p>

                <a
                  className="ofr-btn ofr-btn--wa ofr-btn--block"
                  style={{ marginTop: "1.25rem" }}
                  href={WA_MENU}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Vreau meniu digital
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- SINGUR VS. CU MINE --- */}
      <section className="ofr-section" id="singur" aria-labelledby="singur-t">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              De ce nu singur
            </span>
            <h2 className="ofr-h2" id="singur-t">
              „Îl fac singur pe o platformă."
            </h2>
            <p className="ofr-lead">
              Se poate. Doar că plătești oricum, lunar, la nesfârșit — și plătești cu timpul tău,
              care e mai scump decât site-ul.
            </p>
          </Reveal>

          <div className="ofr-vs">
            <Reveal>
              <div className="ofr-vs-col ofr-vs-col--bad">
                <div className="ofr-vs-title">Singur, pe o platformă</div>
                <ul className="ofr-list">
                  {DIY_CONS.map((item) => (
                    <li key={item}>
                      <XIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="ofr-vs-col ofr-vs-col--good">
                <div className="ofr-vs-title">Cu mine</div>
                <ul className="ofr-list">
                  {WITH_ME_PROS.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CUM LUCRĂM -- */}
      <section className="ofr-section ofr-band" aria-labelledby="pasi">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Cum lucrăm
            </span>
            <h2 className="ofr-h2" id="pasi">
              Patru pași. Atât.
            </h2>
          </Reveal>

          <ol className="ofr-steps">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} as="li" className="ofr-step" delay={i * 70}>
                <h3 className="ofr-h3">{step.title}</h3>
                <p className="ofr-p" style={{ marginTop: "0.25rem" }}>
                  {step.desc}
                </p>
                <span className="ofr-step-time">{step.time}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- DE CE EU -- */}
      <section className="ofr-section" aria-labelledby="dece">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              De ce eu
            </span>
            <h2 className="ofr-h2" id="dece">
              Ce primești, pe scurt.
            </h2>
          </Reveal>

          <div className="ofr-grid ofr-grid--2">
            {WHY_ME.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="ofr-card">
                  <h3 className="ofr-h3">{item.title}</h3>
                  <p className="ofr-p" style={{ marginTop: "0.375rem" }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ -- */}
      {/* <details> nativ: acordeon fără nicio linie de JavaScript. */}
      <section className="ofr-section ofr-band" aria-labelledby="intrebari">
        <div className="ofr-wrap">
          <Reveal className="ofr-head">
            <span className="ofr-eyebrow">
              <span className="ofr-dot" />
              Întrebări
            </span>
            <h2 className="ofr-h2" id="intrebari">
              Ce mă întreabă toți.
            </h2>
          </Reveal>

          <div className="ofr-faq">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 45}>
                <details className="ofr-q">
                  <summary>
                    {item.q}
                    <span className="ofr-q-plus" aria-hidden="true" />
                  </summary>
                  <div className="ofr-q-body">{renderAnswer(item.a)}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CTA FINAL -- */}
      <section className="ofr-section ofr-section--tight">
        <div className="ofr-wrap">
          <Reveal>
            <div className="ofr-final">
              <h2 className="ofr-h2">Ai nevoie de un site sau de un meniu digital?</h2>
              <p className="ofr-lead">
                Scrie-mi pe WhatsApp ce afacere ai. Îți spun în câteva minute ce se poate face și cât
                costă.
              </p>
              <div className="ofr-actions">
                <a
                  className="ofr-btn ofr-btn--wa ofr-btn--block"
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Vorbește cu mine
                </a>
                <a className="ofr-btn ofr-btn--ghost ofr-btn--block" href={`tel:${PHONE_TEL}`}>
                  <PhoneIcon />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <p className="ofr-reply">De obicei răspund în aceeași zi.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- FOOTER -- */}
      <footer className="ofr-foot">
        <div className="ofr-wrap">
          <p>
            <strong style={{ color: "var(--ofr-text)" }}>{LEGAL_NAME}</strong>
            <br />
            {CITY} · <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> ·{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>

          <div className="ofr-foot-links">
            <Link href="/termeni">Termeni și condiții</Link>
            <Link href="/confidentialitate">Politica de confidențialitate</Link>
            <Link href="/proiecte">Proiecte</Link>
          </div>

          {/* Obligatoriu pentru orice comerciant online din România. */}
          <div className="ofr-anpc">
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer nofollow">
              ANPC · SAL
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              ANPC · SOL
            </a>
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer nofollow">
              anpc.ro
            </a>
          </div>

          <p style={{ marginTop: "1.25rem" }}>
            © {new Date().getFullYear()} DaviX AI · davixai.website
          </p>
        </div>
      </footer>

      <StickyBar />
    </div>
  )
}
