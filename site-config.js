/* =========================================================================
   THE AMBIENCE RESORT — SITE CONFIG
   =========================================================================
   This is the ONLY file you should need to edit to update contact details,
   social links, venue text and gallery photographs.

   After changing anything in this file, just save it and refresh the
   website in your browser — no build step is needed.
   ========================================================================= */

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------------
     BASIC RESORT INFORMATION
  --------------------------------------------------------------------- */
  resortName: "The Ambience Resort",
  tagline: "Rajpura–Patiala Highway's First Waterproof Palace",
  location: "Rajpura, Punjab",
  shortLocation: "Rajpura",

  /* ---------------------------------------------------------------------
     CONTACT DETAILS
     - Enter numbers WITHOUT spaces for callNumber1 / callNumber2 / callNumber3 / whatsappNumber
       (needed so the "Call" and "WhatsApp" buttons work correctly).
     - Always include the country code (91 for India) with no leading "+"
       or "00" in whatsappNumber.
  --------------------------------------------------------------------- */
  contact: {
    displayName1: "Bobby",
    callNumber1: "919463844188",
    callNumber1Display: "94638 44188",

    displayName2: "Rinku",
    callNumber2: "919888506088",
    callNumber2Display: "98885 06088",

    displayName3: "Anil",
    callNumber3: "919988206088",
    callNumber3Display: "99882 06088",

    // Number the WhatsApp button and enquiry form will message.
    whatsappNumber: "919463844188",
    whatsappDisplay: "94638 44188",

    address: "Rajpura – Patiala Road, Village Gandia Kheri, Rajpura, Punjab",

    // Replace with your real profile / page URLs.
    instagramUrl: "https://www.instagram.com/theambience_rc/",
    facebookUrl: "https://facebook.com/",

    // Open Google Maps, search your resort name, click "Share", copy the link.
    googleMapsUrl: "https://maps.google.com/?q=The+Ambience+Resort+Rajpura",

    // Used for the embedded map + structured data (approximate — update with exact coordinates).
    latitude: "30.4837",
    longitude: "76.5931"
  },

  /* ---------------------------------------------------------------------
     HERO SLIDESHOW IMAGES
     Exactly 2 photos keeps the automatic slideshow feeling premium without
     asking for a large photo library. You can add a 3rd if you want, but
     2 is the recommended minimum.
  --------------------------------------------------------------------- */
  heroImages: [
    "assets/images/hero-1.jpg",
    "assets/images/hero-2.jpg",
    "assets/images/hero-3.jpg"
  ],

  /* ---------------------------------------------------------------------
     ABOUT SECTION — single large photograph
  --------------------------------------------------------------------- */
  aboutImage: "assets/images/about-main.jpg",

  /* ---------------------------------------------------------------------
     VENUES
     Photos are OPTIONAL. Leave "image" as "" and each venue renders as a
     premium icon-based card (no photo needed). As soon as you add a real
     file path to "image", that venue automatically switches to a full
     photo card instead — no other change needed.
     "icon" options: hall, grandhall, lawn
  --------------------------------------------------------------------- */
  venues: [
    {
      name: "Front Hall",
      icon: "hall",
      image: "",
      description: "An intimate, beautifully appointed hall suited to receptions, ring ceremonies and smaller gatherings."
    },
    {
      name: "Grand Hall",
      icon: "grandhall",
      image: "",
      description: "Our largest indoor venue — soaring ceilings and elegant decor for weddings and grand celebrations."
    },
    {
      name: "Celebration Lawn",
      icon: "lawn",
      image: "",
      description: "A sprawling open-air lawn framed by greenery, perfect for evening functions under the sky."
    }
  ],

  /* ---------------------------------------------------------------------
     EXPERIENCES
     "icon" uses simple inline SVG names defined in script.js (see ICONS).
  --------------------------------------------------------------------- */
  experiences: [
    { icon: "rings", title: "Weddings", description: "Complete wedding celebrations hosted with elegance and care." },
    { icon: "glass", title: "Receptions", description: "Warm, memorable receptions for family and friends." },
    { icon: "flower", title: "Ring Ceremonies", description: "Intimate ceremonies in a refined, comfortable setting." },
    { icon: "briefcase", title: "Corporate Events", description: "Professional venues for conferences and company gatherings." },
    { icon: "utensils", title: "Catering & Hospitality", description: "Attentive service and a memorable dining experience." }
  ],

  /* ---------------------------------------------------------------------
     BIRTHDAY CELEBRATIONS — video gallery
     Add as many clips as you like — they display as a responsive video
     grid (2 per row on desktop, 1 per row on mobile), each with its own
     controls and a poster frame. Leave this list EMPTY (as it is now)
     and the whole section — including its content — hides itself
     automatically. No icons, placeholders or "video coming soon" text
     are ever shown.
  --------------------------------------------------------------------- */
  birthdayVideos: [
    { title: "Birthday Celebration", video: "assets/videos/birthday-1.mp4" },
    { title: "Birthday Celebration", video: "assets/videos/birthday-2.mp4" }
  ],

  /* ---------------------------------------------------------------------
     WHY CHOOSE US
  --------------------------------------------------------------------- */
  highlights: [
    "Elegant Event Spaces",
    "Beautiful Wedding Décor",
    "Dedicated Hospitality",
    "Convenient Rajpura Location",
    "Indoor and Outdoor Venues",
    "Memorable Guest Experiences"
  ],

  /* ---------------------------------------------------------------------
     MARQUEE TICKER
     Short phrases scrolled in a continuous band under the hero.
  --------------------------------------------------------------------- */
  marquee: [
    "Weddings", "Receptions", "Ring Ceremonies", "Birthday Celebrations",
    "Corporate Events", "Grand Hall", "Celebration Lawn", "Front Hall"
  ],

  /* ---------------------------------------------------------------------
     STATS (animated count-up numbers)
     EDIT THESE — they're starting placeholders, not verified figures.
     "number" must be a plain integer (no commas/symbols); "suffix" adds
     the +, % etc back on for display.
  --------------------------------------------------------------------- */
  stats: [
    { number: 10, suffix: "+", label: "Years Hosting Celebrations" },
    { number: 500, suffix: "+", label: "Weddings & Events Hosted" },
    { number: 1500, suffix: "+", label: "Guests Hosted at Once" },
    { number: 3, suffix: "", label: "Signature Venues" }
  ],

  /* ---------------------------------------------------------------------
     TESTIMONIALS
     EDIT THESE — replace with real guest feedback before publishing.
  --------------------------------------------------------------------- */
  testimonials: [
    // Add only genuine feedback. Example:
    // { quote: "The guest's exact feedback.", name: "Guest's Name", event: "Wedding, June 2026" }
  ],

  /* ---------------------------------------------------------------------
     FAQ
     Starter questions — please review and edit the answers so they match
     your actual policies before publishing.
  --------------------------------------------------------------------- */
  faqs: [
    {
      q: "What is the guest capacity at The Ambience Resort?",
      a: "Capacity varies by venue — the Grand Hall, Front Hall and Celebration Lawn each suit different event sizes. Contact us with your guest count and we'll recommend the right space."
    },
    {
      q: "Where is The Ambience Resort located?",
      a: "The Ambience Resort is located on Rajpura–Patiala Road at Village Gandia Kheri, Rajpura, Punjab, with convenient access from Rajpura, Patiala and Banur."
    },
    {
      q: "Is The Ambience Resort suitable for celebrations in every season?",
      a: "Yes. Our elegant indoor halls provide a weather-ready setting for weddings and celebrations throughout the year, alongside our open-air Celebration Lawn."
    },
    {
      q: "Do you provide catering, or can we bring our own?",
      a: "Please get in touch to discuss catering options for your event — we're happy to talk through what's available."
    },
    {
      q: "Can we host both indoor and outdoor functions on the same day?",
      a: "Yes — many celebrations use the Grand Hall or Front Hall alongside the Celebration Lawn for a combined indoor and outdoor experience."
    },
    {
      q: "How far in advance should we book?",
      a: "Popular wedding dates fill up early, so we recommend enquiring as soon as you have a date in mind."
    },
    {
      q: "Do you help with décor and arrangements?",
      a: "Get in touch to discuss décor and arrangement options for your celebration."
    },
    {
      q: "How do we enquire or schedule a venue visit?",
      a: "Use the enquiry form below, call us directly, or message us on WhatsApp — we're happy to arrange a visit."
    }
  ],

  /* ---------------------------------------------------------------------
     GALLERY
     Add UP TO 4 genuine photographs — no more, no fewer if you can help
     it, and avoid repeating the same photo twice. Leave this list EMPTY
     (as it is now) and the whole Gallery section hides itself
     automatically, including its nav-menu links — no empty section or
     broken images will ever show.
     "category" is just a short label shown nowhere critical right now —
     free text is fine, e.g. "Wedding", "Lawn", "Décor".
  --------------------------------------------------------------------- */
  gallery: [
    // Example — uncomment and edit once you have real photos:
    // { src: "assets/images/gallery-01.jpg", category: "Wedding", alt: "Wedding celebration at The Ambience Resort" },
    // { src: "assets/images/gallery-02.jpg", category: "Lawn",    alt: "Celebration Lawn set up for an evening function" },
  ],

  /* ---------------------------------------------------------------------
     SEO
  --------------------------------------------------------------------- */
  seo: {
    title: "The Ambience Resort | Wedding & Banquet Venue in Rajpura, Punjab",
    description: "The Ambience Resort is a premium wedding and party venue in Rajpura, Punjab, offering elegant halls and an open-air lawn for weddings, receptions and celebrations.",
    keywords: "wedding resort in Rajpura, banquet hall in Rajpura, wedding venue in Rajpura, party venue in Rajpura, The Ambience Resort"
  }
};
