import { ArrowLeft, Camera, MessageCircle } from "lucide-react";

const sessions = [
  { number: "01", title: "משפחה", text: "זמן משפחתי רגוע, עם הכוונה עדינה ומקום לכל מה שקורה באמת." },
  { number: "02", title: "הריון ואימהוּת", text: "צילום רך ונקי שמספר את התקופה הזו בדיוק כמו שהיא מרגישה." },
  { number: "03", title: "ילדים", text: "בלי לבקש מהם לחייך למצלמה. פשוט לתת להם להיות — ולתפוס את הקסם." },
];

export default function Home() {
  return (
    <main dir="rtl" className="overflow-hidden bg-[#f5f1e9] text-[#20231c]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/25 text-white">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <a href="#top" className="brand-mark" aria-label="LUMI — דף הבית">LUMI<span>STUDIO</span></a>
          <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="ניווט ראשי">
            <a href="#portfolio">עבודות</a><a href="#sessions">סוגי צילום</a><a href="#about">אודות</a><a href="#contact">יצירת קשר</a>
          </nav>
          <a href="#contact" className="header-cta">לתיאום צילום</a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="image-placeholder hero-placeholder" role="img" aria-label="מקום לתמונה ראשית">
          <span>תמונה ראשית</span>
        </div>
        <div className="hero-shade" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1500px] items-end px-5 pb-20 pt-32 sm:px-10 lg:min-h-screen lg:px-16 lg:pb-24">
          <div className="max-w-[680px] text-white lg:mr-auto lg:w-[48%]">
            <p className="eyebrow mb-7">צילום משפחה · הריון · ילדים</p>
            <h1 className="display-title">רגעים שמרגישים<br />כמו בית.</h1>
            <p className="mt-7 max-w-lg text-[1.05rem] leading-8 text-white/85 sm:text-lg">תמונות טבעיות, רכות ומלאות חיים — כאלה שתרצו לחזור אליהן גם בעוד שנים.</p>
            <a href="#portfolio" className="hero-link mt-10 inline-flex items-center gap-3">לצפייה בסיפורים <ArrowLeft size={17} strokeWidth={1.5} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="hero-index">01 / 03</span>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-16 lg:py-36">
        <div><p className="section-kicker">הגישה שלי</p></div>
        <div>
          <h2 className="section-title max-w-4xl">לא צריך לדעת לעמוד מול מצלמה. צריך רק להגיע כמו שאתם.</h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#5e6258] sm:text-lg">אני יוצרת מרחב נעים שמאפשר לכם להישאר אתם. במהלך הצילום אני מכוונת כשצריך, ואז נותנת לרגעים הקטנים לקרות — מבט, תנועה, יד שמחפשת יד.</p>
        </div>
      </section>

      <section id="portfolio" className="portfolio-wrap">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
          <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
            <div><p className="section-kicker">עבודות נבחרות</p><h2 className="section-title mt-4">סיפורים באור טבעי</h2></div>
            <p className="hidden max-w-xs text-sm leading-7 text-[#65685f] sm:block">כל צילום מתחיל בהיכרות וממשיך בקצב שמתאים בדיוק לכם.</p>
          </div>
          <div className="portfolio-grid">
            <figure className="photo-card photo-card-wide">
              <div className="image-placeholder" role="img" aria-label="מקום לתמונת משפחה"><span>תמונת משפחה</span></div>
              <figcaption><span>בבית</span><small>משפחה</small></figcaption>
            </figure>
            <figure className="photo-card photo-card-tall">
              <div className="image-placeholder" role="img" aria-label="מקום לתמונת הריון"><span>תמונת הריון</span></div>
              <figcaption><span>ציפייה</span><small>הריון</small></figcaption>
            </figure>
            <figure className="photo-card photo-card-half">
              <div className="image-placeholder" role="img" aria-label="מקום לתמונת אימהות"><span>תמונת אימהוּת</span></div>
              <figcaption><span>רק שתינו</span><small>אימהוּת</small></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="sessions" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div><p className="section-kicker">אפשר לבחור</p><h2 className="section-title mt-4">הצילום שלכם</h2></div>
          <div className="session-list">
            {sessions.map((session) => (
              <article key={session.number} className="session-item">
                <span>{session.number}</span><h3>{session.title}</h3><p>{session.text}</p><ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#22271f] text-white">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          <div className="about-photo relative min-h-[520px] lg:min-h-[760px]">
            <div className="image-placeholder" role="img" aria-label="מקום לתמונת הצלמת"><span>תמונת הצלמת</span></div>
          </div>
          <div className="flex items-center px-6 py-20 sm:px-14 lg:px-20 lg:py-24">
            <div className="max-w-xl">
              <p className="eyebrow text-[#d8c9a7]">נעים להכיר</p>
              <h2 className="section-title mt-5 text-white">אני מצלמת את מה שקורה בין הרגעים.</h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-white/70 sm:text-lg">
                <p>את הצחוק שמגיע אחרי המבוכה, את הידיים הקטנות, את הדרך שבה אתם מסתכלים זה על זו בלי לשים לב.</p>
                <p>המטרה שלי היא לא ליצור יום מושלם. היא לשמור עבורכם משהו אמיתי ממנו.</p>
              </div>
              <a href="#contact" className="dark-link mt-10 inline-flex items-center gap-3">בואו נכיר <ArrowLeft size={17} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="mx-auto max-w-[1100px] px-5 py-24 text-center sm:px-10 lg:py-36">
          <p className="section-kicker">מתחילים מכאן</p>
          <h2 className="contact-title mt-5">יש רגע שאתם רוצים לשמור?</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#64675d] sm:text-lg">ספרו לי מי אתם, מה אתם מדמיינים ומתי תרצו להצטלם. משם נבנה יחד חוויה רגועה ומדויקת.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#contact" className="contact-button contact-button-dark"><MessageCircle size={18} /> הודעה ב־WhatsApp</a>
            <a href="#contact" className="contact-button contact-button-light"><Camera size={18} /> Instagram</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#171a16] text-white/70">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-7 px-5 py-10 text-sm sm:px-10 md:flex-row lg:px-16">
          <a href="#top" className="brand-mark text-white">LUMI<span>STUDIO</span></a><p>צילום משפחה · הריון · ילדים</p><p dir="ltr">© 2026 LUMI STUDIO</p>
        </div>
      </footer>
    </main>
  );
}
