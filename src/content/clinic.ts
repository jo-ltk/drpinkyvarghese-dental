export interface TreatmentObject {
  id: string;
  index: string;
  code: string;
  name: string;
  nature: string;
  duration: string;
  disciplines: string[];
  img: string;
  copy: string;
}

export interface StudyPart {
  text: string;
  tone: "strong" | "mute";
}

export interface StudyState {
  id: string;
  parts: StudyPart[];
}

export const clinic = {
  name: "Dr. Pinky Varghese",
  practice: "Private Dental Atelier",
  location: "Kochi, Kerala",
  tagline: "Where precision meets the luxury of unhurried time.",
  phoneDisplay: "+91 (0) 484 290 8800",
  phoneHref: "tel:+914842908800",
  whatsappHref:
    "https://wa.me/914842908800?text=Hello%20Dr.%20Pinky%20Varghese%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20private%20consultation.",
  email: "concierge@drpinkyvarghese.com",
  addressLines: [
    "Pavilion Suite 4, The Crescent",
    "Panampilly Nagar, Kochi, Kerala",
  ],
  hours: "Monday – Saturday · By Confirmed Appointment Only",
} as const;

export const navLinks = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Index", href: "#treatments" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Atelier", href: "#atelier" },
  { label: "Spaces", href: "#spaces" },
  { label: "Consultation", href: "#visit" },
];

/** Full-bleed architectural environment for the hero */
export const HERO_ENVIRONMENT =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";

/** Foreground architectural sculptural composition for the hero */
export const HERO_FIGURES =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=85";

export const HERO_FIGURES_MOBILE =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85";

/** Curated Treatment Index — Pinned horizontal scroll plates */
export const TREATMENTS: TreatmentObject[] = [
  {
    id: "treat-001",
    index: "001",
    code: "DX·BIO",
    name: "Biomimetic Diagnostics",
    nature: "High-magnification microscopy · Occlusal balance",
    duration: "60 to 90 min",
    disciplines: [
      "Microscopic optical assessment",
      "Digital occlusal kinetics",
      "Biological risk profiling",
    ],
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    copy: "High-resolution digital mapping and dynamic occlusion review. Every finding is explored together on expansive calibrated displays before any intervention is conceived.",
  },
  {
    id: "treat-002",
    index: "002",
    code: "RES·CER",
    name: "Ceramic Inlays & Veneers",
    nature: "Polychromatic porcelain · Micron margins",
    duration: "Bespoke sittings",
    disciplines: [
      "Sub-micron adhesive preparation",
      "Translucent enamel replication",
      "Zero unnecessary reduction",
    ],
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    copy: "Restorations engineered to mirror the physical flexure, refractive index, and durability of native enamel — bonded with microscopic precision.",
  },
  {
    id: "treat-003",
    index: "003",
    code: "ORT·ALN",
    name: "Facial Harmony & Alignment",
    nature: "Airway-aware ergonomics · Minimalist aligners",
    duration: "Phased precision",
    disciplines: [
      "Facial symmetry mapping",
      "Joint stability guidance",
      "Unhurried biological movement",
    ],
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    copy: "Carefully calibrated tooth movement planned around overall facial proportions, breathing ergonomics, and lifelong craniomandibular stability.",
  },
  {
    id: "treat-004",
    index: "004",
    code: "PRV·CALM",
    name: "Sensory Guided Prophylaxis",
    nature: "Airflow warm micro-mist · Acoustic calm",
    duration: "45 to 60 min",
    disciplines: [
      "Guided biofilm therapy",
      "Zero-scrape warm water air polish",
      "Preventive remineralization",
    ],
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    copy: "Gentle warm ultrasonic and erythritol airflow prophylaxis in an acoustic space designed to quiet autonomic nervous system reflexes.",
  },
  {
    id: "treat-005",
    index: "005",
    code: "LON·BIO",
    name: "Tissue Architecture & Longevity",
    nature: "Periodontal conservation · Cellular renewal",
    duration: "Individualized protocol",
    disciplines: [
      "Micro-connective tissue support",
      "Biocompatible mineralization",
      "Decade-horizon monitoring",
    ],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    copy: "Proactive biological scaffolding designed to safeguard your native bone, gingival health, and dentition against aging and systemic stress.",
  },
];

/** Orbital Anatomy Study configuration */
export const STUDY = {
  title: "Biomimetic Ceramic Restoration",
  img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85",
  companionImg:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
  fragmentImg:
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=85",
  states: [
    {
      id: "conservation",
      parts: [
        { text: "Native enamel structure", tone: "strong" },
        { text: " is preserved down to the micron — ", tone: "mute" },
        { text: "zero over-reduction", tone: "strong" },
        { text: " of living biological tissue.", tone: "mute" },
      ],
    },
    {
      id: "bonding",
      parts: [
        { text: "Multi-layer ceramics", tone: "strong" },
        { text: " replicate the light dispersion of dentin. ", tone: "mute" },
        { text: "Microscopic adhesive margins", tone: "strong" },
        { text: " sealed under high magnification.", tone: "mute" },
      ],
    },
    {
      id: "longevity",
      parts: [
        { text: "Restorations flex naturally", tone: "strong" },
        { text: " with normal chewing kinetics. Built for ", tone: "mute" },
        { text: "unhurried longevity", tone: "strong" },
        { text: " that outlasts trends.", tone: "mute" },
      ],
    },
  ] satisfies StudyState[],
};

/** Spatial Chapters / Lookbook */
export const LOOKBOOK = [
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 01 — The Consultation Lounge, warm travertine & dialogue",
    speed: 0.12,
  },
  {
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 02 — The Daylight Operatory, acoustic dampening & daylight",
    speed: -0.09,
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 03 — The Rest Sanctuary, quiet transition & organic tea",
    speed: 0.14,
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 04 — The Ceramic Bench, handcrafted precision margins",
    speed: -0.11,
  },
];

export const VOICES = [
  {
    quote:
      "For the first time, a dentist spent an hour simply listening to my concerns and examining my bite kinematics before touching an instrument.",
    name: "A. Kurian",
    note: "Restorative Patient · Kochi",
  },
  {
    quote:
      "The clinic feels like an art pavilion rather than a dental surgery. The unhurried pace transformed my relationship with oral health.",
    name: "S. Menon",
    note: "Preventive Care · Aluva",
  },
  {
    quote:
      "Dr. Pinky Varghese conserved a tooth three other clinics wanted to grind down for a crown. That was three years ago, and it remains flawless.",
    name: "R. Nair",
    note: "Biomimetic Restoration · Ernakulam",
  },
];
