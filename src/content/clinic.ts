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
  practice: "Implantology & Smile Design",
  location: "Kochi, Kerala",
  tagline: "Implantology and smile design — refined, unhurried, personal.",
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
  { label: "Clinician", href: "#dentist" },
  { label: "Spaces", href: "#spaces" },
  { label: "Consultation", href: "#visit" },
];

/** Full-bleed clinic atmosphere for the hero */
export const HERO_ENVIRONMENT =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=85";

/** Editorial doctor / clinic portrait for the hero stage */
export const HERO_FIGURES =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=85";

export const HERO_FIGURES_MOBILE =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85";

/** Curated Treatment Index — Pinned horizontal scroll plates */
export const TREATMENTS: TreatmentObject[] = [
  {
    id: "treat-001",
    index: "001",
    code: "IMP·DES",
    name: "Implant Consultation",
    nature: "Digital planning · Personalised pathway",
    duration: "60 to 90 min",
    disciplines: [
      "Diagnostic imaging review",
      "Treatment pathway mapping",
      "Restorative planning dialogue",
    ],
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    copy: "A calm, thorough consultation to understand your goals, review imaging, and outline a clear implantology pathway — without pressure or haste.",
  },
  {
    id: "treat-002",
    index: "002",
    code: "SML·DES",
    name: "Smile Design Dialogue",
    nature: "Proportions · Shade · Harmony",
    duration: "Bespoke sittings",
    disciplines: [
      "Facial proportion review",
      "Shade & form exploration",
      "Preview-led planning",
    ],
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    copy: "An editorial approach to smile aesthetics — balancing facial harmony, enamel character, and natural light so the result feels unmistakably yours.",
  },
  {
    id: "treat-003",
    index: "003",
    code: "RES·CER",
    name: "Ceramic Restorations",
    nature: "Porcelain veneers · Micron margins",
    duration: "Phased precision",
    disciplines: [
      "Conservative preparation",
      "Translucent ceramic layering",
      "Margin refinement",
    ],
    img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
    copy: "Restorations crafted to mirror natural enamel — planned carefully, refined under focus, and finished for lasting quiet confidence.",
  },
  {
    id: "treat-004",
    index: "004",
    code: "PRV·CALM",
    name: "Gentle Preventive Care",
    nature: "Comfort-led prophylaxis · Calm space",
    duration: "45 to 60 min",
    disciplines: [
      "Guided biofilm care",
      "Soft tissue comfort",
      "Preventive guidance",
    ],
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    copy: "Preventive visits designed around calm pacing and sensory comfort — so oral health feels restorative rather than clinical.",
  },
  {
    id: "treat-005",
    index: "005",
    code: "LON·CARE",
    name: "Long-Term Smile Care",
    nature: "Maintenance · Continuity · Trust",
    duration: "Individualized protocol",
    disciplines: [
      "Recall planning",
      "Tissue & implant monitoring",
      "Decade-horizon guidance",
    ],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    copy: "Ongoing care that protects what we restore — structured follow-up, clear communication, and continuity you can rely on.",
  },
];

/** Orbital Anatomy Study configuration */
export const STUDY = {
  title: "Smile Architecture Study",
  img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85",
  companionImg:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=85",
  fragmentImg:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85",
  states: [
    {
      id: "harmony",
      parts: [
        { text: "Facial proportions", tone: "strong" },
        { text: " guide every restorative choice — ", tone: "mute" },
        { text: "form follows the person", tone: "strong" },
        { text: ", never a template.", tone: "mute" },
      ],
    },
    {
      id: "materials",
      parts: [
        { text: "Contemporary ceramics", tone: "strong" },
        { text: " catch light the way enamel does. ", tone: "mute" },
        { text: "Margins are refined", tone: "strong" },
        { text: " with quiet precision.", tone: "mute" },
      ],
    },
    {
      id: "longevity",
      parts: [
        { text: "Implants and restorations", tone: "strong" },
        { text: " are planned for daily life. Built for ", tone: "mute" },
        { text: "enduring confidence", tone: "strong" },
        { text: " — not fleeting trends.", tone: "mute" },
      ],
    },
  ] satisfies StudyState[],
};

/** Spatial Chapters / Lookbook */
export const LOOKBOOK = [
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 01 — The Consultation Lounge",
    speed: 0.12,
  },
  {
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 02 — The Daylight Operatory",
    speed: -0.09,
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 03 — The Rest Sanctuary",
    speed: 0.14,
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=85",
    caption: "Chapter 04 — The Ceramic Bench",
    speed: -0.11,
  },
];

export const VOICES = [
  {
    quote:
      "For the first time, a dentist spent an hour simply listening to my concerns before discussing any treatment path.",
    name: "A. Kurian",
    note: "Smile Design Patient · Kochi",
  },
  {
    quote:
      "The clinic feels composed and calm rather than clinical. The unhurried pace changed how I feel about dental care.",
    name: "S. Menon",
    note: "Preventive Care · Aluva",
  },
  {
    quote:
      "Dr. Pinky Varghese explained my implant options with clarity and care. I left feeling informed — never pressured.",
    name: "R. Nair",
    note: "Implant Consultation · Ernakulam",
  },
];
