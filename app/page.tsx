"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, Phone, Play, Plus, X } from "lucide-react";

const sessions = [
  { number: "01", id: "family", title: "משפחה", text: "שעה של ביחד, בלי לחץ ובלי פוזות מאולצות. הכוונה עדינה כשצריך, ומקום לכל מה שקורה באמת." },
  { number: "02", id: "chalake", title: "חלאקה", text: "התלתלים, המספריים, הכיפה הראשונה והציציות החדשות — יום שעובר מהר מדי. בבית, בסטודיו או בחוץ." },
  { number: "03", id: "bat-mitzvah", title: "בת מצווה", text: "צילום שבונה ביטחון: היא בוחרת את הסגנון, ואני דואגת שתרגיש בנוח ותיראה בדיוק כמו עצמה." },
];

type GalleryImage = { src: string; alt: string };

const galleryCollections: { id: string; label: string; title: string; summary: string; images: GalleryImage[]; youtubeId?: string }[] = [
  {
    id: "family",
    label: "משפחה",
    title: "סיפור של בית",
    summary: "האחים, התינוק החדש, הצחוק שלפני ארוחת שבת — מי שיושב סביב השולחן שלכם, בתמונות שתרצו לתלות על הקיר.",
    images: [
      { src: "/images/NF1A1128_%D7%9E%D7%95%D7%A7%D7%98%D7%9F.jpg", alt: "שלושה אחים יחד בעריסת קש" },
      { src: "/images/5X3A6715-2.JPG", alt: "ילדה מחייכת יושבת על ארגז עץ בשדרת עצים" },
      { src: "/images/4W3A8180_%282%29.jpg", alt: "תינוקת שוכבת על כרית ורודה ומביטה למעלה" },
      { src: "/images/צילום%20שיפי%200548517049%20%2813%29.jpg", alt: "ילדה עם תלתלים בסרבל עומדת בשביל בפארק" },
      { src: "/images/אילה%20וויג%20צלמת%20ניו%20בורן%20בבית%20הלקוח%20054-8524765%20%281%29.jpg", alt: "ילדה בכובע סרוג ליד אחיה התינוק בעריסה" },
      { src: "/images/collage/collage-07.jpg", alt: "ילד צוחק יושב על המדרכה ליד אוטובוס צעצוע אדום" },
    ],
  },
  {
    id: "chalake",
    label: "חלאקה",
    title: "התספורת הראשונה",
    summary: "שלוש שנים של תלתלים, רגע אחד של מספריים. ההתרגשות, החיוך הנבוך, והמבט הראשון במראה.",
    images: [
      { src: "/images/hero-family.jpeg", alt: "שני ילדים עם כיפות יושבים על רצפת עץ ואוכלים רימון" },
      { src: "/images/collage/collage-19.jpg", alt: "ילד במשקפי שמש יושב על ספסל עץ ליד אוטובוס צעצוע" },
      { src: "/images/collage/collage-10.jpg", alt: "ילד עם אוזניות וסקייטבורד צוחק מול קיר גרפיטי" },
    ],
  },
  {
    id: "bat-mitzvah",
    label: "בת מצווה",
    title: "היא כבר גדולה",
    summary: "בגיל הזה כל אחת רוצה להיראות כמו עצמה, רק בגרסה הכי בטוחה. בטבע, בסטודיו או בעיר.",
    images: [],
    youtubeId: "bG3QSC4DuMc",
  },
];

// Explicit grid areas so the collage closes with no holes: `d` = 6-column desktop, `m` = 2-column mobile.
// `order` sets the (deliberately scattered) reveal sequence.
type CollageTile =
  | { kind: "photo"; src: string; alt: string; d: string; m: string; order: number }
  | { kind: "word"; text: string; d: string; m: string; order: number }
  | { kind: "link"; d: string; m: string; order: number };

const collageTiles: CollageTile[] = [
  { kind: "photo", src: "/images/NF1A1128_%D7%9E%D7%95%D7%A7%D7%98%D7%9F.jpg", alt: "שלושה אחים יחד בעריסת קש", d: "1 / 1 / span 2 / span 2", m: "1 / 1", order: 0 },
  { kind: "photo", src: "/images/collage/collage-05.jpg", alt: "ילד מתולתל עם כיפה יושב על קיר אבן ומחזיק ספר תורה קטן", d: "1 / 3 / span 2 / span 1", m: "1 / 2 / span 2", order: 4 },
  { kind: "photo", src: "/images/collage/collage-07.jpg", alt: "ילד צוחק יושב על המדרכה ליד אוטובוס צעצוע אדום", d: "1 / 4 / span 2 / span 2", m: "4 / 2", order: 2 },
  { kind: "word", text: "משפחה", d: "1 / 6 / span 2 / span 1", m: "2 / 1", order: 15 },
  { kind: "photo", src: "/images/collage/collage-13.jpg", alt: "שתי אחיות בכובעים בין חבילות קש", d: "3 / 1 / span 2 / span 4", m: "3 / 1 / span 1 / span 2", order: 6 },
  { kind: "photo", src: "/images/collage/collage-17.jpg", alt: "ילדה בשמלה צהובה שוכבת על ספסל אבן ומחייכת", d: "3 / 5 / span 2 / span 2", m: "5 / 2", order: 1 },
  { kind: "photo", src: "/images/collage/collage-10.jpg", alt: "ילד עם אוזניות וסקייטבורד צוחק מול קיר גרפיטי", d: "5 / 1 / span 2 / span 1", m: "4 / 1 / span 2", order: 9 },
  { kind: "photo", src: "/images/collage/collage-20.jpg", alt: "ילדה בקפוצ'ון מרססת על קיר גרפיטי", d: "7 / 5 / span 2 / span 2", m: "9 / 1", order: 5 },
  { kind: "word", text: "אהבה", d: "5 / 5 / span 2 / span 1", m: "6 / 2", order: 16 },
  { kind: "word", text: "שמחה", d: "7 / 3 / span 2 / span 1", m: "10 / 1", order: 17 },
  { kind: "photo", src: "/images/collage/collage-11.jpg", alt: "ילד בכובע בוקרים נשען על גזע עץ", d: "5 / 4 / span 2 / span 1", m: "7 / 1 / span 2", order: 3 },
  { kind: "photo", src: "/images/4W3A8180_%282%29.jpg", alt: "תינוקת שוכבת על כרית ורודה ומביטה למעלה", d: "7 / 1 / span 2 / span 2", m: "7 / 2", order: 11 },
  { kind: "photo", src: "/images/collage/collage-19.jpg", alt: "ילד במשקפי שמש יושב על ספסל עץ ליד אוטובוס צעצוע", d: "5 / 2 / span 2 / span 2", m: "6 / 1", order: 7 },
  { kind: "photo", src: "/images/5X3A6715-2.JPG", alt: "ילדה מחייכת יושבת על ארגז עץ בשדרת עצים", d: "5 / 6 / span 2 / span 1", m: "8 / 2 / span 2", order: 13 },
  { kind: "photo", src: "/images/צילום%20שיפי%200548517049%20%2813%29.jpg", alt: "ילדה עם תלתלים בסרבל עומדת בשביל בפארק", d: "7 / 4 / span 2 / span 1", m: "11 / 2 / span 2", order: 8 },
  { kind: "photo", src: "/images/collage/collage-12.jpg", alt: "ילד בכובע וחולצה משובצת צועד בשביל", d: "9 / 1 / span 2 / span 2", m: "10 / 2", order: 12 },
  { kind: "photo", src: "/images/אילה%20וויג%20צלמת%20ניו%20בורן%20בבית%20הלקוח%20054-8524765%20%281%29.jpg", alt: "ילדה בכובע סרוג ליד אחיה התינוק בעריסה", d: "9 / 3 / span 2 / span 2", m: "11 / 1", order: 10 },
  { kind: "link", d: "9 / 5 / span 2 / span 2", m: "12 / 1", order: 14 },
];

// Words are written one after another, in this order
const collageWords = collageTiles.flatMap((tile) => tile.kind === "word" ? [tile.text] : []);
const collagePhotoTiles = collageTiles.flatMap((tile) => tile.kind === "photo" ? [tile] : []);

const HERO_SRC = "/images/hero-family.jpeg";
const ABOUT_SRC = "/images/NF1A1128_%D7%9E%D7%95%D7%A7%D7%98%D7%9F.jpg";

// Images that pass the common Israeli content filters (checked by the photographer on a filtered line).
// Any image the viewer's filter blocks is swapped in place for one of these; repeats are fine for now.
type Shape = "portrait" | "landscape";
const FILTER_SAFE_IMAGES: { src: string; shape: Shape }[] = [
  { src: "/images/collage/collage-07.jpg", shape: "landscape" },
  { src: "/images/collage/collage-10.jpg", shape: "portrait" },
  { src: "/images/collage/collage-19.jpg", shape: "landscape" },
  { src: "/images/5X3A6715-2.JPG", shape: "portrait" },
  { src: "/images/צילום%20שיפי%200548517049%20%2813%29.jpg", shape: "portrait" },
];
const isFilterSafe = (src: string) => FILTER_SAFE_IMAGES.some((image) => image.src === src);
const safeImageAlt = (src: string) => collagePhotoTiles.find((tile) => tile.src === src)?.alt ?? "";
// A collage slot spanning two or more desktop columns is landscape
const collageShapes = collagePhotoTiles.map((tile): Shape => Number(tile.d.split("span").pop()) >= 2 ? "landscape" : "portrait");
const IMAGE_MODE_KEY = "image-mode";

// Content filters (נטיב, רימון וכו') replace a blocked image with a 3x3 mosaic of flat colour blocks,
// with a "blocked" icon in the centre block. A real photo never has eight perfectly flat regions.
function isMosaic(img: HTMLImageElement) {
  try {
    const size = 60;
    const cell = size / 3;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    let flatCells = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (row === 1 && col === 1) continue;
        const values: number[] = [];
        // Sample the inside of the block, away from the edges where JPEG blends neighbours
        for (let y = row * cell + 5; y < (row + 1) * cell - 5; y++) {
          for (let x = col * cell + 5; x < (col + 1) * cell - 5; x++) {
            const i = (y * size + x) * 4;
            values.push(data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11);
          }
        }
        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
        const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
        if (Math.sqrt(variance) < 3) flatCells++;
      }
    }
    return flatCells === 8;
  } catch {
    return false;
  }
}

// For CSS background images (hero, about), which have no <img> to inspect
function isImageBlocked(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = () => resolve(true);
    img.onload = () => resolve(isMosaic(img));
    img.src = src;
  });
}

// An <img> that reports when the viewer's content filter blocked it
function CheckedImage({ src, alt, onBlocked }: { src: string; alt: string; onBlocked: (src: string) => void }) {
  const ref = useRef<HTMLImageElement>(null);
  const check = useCallback(() => {
    const img = ref.current;
    if (!img) return;
    if (img.naturalWidth === 0 || isMosaic(img)) { onBlocked(src); return; }
    // Lets the gallery's justified rows size the tile to the photo
    img.parentElement?.style.setProperty("--ratio", String(img.naturalWidth / img.naturalHeight));
  }, [src, onBlocked]);
  // The image may have finished loading before hydration attached onLoad
  useEffect(() => { if (ref.current?.complete) check(); }, [check]);
  return <img ref={ref} src={src} alt={alt} loading="lazy" onLoad={check} onError={() => onBlocked(src)} />;
}

// Placeholder quotes: replace with real testimonials before going live.
const testimonials = [
  { quote: "הגענו לחוצים, עם שלושה ילדים ותינוק. יצאנו עם תמונות שבהן כולנו נראים בדיוק כמו שאנחנו — רק יפים יותר.", author: "[שם הלקוחה]", type: "צילום משפחה" },
  { quote: "בחלאקה היה רעש, אורחים והתרגשות. היא הייתה שם בשקט ותפסה כל רגע, גם את אלה שבכלל לא ראינו.", author: "[שם הלקוחה]", type: "חלאקה" },
  { quote: "הבת שלי לא אוהבת להצטלם. אחרי עשר דקות היא כבר צחקה, והתמונות יצאו הכי היא שיש.", author: "[שם הלקוחה]", type: "בת מצווה" },
];

const faqs = [
  { q: "איפה מצלמים?", a: "בבית שלכם, בסטודיו או בחוץ — בפארק, בחורשה או בכל מקום שיש לו משמעות בשבילכם. נבחר יחד בשיחת ההיכרות, לפי האור, העונה והגיל של הילדים." },
  { q: "מה כדאי ללבוש?", a: "בגדים נוחים בגוונים רכים שמשתלבים זה עם זה, בלי הדפסים גדולים ולוגואים. לפני הצילום תקבלו ממני רשימה מסודרת עם דוגמאות." },
  { q: "ומה אם הילדים לא ישתפו פעולה?", a: "זה חלק מהתכנון. אני לא מבקשת מהם לחייך למצלמה, אלא נותנת להם זמן, משחק ומרחב — ומשם בדרך כלל מגיעות התמונות הכי יפות." },
  { q: "אפשר לצלם את החלאקה עצמה, באירוע?", a: "כן. אפשר לצלם את התספורת עצמה, בבית או באירוע, וגם סשן נפרד לפני או אחרי — כשהכיפה והציציות עוד חדשות." },
  { q: "תוך כמה זמן מקבלים את התמונות?", a: "בדרך כלל תוך שבועיים עד שלושה, בגלריה דיגיטלית מסודרת שאפשר להוריד ממנה ולשתף עם כל המשפחה." },
  { q: "איך שומרים תאריך?", a: "ממלאים את הטופס למטה, ואני חוזרת אליכם לשיחה קצרה. נדבר על מה שחשוב לכם ונקבע מועד. בעונות עמוסות כדאי לפנות מוקדם." },
];

const pricingPlans = [
  {
    name: "מיני סשן",
    price: "1,990 ₪",
    description: "קצר וממוקד: לילד אחד, לשנה הראשונה או למשפחה קטנה.",
    features: ["45 דק' צילום", "20 תמונות ערוכות", "גלריה דיגיטלית להורדה"],
  },
  {
    name: "סשן משפחתי",
    price: "3,490 ₪",
    description: "הבחירה של רוב המשפחות: זמן להתחמם, לשחק ולתת לתמונות הטובות לקרות.",
    features: ["90 דק' צילום", "50+ תמונות ערוכות", "גלריה דיגיטלית מלאה"],
    featured: true,
  },
  {
    name: "חלאקה / בת מצווה",
    price: "5,990 ₪",
    description: "ליווי מלא של היום המיוחד — מההכנות ועד הרגע שכולם מחכים לו.",
    features: ["שעתיים צילום", "עריכה מלאה", "אלבום מעוצב"],
  },
];

const MIN_GALLERY_TILES = 3;

function YouTubeVideo({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="video-frame video-poster" onClick={() => setPlaying(true)} aria-label={`הפעלת הקליפ: ${title}`}>
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" />
      <span className="video-play"><Play size={26} strokeWidth={1.5} fill="currentColor" aria-hidden="true" /></span>
    </button>
  );
}

function Lightbox({ images, index, onClose, onMove }: { images: GalleryImage[]; index: number; onClose: () => void; onMove: (step: number) => void }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // RTL: the left arrow moves forward
      if (event.key === "ArrowLeft") onMove(1);
      if (event.key === "ArrowRight") onMove(-1);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  const image = images[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.alt} onClick={onClose}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="סגירה"><X size={26} strokeWidth={1.25} /></button>
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img key={image.src} src={image.src} alt={image.alt} />
        <figcaption>{image.alt}<span dir="ltr">{index + 1} / {images.length}</span></figcaption>
      </figure>
      {images.length > 1 && (
        <>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); onMove(-1); }} aria-label="התמונה הקודמת"><ChevronRight size={30} strokeWidth={1.25} /></button>
          <button type="button" className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); onMove(1); }} aria-label="התמונה הבאה"><ChevronLeft size={30} strokeWidth={1.25} /></button>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(galleryCollections[0].id);
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);
  const activeCollection = galleryCollections.find((collection) => collection.id === activeTab) ?? galleryCollections[0];
  // `filtered` is the manual footer toggle: treat every image outside the safe set as blocked.
  const [filtered, setFiltered] = useState(false);
  const [blockedImages, setBlockedImages] = useState<ReadonlySet<string>>(() => new Set());
  const markBlocked = useCallback((src: string) => setBlockedImages((current) => current.has(src) ? current : new Set(current).add(src)), []);
  const isBlocked = (src: string) => blockedImages.has(src) || (filtered && !isFilterSafe(src));
  const availableSafe = FILTER_SAFE_IMAGES.filter((image) => !blockedImages.has(image.src));
  // Blocked images are swapped in place for a safe image of the same shape, rotating through them
  const replaceBlocked = (images: GalleryImage[], shapes?: Shape[]) => {
    const used: Record<string, number> = {};
    return images.map((image, slot): GalleryImage => {
      if (!isBlocked(image.src)) return image;
      const shape = shapes?.[slot];
      const sameShape = availableSafe.filter((safe) => safe.shape === shape);
      const candidates = sameShape.length > 0 ? sameShape : availableSafe;
      if (candidates.length === 0) return image;
      const turn = used[shape ?? "any"] = (used[shape ?? "any"] ?? 0) + 1;
      const src = candidates[turn % candidates.length].src;
      return { src, alt: safeImageAlt(src) };
    });
  };

  const galleryImages = replaceBlocked(activeCollection.images);
  const placeholderCount = Math.max(0, MIN_GALLERY_TILES - galleryImages.length);
  const collagePhotos = replaceBlocked(collagePhotoTiles, collageShapes);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let manual: string | null = null;
      try { manual = localStorage.getItem(IMAGE_MODE_KEY); } catch {}
      if (manual === "filtered" && !cancelled) setFiltered(true);
      for (const src of [HERO_SRC, ABOUT_SRC]) {
        if (await isImageBlocked(src) && !cancelled) markBlocked(src);
      }
    })();
    return () => { cancelled = true; };
  }, [markBlocked]);

  const toggleFiltered = () => {
    const next = !filtered;
    setFiltered(next);
    setLightbox(null);
    try { localStorage.setItem(IMAGE_MODE_KEY, next ? "filtered" : "full"); } catch {}
  };

  const openSession = (id: string) => {
    setActiveTab(id);
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeLightbox = () => setLightbox(null);
  const moveLightbox = (step: number) =>
    setLightbox((current) => current === null ? null : { ...current, index: (current.index + step + current.images.length) % current.images.length });

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main dir="rtl" className="overflow-hidden bg-[var(--cream)] text-[var(--ink)]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/25 text-white">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <a href="#top" className="brand-logo" aria-label="MB Photographer — דף הבית"><img src="/images/logo-light.png" alt="MB Photographer" /></a>
          <nav className="header-nav hidden items-center gap-7 text-sm lg:flex" aria-label="ניווט ראשי">
            <a href="#portfolio">עבודות</a><a href="#sessions">סוגי צילום</a><a href="#about">אודות</a><a href="#testimonials">המלצות</a><a href="#pricing">מחירון</a><a href="#faq">שאלות</a><a href="#contact">יצירת קשר</a>
          </nav>
          <a href="#contact" className="header-cta">לתיאום צילום</a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className={`hero-photo ${isBlocked(HERO_SRC) ? "is-filtered" : ""}`} role="img" aria-label="שני ילדים עם כיפות יושבים על רצפת עץ ואוכלים רימון" />
        <div className="hero-shade" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1500px] items-end px-5 pb-20 pt-32 sm:px-10 lg:min-h-screen lg:px-16 lg:pb-24">
          <div className="hero-content max-w-[500px] text-white">
            <p className="eyebrow mb-7">צילום משפחה · חלאקה · בת מצווה</p>
            <h1 className="display-title">הרגעים הקטנים<br />הם הסיפור.</h1>
            <p className="mt-7 max-w-lg text-[1.05rem] leading-8 text-white/85 sm:text-lg">צילום טבעי ורגוע, באור רך ובקצב של הילדים — תמונות שיישארו הרבה אחרי שהבגדים כבר יהיו קטנים.</p>
            <a href="#portfolio" className="hero-link mt-10 inline-flex items-center gap-3">לצפייה בעבודות <ArrowLeft size={17} strokeWidth={1.5} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="about" className="reveal-section bg-[var(--espresso)] text-white">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          <div className="about-photo relative min-h-[520px] lg:min-h-[760px]">
            <div className={`about-photo-image ${isBlocked(ABOUT_SRC) ? "is-filtered" : ""}`} role="img" aria-label="תמונת מצלמת צילום משפחה" />
          </div>
          <div className="reveal-copy flex items-center px-6 py-20 sm:px-14 lg:px-20 lg:py-24">
            <div className="max-w-xl">
              <img src="/images/logo-light.png" alt="MB Photographer" className="about-logo" />
              <p className="eyebrow mt-8 text-[var(--honey-light)]">נעים להכיר</p>
              <h2 className="section-title mt-5 text-white">אני לא מבקשת חיוך. אני מחכה לו.</h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-white/70 sm:text-lg">
                <p>צילום טוב מתחיל בסבלנות: לתת לילדים להתרגל, להורים להשתחרר, ולרגע האמיתי להגיע מעצמו — מבט חטוף, יד קטנה שמחפשת יד, צחוק שאי אפשר לביים.</p>
                <p>אני מביאה עין לאור והרבה שקט. אתם מגיעים כמו שאתם. את השאר נעשה יחד.</p>
              </div>
              <a href="#contact" className="dark-link mt-10 inline-flex items-center gap-3">בואו נכיר <ArrowLeft size={17} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="inspiration" className="reveal-section collage-section">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <p className="section-kicker">השראה</p>
            <h2 className="section-title mt-4">לתפוס את הרגע</h2>
          </div>
          <div className="collage">
            {collageTiles.map((tile) => {
              const style = { "--area-d": tile.d, "--area-m": tile.m, "--order": tile.order } as CSSProperties;
              if (tile.kind === "word") {
                const wordStyle = { ...style, "--word": collageWords.indexOf(tile.text) } as CSSProperties;
                return <div key={tile.text} className="collage-tile collage-word" style={wordStyle}><span>{tile.text}</span></div>;
              }
              if (tile.kind === "link") {
                return (
                  <a key="link" href="#portfolio" className="collage-tile collage-link" style={style}>
                    <span>לכל העבודות</span>
                    <ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" />
                  </a>
                );
              }
              const slot = collagePhotoTiles.indexOf(tile);
              const photo = collagePhotos[slot];
              return (
                <button key={tile.src} type="button" className="collage-tile collage-photo" style={style} onClick={() => setLightbox({ images: collagePhotos, index: slot })} aria-label={`הגדלת התמונה: ${photo.alt}`}>
                  <CheckedImage src={photo.src} alt={photo.alt} onBlocked={markBlocked} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="sessions" className="reveal-section sessions-wrap">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div><p className="section-kicker">סוגי צילום</p><h2 className="section-title mt-4">מה נצלם יחד?</h2></div>
            <div className="session-list">
              {sessions.map((session) => (
                <article key={session.number} className="session-item reveal-item">
                  <span>{session.number}</span>
                  <h3>{session.title}</h3>
                  <p>{session.text}</p>
                  <button type="button" onClick={() => openSession(session.id)} className="session-arrow" aria-label={`לעבודות ${session.title}`}>
                    <ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="gallery-wrap">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
          <div className="gallery-head">
            <div>
              <p className="section-kicker">עבודות</p>
              <h2 className="section-title mt-4">סיפורים באור טבעי</h2>
            </div>
            <div className="gallery-tabs" role="tablist" aria-label="סוג צילום">
              {galleryCollections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  role="tab"
                  aria-selected={collection.id === activeTab}
                  className="gallery-tab"
                  onClick={() => setActiveTab(collection.id)}
                >
                  {collection.label}
                </button>
              ))}
            </div>
          </div>

          <div key={activeCollection.id} className="gallery-panel" role="tabpanel">
            <div className="gallery-intro">
              <h3>{activeCollection.title}</h3>
              <p>{activeCollection.summary}</p>
            </div>

            {activeCollection.youtubeId && (
              <div className="gallery-video">
                <YouTubeVideo id={activeCollection.youtubeId} title={activeCollection.title} />
              </div>
            )}

            <div className="gallery-masonry">
              {galleryImages.map((image, index) => (
                <button key={`${activeCollection.id}-${index}`} type="button" className="gallery-tile" onClick={() => setLightbox({ images: galleryImages, index })} aria-label={`הגדלת התמונה: ${image.alt}`}>
                  <CheckedImage src={image.src} alt={image.alt} onBlocked={markBlocked} />
                  <span className="gallery-tile-zoom" aria-hidden="true"><Plus size={20} strokeWidth={1.25} /></span>
                </button>
              ))}
              {Array.from({ length: placeholderCount }, (_, index) => (
                <div key={`placeholder-${index}`} className="gallery-tile gallery-tile-placeholder">
                  <div className="image-placeholder"><span>{activeCollection.label} · תמונה תתווסף כאן</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox images={lightbox.images} index={lightbox.index} onClose={closeLightbox} onMove={moveLightbox} />
      )}

      <section id="testimonials" className="reveal-section testimonials-section">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="mb-12 text-center">
            <p className="section-kicker">מה אומרים</p>
            <h2 className="section-title mt-4">משפחות מספרות</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <figure key={item.type} className="testimonial-card stagger-item" style={{ "--i": index } as CSSProperties}>
                <span className="testimonial-mark" aria-hidden="true">”</span>
                <blockquote>{item.quote}</blockquote>
                <figcaption><strong>{item.author}</strong><span>{item.type}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="reveal-section pricing-section">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
          <div className="mb-12 text-center">
            <p className="section-kicker">מחירון</p>
            <h2 className="section-title mt-4">חבילות ברורות, בלי הפתעות</h2>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <article key={plan.name} className={`pricing-card stagger-item ${plan.featured ? "pricing-card-featured" : ""}`} style={{ "--i": index } as CSSProperties}>
                <div className="pricing-topline">
                  <span className="pricing-name">{plan.name}</span>
                  {plan.featured && <span className="pricing-badge">הכי מבוקש</span>}
                </div>

                <div className="pricing-price">{plan.price}</div>
                <p className="pricing-description">{plan.description}</p>

                <ul className="pricing-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <a href="#contact" className="pricing-button">לתיאום צילום</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="reveal-section faq-section">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24 lg:px-16 lg:py-32">
          <div><p className="section-kicker">לפני שמתחילים</p><h2 className="section-title mt-4">שאלות נפוצות</h2></div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.q} className="faq-item stagger-item" style={{ "--i": index } as CSSProperties}>
                <summary>{item.q}<Plus size={20} strokeWidth={1.25} aria-hidden="true" /></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="reveal-section contact-section">
        <div className="contact-shell mx-auto max-w-[1400px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
          <div className="contact-heading">
            <p className="section-kicker">מתחילים מכאן</p>
            <h2 className="contact-title mt-5">יש רגע שאתם רוצים לשמור?</h2>
            <p className="contact-intro mt-6 max-w-2xl text-base leading-8 sm:text-lg">ספרו לי קצת עליכם — מי מצטלם, מה האירוע ומתי. אחזור אליכם עם רעיונות למיקום, לשעה וללבוש, ונבנה יחד צילום שמתאים בדיוק לכם.</p>
          </div>

          <div className="contact-panel stagger-item mt-14">
            <aside className="contact-aside">
              <span className="contact-aside-number">M / 01</span>
              <div>
                <p className="contact-aside-kicker">MB PHOTOGRAPHER</p>
                <h3>בואו נשמור<br />את זה קרוב.</h3>
                <p className="contact-aside-text">כל פנייה מקבלת ממני תשובה אישית — לא הודעה אוטומטית — עם כמה שאלות קצרות שיעזרו לנו לתכנן נכון.</p>
              </div>
              <div className="contact-details">
                <a href="mailto:hello@lumi-studio.co"><Mail size={17} strokeWidth={1.5} />hello@lumi-studio.co</a>
                <a href="tel:+9720500000000"><Phone size={17} strokeWidth={1.5} />+972 050-000-0000</a>
              </div>
            </aside>

            <form className="contact-form">
              <div className="contact-form-header"><span>01 — פרטים</span><span>נשמור על קשר</span></div>
              <div className="field-row">
                <label><span>שם מלא</span><input type="text" placeholder="איך קוראים לכם?" /></label>
                <label><span>טלפון</span><input type="tel" placeholder="050-0000000" /></label>
              </div>
              <label><span>אימייל</span><input type="email" placeholder="your@email.com" /></label>
              <label><span>סוג הצילום</span><select defaultValue=""><option value="" disabled>מה תרצו לצלם?</option><option value="family">משפחה</option><option value="chalake">חלאקה</option><option value="bat-mitzvah">בת מצווה</option><option value="other">אחר</option></select></label>
              <label><span>כמה מילים</span><textarea rows={4} placeholder="ספרו לי על הרגע שתרצו לשמור..." /></label>
              <button type="submit" className="submit-button">שליחת פנייה <ArrowLeft size={17} strokeWidth={1.5} /></button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--espresso-deep)] text-white/70">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-7 px-5 py-10 text-sm sm:px-10 md:flex-row lg:px-16">
          <a href="#top" className="brand-logo brand-logo-footer" aria-label="MB Photographer — חזרה לראש העמוד"><img src="/images/logo-light.png" alt="MB Photographer" /></a><p>צילום משפחה · חלאקה · בת מצווה</p><p dir="ltr">© 2026 MB PHOTOGRAPHER</p>
        </div>
        <div className="credit-bar">
          <p className="credit-bar-inner">
            האתר עוצב ונבנה ע״י
            <span className="credit-mark" dir="ltr">AJ<span>enda</span> Studio</span>
          </p>
          <button type="button" className="filter-toggle" onClick={toggleFiltered} aria-pressed={filtered}>
            {filtered ? "תצוגה מותאמת לסינון: פעילה" : "תצוגה מותאמת לסינון"}
          </button>
        </div>
      </footer>
    </main>
  );
}
