import React, { useMemo, useState } from "react";

/** ===================== Config / Contenu ===================== */

const BRAND = {
  name: "Assanabel Traiteur",
  tagline: "Saveurs libanaises, événements sur mesure",
  phone: "+33 1 23 45 67 89",
  email: "commercial@assanabelparis.com",
  city: "Paris",
};

// Images principales (accueil)
const IMAGE_URLS = {
  hero: "/assets/fond.png",                // ton fond d'écran
  mezzes: "/assets/mezzes.jpg",            // visuel générique (mets ce que tu veux)
  verrines: "/assets/hommos-verrine.png",  // visuel représentatif
  boxes: "/assets/box-agneau.webp",        // visuel représentatif
};

// Prix / barèmes
const PRICES = {
  pitaPerPerson: 0.5,
  cutleryPerPerson: 1,
  baklavaPerPerson: 2,
  verrineGlassPerPerson: 3,
};

// Verrines : 4–12 mezzés/pers → prix/pers
const VERRINE_TIERS = { 4: 12, 5: 15, 6: 18, 7: 21, 8: 24, 9: 27, 10: 30, 11: 33, 12: 36 };

// Mezzé Box (Vegan → Agneau)
const MEZZE_BOXES = [
  { id: "veg", name: "Mezzés Box Végétarien", price: 18 },
  { id: "agneau", name: "Mezzés Box Agneau", price: 19 },
  { id: "gf", name: "Mezzés Box Gluten Free", price: 18 },
  { id: "poulet", name: "Mezzés Box Poulet", price: 19 },
  { id: "kefta", name: "Mezzés Box Kefta (Viande hachée)", price: 19 },
  { id: "veau", name: "Mezzés Box Veau", price: 19 },
];

// Visuels Box
const BOX_IMAGES = {
  veg: "/assets/box-vegetarien.png",
  agneau: "/assets/box-agneau.webp",
  gf: "/assets/box-gf.png",
  poulet: "/assets/box-poulet.webp",
  kefta: "/assets/box-kefta.webp",
  veau: "/assets/box-veau.webp",
};

// Verrines & visuels
const VERRINES = [
  "Hommos",
  "Moutabal",
  "Taboulé",
  "Labné",
  "Patata Hara",
  "Rekak",
  "Falafel",
  "Fatayer",
  "Sambousek Viande",
];
const VERRINE_IMAGES = {
  Hommos: "/assets/hommos-verrine.png",
  Moutabal: "/assets/moutabal-verrine.png",
  Taboulé: "/assets/taboule-verrine.png",
  Labné: "/assets/labne-verrine.png",
  "Patata Hara": "/assets/patata-verrine.png",
  Rekak: "/assets/rekak-verrine.png",
  Falafel: "/assets/falafel-verrine.png",
  Fatayer: "/assets/fatayer-verrine.png",
  "Sambousek Viande": "/assets/sambousek-verrine.png",
};

// Plateaux & visuels
const PLATEAUX_MEZZES = [
  "Hommos",
  "Moutabal",
  "Taboulé",
  "Labné",
  "Patata Hara",
  "Rekak",
  "Falafel",
  "Fatayer",
  "Sambousek Viande",
  "Soujouk",
  "Kafta Boulette",
];
const PLATEAU_IMAGES = {
  Hommos: "/assets/hommos-plateau.jpg",
  Moutabal: "/assets/moutabal-plateau.jpg",
  Taboulé: "/assets/taboule-plateau.jpg",
  Labné: "/assets/labne-plateau.jpg",
  "Patata Hara": "/assets/patata-plateau.jpg",
  Rekak: "/assets/rekak-plateau.jpg",
  Falafel: "/assets/falafel-plateau.jpg",
  Fatayer: "/assets/fatayer-plateau.jpg",
  "Sambousek Viande": "/assets/sambousek-plateau.jpg",
  Soujouk: "/assets/soujouk-plateau.jpg",
  "Kafta Boulette": "/assets/kafta-plateau.jpg",
};

/** ===================== Helpers ===================== */

const money = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const classNames = (...c) => c.filter(Boolean).join(" ");

/** ===================== UI de base ===================== */

function Nav({ onNavigate, route, cartCount }) {
  const links = [
    { id: "home", label: "Accueil" },
    { id: "verrines", label: "Verrines" },
    { id: "boxes", label: "Mezzés Box" },
    { id: "plateaux", label: "Plateaux à partager" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">A</span>
          <div className="leading-tight">
            <div className="text-sm tracking-wider text-white/80">{BRAND.name}</div>
            <div className="text-xs text-white/60">{BRAND.tagline}</div>
          </div>
        </div>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className={classNames(
                "text-sm uppercase tracking-wide transition",
                route === l.id ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button onClick={() => onNavigate("checkout")} className="rounded-full bg-white/10 px-4 py-2 text-white ring-1 ring-white/20">
          🧺 Panier {cartCount > 0 && <span className="ml-2 rounded-full bg-emerald-500 px-2 text-xs">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

function Hero({ onOrder }) {
  return (
    <section className="relative isolate min-h-[88vh] w-full overflow-hidden bg-neutral-950 text-white">
      <img src={IMAGE_URLS.hero} alt="Hero" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-start justify-center gap-6 px-4 py-24">
        <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-wider text-white/80 ring-1 ring-white/20">
          À partir de 12 personnes — livraison Île-de-France
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
          Élevez vos événements avec les <span className="text-emerald-400">mezzés</span> d’Assanabel
        </h1>
        <p className="max-w-xl text-white/80">Cocktails, plateaux à partager, verrines et menus sur mesure.</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a href={`mailto:${BRAND.email}?subject=Demande%20de%20devis`} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900">
            Contacter un commercial
          </a>
          <button onClick={onOrder} className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white">
            Commander en ligne
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}

function CategoryTiles({ onNavigate }) {
  const tiles = [
    { id: "plateaux", title: "Plateaux à partager", subtitle: "Idéal réunion", image: IMAGE_URLS.mezzes },
    { id: "verrines", title: "Cocktail verrines", subtitle: "Effet waouh", image: IMAGE_URLS.verrines },
    { id: "boxes", title: "Mezzés Box", subtitle: "Plateaux repas", image: IMAGE_URLS.boxes },
  ];
  return (
    <section className="mx-auto -mt-24 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
      {tiles.map((t) => (
        <button
          key={t.id}
          onClick={() => onNavigate(t.id)}
          className="group relative isolate overflow-hidden rounded-3xl bg-neutral-900 text-left ring-1 ring-white/10"
        >
          <img src={t.image} alt={t.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" />
          <div className="relative space-y-2 p-6">
            <span className="inline-flex rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wide text-white/80 ring-1 ring-white/20">{t.subtitle}</span>
            <h3 className="text-2xl font-semibold text-white drop-shadow">{t.title}</h3>
            <p className="text-white/75">Voir les options →</p>
          </div>
        </button>
      ))}
    </section>
  );
}

/** ===================== Petits composants ===================== */

const HeaderBack = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-semibold">{title}</h2>
    <p className="mt-1 text-neutral-600">{subtitle}</p>
  </div>
);

const CartCard = ({ title, total, children }) => (
  <div className="space-y-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-neutral-200">
    <div className="flex items-center justify-between">
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="rounded-full bg-neutral-900 px-3 py-1 text-sm font-semibold text-white">{money(total)}</div>
    </div>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">{label}</span>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
    />
  </label>
);

const Textarea = ({ value, setValue, placeholder }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">Note</span>
    <textarea
      rows={4}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
    />
  </label>
);

const Toggle = ({ label, value, setValue, disabled = false }) => (
  <label className={"flex items-center justify-between rounded-2xl border p-3 text-sm " + (disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer")}>
    <span>{label}</span>
    <input type="checkbox" checked={value} disabled={disabled} onChange={(e) => setValue(e.target.checked)} />
  </label>
);

const NumberField = ({ label, value, setValue, min = 0, max = Infinity }) => (
  <label className="rounded-2xl border p-4">
    <span className="block text-xs font-semibold uppercase tracking-wide text-neutral-600">{label}</span>
    <div className="mt-2 inline-flex overflow-hidden rounded-xl ring-1 ring-neutral-200">
      <button type="button" onClick={() => setValue(Math.max(min, (value || 0) - 1))} className="px-3 py-2 text-sm hover:bg-neutral-50">−</button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value || 0);
          setValue(Math.max(min, Math.min(max, v)));
        }}
        className="w-20 border-x px-3 py-2 text-center text-sm"
      />
      <button type="button" onClick={() => setValue(Math.min(max, (value || 0) + 1))} className="px-3 py-2 text-sm hover:bg-neutral-50">+</button>
    </div>
  </label>
);

const Qty = ({ value, setValue }) => (
  <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-neutral-200">
    <button type="button" onClick={() => setValue(Math.max(0, (value || 0) - 1))} className="px-3 py-2 text-sm hover:bg-neutral-50">−</button>
    <input type="number" min={0} value={value || 0} onChange={(e) => setValue(Math.max(0, parseInt(e.target.value || 0)))} className="w-16 border-x px-3 py-2 text-center text-sm" />
    <button type="button" onClick={() => setValue((value || 0) + 1)} className="px-3 py-2 text-sm hover:bg-neutral-50">+</button>
  </div>
);

/** ===================== Pages ===================== */

// Verrines (bornes 4–12 + options grisées < 12 pers)
function VerrinesPage({ onAddToCart }) {
  const [persons, setPersons] = useState(12);
  const [perPersonCount, setPerPersonCount] = useState(6);
  const [selection, setSelection] = useState([]);
  const [notes, setNotes] = useState("");
  const [glass, setGlass] = useState(false);
  const [pita, setPita] = useState(false);
  const [cutlery, setCutlery] = useState(false);
  const [baklava, setBaklava] = useState(false);

  const pricePerPerson = VERRINE_TIERS[Math.min(12, Math.max(4, perPersonCount))] || 0;
  const base = (persons || 0) * pricePerPerson;

  const addons = useMemo(() => {
    const p = persons || 0;
    let total = 0;
    if (glass) total += PRICES.verrineGlassPerPerson * p;
    if (pita) total += PRICES.pitaPerPerson * p;
    if (cutlery) total += PRICES.cutleryPerPerson * p;
    if (baklava) total += PRICES.baklavaPerPerson * p;
    return total;
  }, [persons, glass, pita, cutlery, baklava]);

  const disabledOptions = persons < 12;

  const toggle = (name) =>
    setSelection((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const handleAdd = () =>
    onAddToCart({
      title: "Cocktail Verrines",
      details: `${persons} pers • ${perPersonCount} mezzés/pers (${money(pricePerPerson)}/pers) • ${selection.join(", ") || "Sélection à préciser"}`,
      total: base + addons,
    });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <HeaderBack title="Choix Verrines" subtitle="Composez votre cocktail verrines" />
      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <NumberField label="Nombre de personnes" value={persons} setValue={setPersons} min={12} />
            <NumberField label="Verrines / personne" value={perPersonCount} setValue={setPerPersonCount} min={4} max={12} />
          </div>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Sélection de verrines</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {VERRINES.map((v) => (
                <label key={v} className={classNames("flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm", selection.includes(v) ? "border-emerald-500 bg-emerald-50" : "border-neutral-200")}>
                  <input type="checkbox" className="mr-1" checked={selection.includes(v)} onChange={() => toggle(v)} />
                  <img src={VERRINE_IMAGES[v]} alt={v} className="h-14 w-14 rounded-md object-cover" />
                  <span>{v}</span>
                </label>
              ))}
            </div>
            <Textarea value={notes} setValue={setNotes} placeholder="Note pour les proportions, allergies, logistique…" />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Options</legend>
            <Toggle disabled={disabledOptions} label={`Verrines en verre (+${money(PRICES.verrineGlassPerPerson)}/pers)`} value={glass} setValue={setGlass} />
            <Toggle disabled={disabledOptions} label={`Pain pita libanais (+${money(PRICES.pitaPerPerson)}/pers)`} value={pita} setValue={setPita} />
            <Toggle disabled={disabledOptions} label={`Couverts (+${money(PRICES.cutleryPerPerson)}/pers)`} value={cutlery} setValue={setCutlery} />
            <Toggle disabled={disabledOptions} label={`Baklavas (+${money(PRICES.baklavaPerPerson)}/pers)`} value={baklava} setValue={setBaklava} />
            {disabledOptions && (<p className="text-xs text-neutral-500">Options disponibles à partir de 12 personnes.</p>)}
          </fieldset>
        </div>
        <aside className="space-y-4">
          <CartCard title="Verrines" total={base + addons}>
            <div className="text-sm text-neutral-600">Base: {persons} pers × {money(pricePerPerson)} = <strong>{money(base)}</strong></div>
            <ul className="mt-2 text-sm">
              {glass && <li>Verrines en verre ({money(PRICES.verrineGlassPerPerson)}/pers)</li>}
              {pita && <li>Pain pita ({money(PRICES.pitaPerPerson)}/pers)</li>}
              {cutlery && <li>Couverts ({money(PRICES.cutleryPerPerson)}/pers)</li>}
              {baklava && <li>Baklavas ({money(PRICES.baklavaPerPerson)}/pers)</li>}
              {!glass && !pita && !cutlery && !baklava && <li className="text-neutral-500">Aucune option</li>}
            </ul>
            <button onClick={handleAdd} className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-white hover:bg-black">Ajouter au panier</button>
          </CartCard>
        </aside>
      </div>
    </section>
  );
}

// Mezzé Box
function BoxesPage({ onAddToCart }) {
  const [qty, setQty] = useState(Object.fromEntries(MEZZE_BOXES.map((b) => [b.id, 0])));
  const [pita, setPita] = useState(false);
  const [cutlery, setCutlery] = useState(false);
  const [baklava, setBaklava] = useState(false);

  const total = useMemo(() => {
    const base = MEZZE_BOXES.reduce((s, b) => s + b.price * (qty[b.id] || 0), 0);
    const persons = Object.values(qty).reduce((s, n) => s + (n || 0), 0);
    let add = 0;
    if (pita) add += PRICES.pitaPerPerson * persons;
    if (cutlery) add += PRICES.cutleryPerPerson * persons;
    if (baklava) add += PRICES.baklavaPerPerson * persons;
    return base + add;
  }, [qty, pita, cutlery, baklava]);

  const handleAdd = () => {
    const lines = MEZZE_BOXES.filter((b) => (qty[b.id] || 0) > 0).map((b) => `${b.name} × ${qty[b.id]}`).join(" • ");
    onAddToCart({ title: "Mezzés Box", details: lines || "Aucune sélection", total });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <HeaderBack title="Choix Mezzés Box" subtitle="Sélectionnez vos plateaux repas" />
      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MEZZE_BOXES.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <img src={BOX_IMAGES[b.id]} alt={b.name} className="h-14 w-20 rounded-md object-cover" />
                  <div>
                    <div className="font-medium">{b.name}</div>
                    <div className="text-sm text-neutral-600">{money(b.price)} / pers</div>
                  </div>
                </div>
                <Qty value={qty[b.id]} setValue={(v) => setQty((q) => ({ ...q, [b.id]: v }))} />
              </div>
            ))}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Options</legend>
            <Toggle label={`Pain pita libanais (+${money(PRICES.pitaPerPerson)}/pers)`} value={pita} setValue={setPita} />
            <Toggle label={`Couverts (+${money(PRICES.cutleryPerPerson)}/pers)`} value={cutlery} setValue={setCutlery} />
            <Toggle label={`Baklavas (+${money(PRICES.baklavaPerPerson)}/pers)`} value={baklava} setValue={setBaklava} />
          </fieldset>
        </div>
        <aside>
          <CartCard title="Mezzés Box" total={total}>
            <div className="space-y-1 text-sm">
              {MEZZE_BOXES.map(
                (b) =>
                  (qty[b.id] || 0) > 0 && (
                    <div key={b.id}>
                      {b.name} × {qty[b.id]} ({money(b.price)} / pers)
                    </div>
                  )
              )}
              {Object.values(qty).every((n) => (n || 0) === 0) && (
                <div className="text-neutral-500">Aucune sélection</div>
              )}
            </div>
            <button onClick={handleAdd} className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-white hover:bg-black">Ajouter au panier</button>
          </CartCard>
        </aside>
      </div>
    </section>
  );
}

// Plateaux à partager
function PlateauxPage({ onAddToCart }) {
  const [mode, setMode] = useState("6");
  const [customList, setCustomList] = useState([]);
  const [persons, setPersons] = useState(12);
  const [pita, setPita] = useState(false);
  const [cutlery, setCutlery] = useState(false);
  const [baklava, setBaklava] = useState(false);

  const basePricePerPerson = 18;
  const total = useMemo(() => {
    const base = basePricePerPerson * (persons || 0);
    let add = 0;
    if (pita) add += PRICES.pitaPerPerson * (persons || 0);
    if (cutlery) add += PRICES.cutleryPerPerson * (persons || 0);
    if (baklava) add += PRICES.baklavaPerPerson * (persons || 0);
    return base + add;
  }, [persons, pita, cutlery, baklava]);

  const toggle = (name) =>
    setCustomList((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const handleAdd = () =>
    onAddToCart({
      title: `Plateaux à partager (${mode} plateaux visuels)`,
      details: `${persons} pers • Mezzés: ${customList.join(", ") || "À définir"}`,
      total,
    });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <HeaderBack title="Choix Plateau à partager" subtitle="Créez votre assortiment de mezzés" />
      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <NumberField label="Nombre de personnes" value={persons} setValue={setPersons} min={12} />
            <div className="rounded-2xl border p-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-600">Visuel plateau</label>
              <div className="mt-2 inline-flex overflow-hidden rounded-xl ring-1 ring-neutral-200">
                {[{ id: "6", label: "6 plateaux" }, { id: "12", label: "12 plateaux" }].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setMode(o.id)}
                    className={classNames("px-3 py-2 text-sm", mode === o.id ? "bg-neutral-900 text-white" : "bg-white text-neutral-700")}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700">Liste des mezzés</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {PLATEAUX_MEZZES.map((m) => (
                <label key={m} className={classNames("flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm", customList.includes(m) ? "border-emerald-500 bg-emerald-50" : "border-neutral-200")}>
                  <input type="checkbox" className="mr-1" checked={customList.includes(m)} onChange={() => toggle(m)} />
                  <img src={PLATEAU_IMAGES[m]} alt={m} className="h-14 w-14 rounded-md object-cover" />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Options</legend>
            <Toggle label={`Pain pita libanais (+${money(PRICES.pitaPerPerson)}/pers)`} value={pita} setValue={setPita} />
            <Toggle label={`Couverts (+${money(PRICES.cutleryPerPerson)}/pers)`} value={cutlery} setValue={setCutlery} />
            <Toggle label={`Baklavas (+${money(PRICES.baklavaPerPerson)}/pers)`} value={baklava} setValue={setBaklava} />
          </fieldset>
        </div>
        <aside>
          <CartCard title="Plateaux à partager" total={total}>
            <div className="text-sm text-neutral-600">Visuel: {mode} plateaux</div>
            <ul className="mt-2 text-sm">
              {customList.map((m) => (<li key={m}>{m}</li>))}
              {customList.length === 0 && <li className="text-neutral-500">Aucune sélection</li>}
            </ul>
            <button onClick={handleAdd} className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-white hover:bg-black">Ajouter au panier</button>
          </CartCard>
        </aside>
      </div>
    </section>
  );
}

// Checkout
function CheckoutPage({ cart, onRemove, onConfirm }) {
  const total = cart.reduce((s, i) => s + i.total, 0);
  const [kind, setKind] = useState("particulier");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    deliveryInfo: "",
    billing: "",
    date: "",
    slot: "",
    contact: "",
    note: "",
    payment: "cb",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <HeaderBack title="Coordonnées & Paiement" subtitle="Finalisez votre commande" />
      <div className="grid gap-8 md:grid-cols-[1fr_420px]">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onConfirm({ ...form, kind }); }}>
          <div className="flex flex-wrap gap-3">
            {[{ id: "particulier", label: "Particulier" }, { id: "pro", label: "Professionnel" }].map((o) => (
              <button
                type="button"
                key={o.id}
                onClick={() => setKind(o.id)}
                className={classNames("rounded-full px-4 py-2 text-sm ring-1", kind === o.id ? "bg-neutral-900 text-white ring-neutral-900" : "bg-white text-neutral-700 ring-neutral-300")}
              >
                {o.label}
              </button>
            ))}
          </div>
          <Input label="Nom / Société" value={form.name} onChange={(v) => set("name", v)} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} />
            <Input label="Téléphone" value={form.phone} onChange={(v) => set("phone", v)} />
          </div>
          <Input label="Adresse de livraison" value={form.deliveryAddress} onChange={(v) => set("deliveryAddress", v)} />
          <Input label="Infos de livraison (codes, étages…)" value={form.deliveryInfo} onChange={(v) => set("deliveryInfo", v)} />
          <Input label="Infos de facturation" value={form.billing} onChange={(v) => set("billing", v)} />
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Date" type="date" value={form.date} onChange={(v) => set("date", v)} />
            <Input label="Créneau" placeholder="ex. 11h-12h" value={form.slot} onChange={(v) => set("slot", v)} />
            <Input label="Personne à contacter" value={form.contact} onChange={(v) => set("contact", v)} />
          </div>
          <Textarea value={form.note} setValue={(v) => set("note", v)} placeholder="Message au traiteur (allergies, dressage, timing…)" />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-600">Paiement</label>
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
              {[{ id: "cb", label: "Carte bancaire" }, { id: "virement", label: "Virement" }, { id: "surplace", label: "Sur place" }].map((p) => (
                <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm">
                  <input type="radio" name="payment" checked={form.payment === p.id} onChange={() => set("payment", p.id)} />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
          <button className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-white">Payer maintenant — {money(total)}</button>
        </form>
        <aside className="space-y-4">
          <CartSummary cart={cart} onRemove={onRemove} />
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
            Suite au paiement: confirmation et facture PDF envoyées par email (simulation).
          </div>
        </aside>
      </div>
    </section>
  );
}

function CartSummary({ cart, onRemove }) {
  const total = cart.reduce((s, i) => s + i.total, 0);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-neutral-200">
      <h4 className="mb-3 text-lg font-semibold">Récapitulatif</h4>
      <ul className="space-y-3">
        {cart.length === 0 && <li className="text-sm text-neutral-500">Votre panier est vide.</li>}
        {cart.map((i, idx) => (
          <li key={idx} className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-sm text-neutral-600">{i.details}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{money(i.total)}</div>
              <button onClick={() => onRemove(idx)} className="text-xs text-red-600 hover:underline">Retirer</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-3 text-right text-lg font-semibold">Total: {money(total)}</div>
    </div>
  );
}

/** ===================== App ===================== */

export default function App() {
  const [route, setRoute] = useState("home");
  const [cart, setCart] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const onNavigate = (to) => { setRoute(to); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addToCart = (item) => setCart((c) => [...c, item]);
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));

  const content = () => {
    switch (route) {
      case "verrines": return <VerrinesPage onAddToCart={addToCart} />;
      case "boxes": return <BoxesPage onAddToCart={addToCart} />;
      case "plateaux": return <PlateauxPage onAddToCart={addToCart} />;
      case "checkout":
        return confirmation ? (
          <section className="mx-auto max-w-3xl px-4 py-16 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-500/10 p-3 ring-1 ring-emerald-500">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div>
            </div>
            <h2 className="text-3xl font-semibold">Merci !</h2>
            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">Votre commande est confirmée. Un e-mail de confirmation vous a été envoyé.</p>
          </section>
        ) : (
          <CheckoutPage cart={cart} onRemove={removeFromCart} onConfirm={(info) => setConfirmation(info)} />
        );
      case "contact": return <ContactSection />;
      default:
        return (
          <>
            <Hero onOrder={() => onNavigate("plateaux")} />
            <CategoryTiles onNavigate={onNavigate} />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav onNavigate={onNavigate} route={route} cartCount={cart.length} />
      <main className="pt-20">{content()}</main>
      <Footer />
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto my-20 max-w-6xl overflow-hidden rounded-3xl bg-neutral-950 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative"><img src={IMAGE_URLS.mezzes} alt="Assanabel — buffet" className="h-full w-full object-cover opacity-70" /></div>
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-semibold">Évènement sur mesure</h3>
          <p className="mt-2 text-white/70">Parlez-nous de votre projet (cocktail, séminaire, mariage…).</p>
          <div className="mt-6 grid gap-4">
            <a href={`mailto:${BRAND.email}`} className="rounded-xl bg-white px-4 py-3 text-center font-medium text-neutral-900 hover:bg-neutral-100">{BRAND.email}</a>
            <a href={`tel:${BRAND.phone}`} className="rounded-xl bg-white/10 px-4 py-3 text-center font-medium text-white ring-1 ring-white/20 hover:bg-white/20">{BRAND.phone}</a>
          </div>
          <p className="mt-4 text-xs text-white/60">Basé à {BRAND.city}. Livraison Île-de-France uniquement.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold">{BRAND.name}</div>
          <p className="mt-2 text-sm text-neutral-600">{BRAND.tagline}</p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Commander</div>
          <ul className="mt-2 space-y-2 text-sm text-neutral-600">
            <li>Verrines</li>
            <li>Mezzés Box</li>
            <li>Plateaux à partager</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-neutral-700">Contact</div>
          <ul className="mt-2 space-y-2 text-sm text-neutral-600">
            <li>{BRAND.email}</li>
            <li>{BRAND.phone}</li>
            <li>Paris (IDF)</li>
          </ul>
        </div>
        <div className="text-sm text-neutral-500">© {new Date().getFullYear()} — Tous droits réservés.</div>
      </div>
    </footer>
  );
}
