/**
 * Central registry of every CMS-editable slot on the site.
 * This file is shared between server and client — it must stay pure
 * (no database or Node-only imports).
 */

export type ContentType = "text" | "textarea" | "image";
export type PageKey = "global" | "home" | "private" | "contact";

export interface ContentDef {
  key: string;
  /** Hebrew label shown in the admin dashboard. */
  label: string;
  type: ContentType;
  /** Admin grouping (Hebrew). */
  group: string;
  page: PageKey;
  /** Factory default used until an admin overrides it. */
  defaultValue: string;
  hint?: string;
}

export const PAGE_NAMES: Record<PageKey, string> = {
  global: "כללי — כל האתר",
  home: "עמוד הבית",
  private: "מותג פרטי וייצור",
  contact: "צור קשר",
};

export const GROUP_GENERAL = "כללי";
export const GROUP_HERO = "אזור ראשי (Hero)";
export const GROUP_STATS = "מדדים";
export const GROUP_BRANDS = "בית המותגים";
export const GROUP_CAPS = "יכולות ייצור";
export const GROUP_AUDIENCE = "קהל יעד";
export const GROUP_WHY = "למה סירונה";
export const GROUP_CTA = "קריאה לפעולה";
export const GROUP_PROCESS = "תהליך העבודה";
export const GROUP_EXP = "ניסיון ולקוחות";
export const GROUP_QUALITY = "איכות ורגולציה";
export const GROUP_FLEX = "גמישות ייצור";
export const GROUP_DETAILS = "פרטי התאמה";
export const GROUP_MAP = "מפה ומיקום";
export const GROUP_MEDIA = "תמונות ולוגו";

export const CONTENT_DEFS: ContentDef[] = [
  /* ------------------------------------------------------------ GLOBAL */
  { key: "site.name", label: "שם החברה", type: "text", group: GROUP_GENERAL, page: "global", defaultValue: "סירונה דטרגנטים בע״מ" },
  { key: "site.slogan", label: "סלוגן (מתחת לשם)", type: "text", group: GROUP_GENERAL, page: "global", defaultValue: "ייצור חומרי ניקוי ודטרגנטים באיכות ללא פשרות" },
  { key: "site.logo", label: "לוגו החברה", type: "image", group: GROUP_MEDIA, page: "global", defaultValue: "/images/logo-default.svg", hint: "PNG / JPG / WebP עד 6MB. מוצג בראש האתר ובפאנל הניהול." },
  { key: "footer.about", label: "אודות קצר (תחתית האתר)", type: "textarea", group: GROUP_GENERAL, page: "global", defaultValue: "סירונה דטרגנטים בע״מ — מפעל ישראלי מוביל לייצור חומרי ניקוי, סבונים ודטרגנטים לשוק הביתי והתעשייתי. מבית המותגים Glanz ו-Heidy ועד שירותי מותג פרטי מלאים לרשתות ולמפיצים." },
  { key: "footer.rights", label: "שורת זכויות", type: "text", group: GROUP_GENERAL, page: "global", defaultValue: "© סירונה דטרגנטים בע״מ | כל הזכויות שמורות" },

  /* -------------------------------------------------------------- HOME */
  { key: "home.hero.badge", label: "תגית מעל הכותרת", type: "text", group: GROUP_HERO, page: "home", defaultValue: "מפעל ייצור מוביל בישראל • אזור התעשייה סח׳נין" },
  { key: "home.hero.title", label: "כותרת ראשית", type: "textarea", group: GROUP_HERO, page: "home", defaultValue: "הכוח היצרני שמאחורי המותגים המובילים בישראל" },
  { key: "home.hero.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_HERO, page: "home", defaultValue: "סירונה דטרגנטים מייצרת חומרי ניקוי, סבונים ודטרגנטים לבית ולתעשייה — מהמותגים Glanz ו־Heidy ועד מותגים פרטיים מלאים לרשתות שיווק, מפיצים ומפעלים בכל הארץ." },
  { key: "home.hero.cta1", label: "כפתור ראשי", type: "text", group: GROUP_HERO, page: "home", defaultValue: "לשירותי מותג פרטי" },
  { key: "home.hero.cta2", label: "כפתור משני", type: "text", group: GROUP_HERO, page: "home", defaultValue: "דברו איתנו" },
  { key: "home.hero.image", label: "תמונת Hero", type: "image", group: GROUP_MEDIA, page: "home", defaultValue: "/images/hero-factory.jpg", hint: "מומלץ ברוחב 1600px ומעלה." },
  { key: "home.hero.card1.title", label: "כרטיס צף 1 — כותרת", type: "text", group: GROUP_HERO, page: "home", defaultValue: "Glanz" },
  { key: "home.hero.card1.text", label: "כרטיס צף 1 — טקסט", type: "text", group: GROUP_HERO, page: "home", defaultValue: "סדרת פרימיום לאיכות מקסימלית" },
  { key: "home.hero.card2.title", label: "כרטיס צף 2 — כותרת", type: "text", group: GROUP_HERO, page: "home", defaultValue: "Heidy" },
  { key: "home.hero.card2.text", label: "כרטיס צף 2 — טקסט", type: "text", group: GROUP_HERO, page: "home", defaultValue: "איכות משתלמת לכל משק בית" },
  { key: "home.hero.chip1", label: "שבבית אמון 1", type: "text", group: GROUP_HERO, page: "home", defaultValue: "עמידה מלאה בתקנים" },
  { key: "home.hero.chip2", label: "שבבית אמון 2", type: "text", group: GROUP_HERO, page: "home", defaultValue: "מעבדת פיתוח פנימית" },
  { key: "home.hero.chip3", label: "שבבית אמון 3", type: "text", group: GROUP_HERO, page: "home", defaultValue: "הפצה ארצית מהירה" },

  { key: "home.stat1.value", label: "מדד 1 — ערך", type: "text", group: GROUP_STATS, page: "home", defaultValue: "+30" },
  { key: "home.stat1.label", label: "מדד 1 — תיאור", type: "text", group: GROUP_STATS, page: "home", defaultValue: "שנות ניסיון בייצור" },
  { key: "home.stat2.value", label: "מדד 2 — ערך", type: "text", group: GROUP_STATS, page: "home", defaultValue: "+200" },
  { key: "home.stat2.label", label: "מדד 2 — תיאור", type: "text", group: GROUP_STATS, page: "home", defaultValue: "מוצרים בקווי ייצור" },
  { key: "home.stat3.value", label: "מדד 3 — ערך", type: "text", group: GROUP_STATS, page: "home", defaultValue: "+150" },
  { key: "home.stat3.label", label: "מדד 3 — תיאור", type: "text", group: GROUP_STATS, page: "home", defaultValue: "לקוחות ובתי עסק" },
  { key: "home.stat4.value", label: "מדד 4 — ערך", type: "text", group: GROUP_STATS, page: "home", defaultValue: "100%" },
  { key: "home.stat4.label", label: "מדד 4 — תיאור", type: "text", group: GROUP_STATS, page: "home", defaultValue: "בקרת איכות לכל אצווה" },

  { key: "home.brands.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_BRANDS, page: "home", defaultValue: "בית המותגים שלנו" },
  { key: "home.brands.title", label: "כותרת האזור", type: "textarea", group: GROUP_BRANDS, page: "home", defaultValue: "שני מותגי בית אהובים. מפעל אחד חזק." },
  { key: "home.brands.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_BRANDS, page: "home", defaultValue: "סירונה מייצרת ומשווקת את מותגי הבית Glanz ו־Heidy — ובדיוק באותם קווי ייצור אנחנו מייצרים גם עבור רשתות ומותגים פרטיים." },
  { key: "home.brands.glanz.name", label: "Glanz — שם המותג", type: "text", group: GROUP_BRANDS, page: "home", defaultValue: "Glanz" },
  { key: "home.brands.glanz.tag", label: "Glanz — תגית", type: "text", group: GROUP_BRANDS, page: "home", defaultValue: "איכות פרימיום" },
  { key: "home.brands.glanz.text", label: "Glanz — תיאור", type: "textarea", group: GROUP_BRANDS, page: "home", defaultValue: "מותג הדגל של סירונה — סדרת חומרי ניקוי מתקדמת המשלבת כוח ניקוי חזק, ריחות נעימים ותוצאה נראית לעין. הבחירה של מי שלא מתפשר." },
  { key: "home.brands.glanz.image", label: "Glanz — תמונה", type: "image", group: GROUP_MEDIA, page: "home", defaultValue: "/images/brand-glanz.jpg" },
  { key: "home.brands.heidy.name", label: "Heidy — שם המותג", type: "text", group: GROUP_BRANDS, page: "home", defaultValue: "Heidy" },
  { key: "home.brands.heidy.tag", label: "Heidy — תגית", type: "text", group: GROUP_BRANDS, page: "home", defaultValue: "איכות משתלמת" },
  { key: "home.brands.heidy.text", label: "Heidy — תיאור", type: "textarea", group: GROUP_BRANDS, page: "home", defaultValue: "מותג הבית השני — אותה מחשבת ייצור, במחיר נגיש לכל משפחה. מוצרי ניקוי יומיומיים אמינים עם תמורה מלאה למחיר." },
  { key: "home.brands.heidy.image", label: "Heidy — תמונה", type: "image", group: GROUP_MEDIA, page: "home", defaultValue: "/images/brand-heidy.jpg" },

  { key: "home.cap.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "יכולות ייצור מלאות" },
  { key: "home.cap.title", label: "כותרת האזור", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "כל משפחת מוצרי הניקוי — תחת קורת גג אחת" },
  { key: "home.cap.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "קווי ייצור מתקדמים לבית, למוסדות ולתעשייה — כולל פיתוח פורמולציות ייעודיות במעבדה הפנימית שלנו." },
  { key: "home.cap1.title", label: "יכולת 1 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "דטרגנטים לכביסה" },
  { key: "home.cap1.text", label: "יכולת 1 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "אבקות כביסה, ג׳לים ונוזלים מרוכזים לכל סוגי הבדים והמכונות." },
  { key: "home.cap2.title", label: "יכולת 2 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "חומרי ניקוי לבית" },
  { key: "home.cap2.text", label: "יכולת 2 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "ניקוי רצפות, אסלות, מטבחים, חלונות ומשטחים — מסדרה ביתית ועד מקצועית." },
  { key: "home.cap3.title", label: "יכולת 3 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "מרככי כביסה" },
  { key: "home.cap3.text", label: "יכולת 3 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "מרככים ומשיפצי בדים במגוון ריחות ומרקמים, בריכוזים שונים." },
  { key: "home.cap4.title", label: "יכולת 4 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "סבונים נוזליים" },
  { key: "home.cap4.text", label: "יכולת 4 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "סבון ידיים, סבון כלים, שמפו ותחליבי רחצה — באריזות ביתיות ומילוי חוזר." },
  { key: "home.cap5.title", label: "יכולת 5 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "ניקוי תעשייתי" },
  { key: "home.cap5.text", label: "יכולת 5 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "מסירי שומן, מחטאים ותרכיזים מקצועיים למפעלים, מוסדות ומטבחים מוסדיים." },
  { key: "home.cap6.title", label: "יכולת 6 — כותרת", type: "text", group: GROUP_CAPS, page: "home", defaultValue: "היגיינה וחיטוי" },
  { key: "home.cap6.text", label: "יכולת 6 — טקסט", type: "textarea", group: GROUP_CAPS, page: "home", defaultValue: "תמיסות חיטוי ומוצרי היגיינה לשימוש ביתי ומקצועי, בהתאם לתקנים." },
  { key: "home.cap.image", label: "יכולות — תמונה (מחסן/לוגיסטיקה)", type: "image", group: GROUP_MEDIA, page: "home", defaultValue: "/images/warehouse.jpg" },

  { key: "home.aud.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_AUDIENCE, page: "home", defaultValue: "למי אנחנו מייצרים" },
  { key: "home.aud.title", label: "כותרת האזור", type: "textarea", group: GROUP_AUDIENCE, page: "home", defaultValue: "שותפות ייצור לכל סוג של לקוח עסקי" },
  { key: "home.aud.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_AUDIENCE, page: "home", defaultValue: "מסלולי עבודה מובנים — מהמדף בקמעונאות, דרך מפיצים ארציים ועד מפעלים הזקוקים לפתרון ייצור מלא." },
  { key: "home.aud1.title", label: "קהל 1 — כותרת", type: "text", group: GROUP_AUDIENCE, page: "home", defaultValue: "רשתות שיווק וסופרמרקטים" },
  { key: "home.aud1.text", label: "קהל 1 — טקסט", type: "textarea", group: GROUP_AUDIENCE, page: "home", defaultValue: "סידור מדפים מלא במוצרים איכותיים — מותג פרטי או מותגי הבית שלנו — במחירים תחרותיים, אספקה יציבה ומבצעים מתוזמנים." },
  { key: "home.aud2.title", label: "קהל 2 — כותרת", type: "text", group: GROUP_AUDIENCE, page: "home", defaultValue: "מפיצים וסיטונאים" },
  { key: "home.aud2.text", label: "קהל 2 — טקסט", type: "textarea", group: GROUP_AUDIENCE, page: "home", defaultValue: "תנאי סחר אטרקטיביים, מגוון אריזות ונפחים, ולוגיסטיקה ארצית מהירה ישירות מהמפעל בסח׳נין." },
  { key: "home.aud3.title", label: "קהל 3 — כותרת", type: "text", group: GROUP_AUDIENCE, page: "home", defaultValue: "מפעלים, חברות ומוסדות" },
  { key: "home.aud3.text", label: "קהל 3 — טקסט", type: "textarea", group: GROUP_AUDIENCE, page: "home", defaultValue: "פתרונות ניקוי והיגיינה תעשייתיים בהתאמה אישית — כולל פורמולציות, ריכוזים ואריזות ייעודיות לפי צורך." },

  { key: "home.why.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_WHY, page: "home", defaultValue: "למה סירונה" },
  { key: "home.why.title", label: "כותרת האזור", type: "textarea", group: GROUP_WHY, page: "home", defaultValue: "יצרן אחד. שקט תעשייתי מלא." },
  { key: "home.why1.title", label: "יתרון 1 — כותרת", type: "text", group: GROUP_WHY, page: "home", defaultValue: "ניסיון מוכח" },
  { key: "home.why1.text", label: "יתרון 1 — טקסט", type: "textarea", group: GROUP_WHY, page: "home", defaultValue: "עשרות שנים של ייצור עבור המותגים והרשתות המובילות בשוק הישראלי." },
  { key: "home.why2.title", label: "יתרון 2 — כותרת", type: "text", group: GROUP_WHY, page: "home", defaultValue: "גמישות ייצור" },
  { key: "home.why2.text", label: "יתרון 2 — טקסט", type: "textarea", group: GROUP_WHY, page: "home", defaultValue: "מהזמנת ניסיון ראשונה ועד הזמנות המוניות — בלי פשרה על איכות ולוחות זמנים." },
  { key: "home.why3.title", label: "יתרון 3 — כותרת", type: "text", group: GROUP_WHY, page: "home", defaultValue: "איכות ללא פשרות" },
  { key: "home.why3.text", label: "יתרון 3 — טקסט", type: "textarea", group: GROUP_WHY, page: "home", defaultValue: "מעבדת בקרת איכות פנימית, בדיקות לכל אצווה ועמידה מלאה בתקנים ובדרישות הרגולציה." },
  { key: "home.why4.title", label: "יתרון 4 — כותרת", type: "text", group: GROUP_WHY, page: "home", defaultValue: "שירות אישי" },
  { key: "home.why4.text", label: "יתרון 4 — טקסט", type: "textarea", group: GROUP_WHY, page: "home", defaultValue: "ליווי צמוד מהרעיון ועד המדף — צוות מקצועי שזמין לכל שאלה לאורך כל הדרך." },

  { key: "home.cta.title", label: "כותרת", type: "textarea", group: GROUP_CTA, page: "home", defaultValue: "מחפשים יצרן חזק לצד שלכם?" },
  { key: "home.cta.text", label: "טקסט", type: "textarea", group: GROUP_CTA, page: "home", defaultValue: "בואו נדבר על המוצר הבא שלכם — מותג פרטי, רכש סיטונאי או פתרון ייצור מלא. הצוות שלנו כאן בשבילכם." },
  { key: "home.cta.button", label: "כפתור", type: "text", group: GROUP_CTA, page: "home", defaultValue: "צרו קשר עכשיו" },

  /* ------------------------------------------------------ PRIVATE LABEL */
  { key: "pl.hero.badge", label: "תגית מעל הכותרת", type: "text", group: GROUP_HERO, page: "private", defaultValue: "שירותי OEM • מותג פרטי • ייצור ברישיון" },
  { key: "pl.hero.title", label: "כותרת ראשית", type: "textarea", group: GROUP_HERO, page: "private", defaultValue: "מותג פרטי, מקצה לקצה" },
  { key: "pl.hero.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_HERO, page: "private", defaultValue: "מהרעיון ועד המדף: פיתוח פורמולציה, עיצוב אריזה, ייצור סדרתי, בקרת איכות ולוגיסטיקה — הכל תחת קורת גג אחת במפעל שלנו בסח׳נין." },
  { key: "pl.hero.cta1", label: "כפתור ראשי", type: "text", group: GROUP_HERO, page: "private", defaultValue: "לתיאום פגישת אפיון" },
  { key: "pl.hero.image", label: "תמונת Hero", type: "image", group: GROUP_MEDIA, page: "private", defaultValue: "/images/production-line.jpg" },

  { key: "pl.process.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "איך זה עובד" },
  { key: "pl.process.title", label: "כותרת האזור", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "חמישה שלבים מהרעיון למדף" },
  { key: "pl.process.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "תהליך מסודר ושקוף, עם ליווי אישי בכל שלב — כדי שתדעו בדיוק איפה המוצר שלכם עומד בכל רגע." },
  { key: "pl.step1.title", label: "שלב 1 — כותרת", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "פגישת אפיון" },
  { key: "pl.step1.text", label: "שלב 1 — טקסט", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "מבינים לעומק את הצרכים: קהל יעד, תקציב, מאפייני מוצר, נפחים ואריזות." },
  { key: "pl.step2.title", label: "שלב 2 — כותרת", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "פיתוח ודוגמיות" },
  { key: "pl.step2.text", label: "שלב 2 — טקסט", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "מעבדת הפיתוח מכינה דוגמיות לבחירתכם — עד לאישור מלא של הפורמולציה." },
  { key: "pl.step3.title", label: "שלב 3 — כותרת", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "מיתוג ואריזה" },
  { key: "pl.step3.text", label: "שלב 3 — טקסט", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "התאמת אריזה, מדבקות ושפה גרפית למותג שלכם, כולל סימון רגולטורי מלא." },
  { key: "pl.step4.title", label: "שלב 4 — כותרת", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "ייצור סדרתי" },
  { key: "pl.step4.text", label: "שלב 4 — טקסט", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "ייצור בקווים אוטומטיים עם בקרת איכות בכל אצווה ועמידה מלאה בלוחות הזמנים." },
  { key: "pl.step5.title", label: "שלב 5 — כותרת", type: "text", group: GROUP_PROCESS, page: "private", defaultValue: "אספקה ולוגיסטיקה" },
  { key: "pl.step5.text", label: "שלב 5 — טקסט", type: "textarea", group: GROUP_PROCESS, page: "private", defaultValue: "אריזה במשטחים, שילוח לכל הארץ וזמינות מלאי להזמנות חוזרות." },

  { key: "pl.exp.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_EXP, page: "private", defaultValue: "ניסיון מוכח" },
  { key: "pl.exp.title", label: "כותרת האזור", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "מייצרים עבור המותגים הגדולים בישראל" },
  { key: "pl.exp.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "בחרו בנו כשותפי ייצור — כי כשמדובר באיכות, בעקביות ובסודיות מלאה, המותגים המובילים יודעים למי לפנות." },
  { key: "pl.exp1.brand", label: "לקוח 1 — שם המותג", type: "text", group: GROUP_EXP, page: "private", defaultValue: "סנו" },
  { key: "pl.exp1.tag", label: "לקוח 1 — תגית", type: "text", group: GROUP_EXP, page: "private", defaultValue: "ייצור ברישיון" },
  { key: "pl.exp1.title", label: "לקוח 1 — כותרת", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "ייצור מנקה האסלות של סנו" },
  { key: "pl.exp1.text", label: "לקוח 1 — טקסט", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "סירונה מייצרת את מנקה האסלות עבור סנו — אחד המותגים הוותיקים והמוכרים בישראל — תוך עמידה מלאה בפורמולציה, בסטנדרטים ובבקרות האיכות של החברה." },
  { key: "pl.exp2.brand", label: "לקוח 2 — שם הרשת", type: "text", group: GROUP_EXP, page: "private", defaultValue: "קינג סטור" },
  { key: "pl.exp2.tag", label: "לקוח 2 — תגית", type: "text", group: GROUP_EXP, page: "private", defaultValue: "מותג פרטי" },
  { key: "pl.exp2.title", label: "לקוח 2 — כותרת", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "מותג פרטי מותאם לרשת קינג סטור" },
  { key: "pl.exp2.text", label: "לקוח 2 — טקסט", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "סדרות מותג פרטי בהתאמה אישית עבור רשת קינג סטור — מוצרי ניקוי ודטרגנטים תחת המותג של הרשת, מהפיתוח ועד המדף." },
  { key: "pl.exp.note", label: "שורת סיום", type: "textarea", group: GROUP_EXP, page: "private", defaultValue: "ורשתות, מפיצים ומותגים נוספים בשוק הישראלי — פרטים נוספים יימסרו בפגישה, בכפוף להסכמי סודיות." },

  { key: "pl.quality.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_QUALITY, page: "private", defaultValue: "איכות ורגולציה" },
  { key: "pl.quality.title", label: "כותרת האזור", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "בלי קיצורי דרך — בכל אצווה" },
  { key: "pl.quality.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "כל מוצר עובר מסלול בקרה מלא לפני שהוא יוצא מהמפעל — כי המוניטין שלכם עומד על המדבקה שלו." },
  { key: "pl.q1.title", label: "איכות 1 — כותרת", type: "text", group: GROUP_QUALITY, page: "private", defaultValue: "בקרת איכות קפדנית" },
  { key: "pl.q1.text", label: "איכות 1 — טקסט", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "בדיקות מעבדה לכל אצווה: צמיגות, pH, יציבות, ריח וביצועי ניקוי." },
  { key: "pl.q2.title", label: "איכות 2 — כותרת", type: "text", group: GROUP_QUALITY, page: "private", defaultValue: "תקנים ורישיונות" },
  { key: "pl.q2.text", label: "איכות 2 — טקסט", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "עמידה מלאה בדרישות הרגולציה הישראלית למוצרי ניקוי, כולל סימון ותיעוד מלא." },
  { key: "pl.q3.title", label: "איכות 3 — כותרת", type: "text", group: GROUP_QUALITY, page: "private", defaultValue: "מעבדת פיתוח פנימית" },
  { key: "pl.q3.text", label: "איכות 3 — טקסט", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "כימאים וטכנולוגים מלווים כל פורמולציה — מהקליטה ועד לייצור השוטף." },
  { key: "pl.q4.title", label: "איכות 4 — כותרת", type: "text", group: GROUP_QUALITY, page: "private", defaultValue: "עקביות מלאה" },
  { key: "pl.q4.text", label: "איכות 4 — טקסט", type: "textarea", group: GROUP_QUALITY, page: "private", defaultValue: "אותה תוצאה בדיוק בכל הזמנה — תהליכים מתועדים ובקרות קבלה לחומרי גלם." },
  { key: "pl.quality.image", label: "איכות — תמונת מעבדה", type: "image", group: GROUP_MEDIA, page: "private", defaultValue: "/images/lab-quality.jpg" },

  { key: "pl.flex.eyebrow", label: "תגית קטנה", type: "text", group: GROUP_FLEX, page: "private", defaultValue: "גמישות מלאה" },
  { key: "pl.flex.title", label: "כותרת האזור", type: "textarea", group: GROUP_FLEX, page: "private", defaultValue: "ייצור שמתאים את עצמו לעסק שלכם" },
  { key: "pl.flex.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_FLEX, page: "private", defaultValue: "לא משנה אם אתם רשת ארצית או עסק בדרך למדף הראשון — נבנה לכם מסלול מדויק." },
  { key: "pl.f1.title", label: "גמישות 1 — כותרת", type: "text", group: GROUP_FLEX, page: "private", defaultValue: "פורמולציות בהתאמה אישית" },
  { key: "pl.f1.text", label: "גמישות 1 — טקסט", type: "textarea", group: GROUP_FLEX, page: "private", defaultValue: "ריח, צבע, ריכוז וביצועים — לפי המפרט שלכם או בהשוואה למוצר קיים בשוק." },
  { key: "pl.f2.title", label: "גמישות 2 — כותרת", type: "text", group: GROUP_FLEX, page: "private", defaultValue: "מגוון אריזות" },
  { key: "pl.f2.text", label: "גמישות 2 — טקסט", type: "textarea", group: GROUP_FLEX, page: "private", defaultValue: "בקבוקים, ג׳ריקנים, שקיות מילוי, מכסי מינון וסימון מותג מלא על כל יחידה." },
  { key: "pl.f3.title", label: "גמישות 3 — כותרת", type: "text", group: GROUP_FLEX, page: "private", defaultValue: "כמויות גמישות" },
  { key: "pl.f3.text", label: "גמישות 3 — טקסט", type: "textarea", group: GROUP_FLEX, page: "private", defaultValue: "מהזמנת ניסיון ראשונה ועד הזמנות המוניות סדירות — בקצב של העסק שלכם." },
  { key: "pl.flex.image", label: "גמישות — תמונת אריזות", type: "image", group: GROUP_MEDIA, page: "private", defaultValue: "/images/packaging.jpg" },

  { key: "pl.cta.title", label: "כותרת", type: "textarea", group: GROUP_CTA, page: "private", defaultValue: "מוכנים להשיק את המותג שלכם?" },
  { key: "pl.cta.text", label: "טקסט", type: "textarea", group: GROUP_CTA, page: "private", defaultValue: "ספרו לנו על הפרויקט ונציע מסלול ייצור מדויק — ללא התחייבות. הצוות שלנו מכין דוגמיות ראשונות במהירות." },
  { key: "pl.cta.button", label: "כפתור", type: "text", group: GROUP_CTA, page: "private", defaultValue: "לתיאום פגישת אפיון" },

  /* ------------------------------------------------------------ CONTACT */
  { key: "contact.hero.badge", label: "תגית מעל הכותרת", type: "text", group: GROUP_HERO, page: "contact", defaultValue: "זמינים לכל שאלה" },
  { key: "contact.hero.title", label: "כותרת ראשית", type: "textarea", group: GROUP_HERO, page: "contact", defaultValue: "בואו נדבר עסקים" },
  { key: "contact.hero.subtitle", label: "תת־כותרת", type: "textarea", group: GROUP_HERO, page: "contact", defaultValue: "השאירו פרטים ונחזור אליכם בהקדם — או פשוט התקשרו. צוות המכירות והמפעל זמין בכל ימי השבוע." },
  { key: "contact.form.title", label: "כותרת הטופס", type: "text", group: GROUP_HERO, page: "contact", defaultValue: "שלחו פנייה ישירה" },
  { key: "contact.details.title", label: "כותרת כרטיס פרטים", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "פרטי התאמה" },
  { key: "contact.company", label: "שם החברה", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "סירונה דטרגנטים בע״מ" },
  { key: "contact.address", label: "כתובת", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "אזור התעשייה, סח׳נין" },
  { key: "contact.phone", label: "טלפון", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "04-674-3355" },
  { key: "contact.website", label: "אתר אינטרנט", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "www.sirona.co.il", hint: "יוצג כקישור http://www.sirona.co.il/" },
  { key: "contact.hours", label: "שעות פעילות", type: "text", group: GROUP_DETAILS, page: "contact", defaultValue: "א׳–ה׳ 08:00–17:00 • ו׳ 08:00–13:00" },
  { key: "contact.factory.image", label: "תמונת המפעל", type: "image", group: GROUP_MEDIA, page: "contact", defaultValue: "/images/contact-factory.jpg" },
  { key: "contact.map.title", label: "כותרת אזור המפה", type: "text", group: GROUP_MAP, page: "contact", defaultValue: "המפעל שלנו — אזור התעשייה סח׳נין" },
  { key: "contact.map.subtitle", label: "תת־כותרת המפה", type: "textarea", group: GROUP_MAP, page: "contact", defaultValue: "מוזמנים לתאם ביקור במפעל ולראות מקרוב את קווי הייצור, המעבדה והמחסן הלוגיסטי." },
  { key: "contact.map.lat", label: "קו רוחב (Lat)", type: "text", group: GROUP_MAP, page: "contact", defaultValue: "32.876244" },
  { key: "contact.map.lng", label: "קו אורך (Lng)", type: "text", group: GROUP_MAP, page: "contact", defaultValue: "35.3073864" },
  { key: "contact.map.zoom", label: "רמת זום", type: "text", group: GROUP_MAP, page: "contact", defaultValue: "16" },
];

export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_DEFS.map((d) => [d.key, d.defaultValue])
);

export const CONTENT_DEF_MAP: Record<string, ContentDef> = Object.fromEntries(
  CONTENT_DEFS.map((d) => [d.key, d])
);

export const IMAGE_DEFS = CONTENT_DEFS.filter((d) => d.type === "image");
export const TEXT_DEFS = CONTENT_DEFS.filter((d) => d.type !== "image");

export type InquiryStatus = "new" | "read" | "handled";

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "חדש",
  read: "נקרא",
  handled: "טופל",
};

/** Subject options offered in the public contact form (Hebrew). */
export const INQUIRY_SUBJECTS = [
  "ייצור מותג פרטי",
  "רכש סיטונאי / סידור מדפים",
  "שיתוף פעולה עסקי",
  "פנייה כללית",
];
