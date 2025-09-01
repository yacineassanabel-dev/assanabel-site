/*
  Assanabel Traiteur — site vitrine + tunnel de commande (SPA)
  Version clean avec images dans /public/assets
*/

import React, { useState, useMemo } from "react";

/** ---------------------- Config / Contenu ---------------------- */

const BRAND = {
  name: "Assanabel Traiteur",
  tagline: "Saveurs libanaises, événements sur mesure",
  phone: "+33 1 23 45 67 89",
  email: "commercial@assanabelparis.com",
  city: "Paris",
};

// =======================
// IMAGES PRINCIPALES
// =======================
const IMAGE_URLS = {
  hero: "/assets/fond.png",
  mezzes: "/assets/falafel-verrine.png", // visuel générique
  verrines: "/assets/hommos-verrine.png",
  boxes: "/assets/box-agneau.png",
};

// =======================
// VERRINES
// =======================
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

// =======================
// PLATEAUX
// =======================
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
  Soujouk: "/assets/soujouk-plateau.png",
  "Kafta Boulette": "/assets/kafta-plateau.jpg",
};

// =======================
// BOXES
// =======================
const BOX_IMAGES = {
  veg: "/assets/box-vegetarien.png",
  agneau: "/assets/box-agneau.png",
  gf: "/assets/box-gf.png",
  poulet: "/assets/box-poulet.png",
  kefta: "/assets/box-kefta.png",
  veau: "/assets/box-veau.png",
  classique: "/assets/box-classique.png",
};

// Prix et règles commerciales
const PRICES = {
  pitaPerPerson: 0.5,
  cutleryPerPerson: 1,
  baklavaPerPerson: 2,
  verrineGlassPerPerson: 3,
};

const VERRINE_TIERS = { 4: 12, 5: 15, 6: 18, 7: 21, 8: 24, 9: 27, 10: 30, 11: 33, 12: 36 };

const MEZZE_BOXES = [
  { id: "veg", name: "Mezzés Box Végétarien", price: 18 },
  { id: "agneau", name: "Mezzés Box Agneau", price: 19 },
  { id: "gf", name: "Mezzés Box Gluten Free", price: 18 },
  { id: "poulet", name: "Mezzés Box Poulet", price: 19 },
  { id: "kefta", name: "Mezzés Box Kefta", price: 19 },
  { id: "veau", name: "Mezzés Box Veau", price: 19 },
];

/** ---------------------- Helpers ---------------------- */
const money = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

function classNames(...cn) {
  return cn.filter(Boolean).join(" ");
}

/** ---------------------- UI Components ---------------------- */

const Hero = () => (
  <section
    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
    style={{ backgroundImage: `url(${IMAGE_URLS.hero})` }}
  >
    <div className="bg-black/50 p-8 rounded-2xl">
      <h1 className="text-4xl font-bold">{BRAND.name}</h1>
      <p className="text-xl">{BRAND.tagline}</p>
    </div>
  </section>
);

const BoxCard = ({ id, name, price }) => (
  <div className="rounded-2xl shadow p-4 bg-white">
    <img src={BOX_IMAGES[id] || BOX_IMAGES.classique} alt={name} className="w-full h-40 object-cover rounded-xl" />
    <h3 className="mt-2 font-semibold">{name}</h3>
    <p>{money(price)}</p>
  </div>
);

const VerrineSelector = ({ value, onChange }) => {
  const options = Object.keys(VERRINE_TIERS);
  return (
    <div>
      <h3 className="font-semibold mb-2">Nombre de verrines (4–12)</h3>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="border rounded p-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt} mezzés — {money(VERRINE_TIERS[opt])} / pers
          </option>
        ))}
      </select>
    </div>
  );
};

/** ---------------------- Page principale ---------------------- */

export default function App() {
  const [verrines, setVerrines] = useState(4);

  const total = useMemo(() => VERRINE_TIERS[verrines] * 12, [verrines]);

  return (
    <div className="font-sans text-neutral-800">
      <Hero />

      <section className="p-8 bg-neutral-50">
        <h2 className="text-2xl font-bold mb-4">Nos Mezzé Boxes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {MEZZE_BOXES.map((box) => (
            <BoxCard key={box.id} {...box} />
          ))}
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Composez vos Verrines</h2>
        <VerrineSelector value={verrines} onChange={setVerrines} />
        <p className="mt-4 font-semibold">Total pour 12 pers : {money(total)}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {Object.entries(VERRINE_IMAGES).map(([label, img]) => (
            <div key={label} className="bg-white rounded-xl shadow p-2">
              <img src={img} alt={label} className="w-full h-32 object-cover rounded-lg" />
              <p className="text-center mt-1 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
