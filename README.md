# LUMI Photography Studio

אתר תדמית רספונסיבי לצלמת, עם מקומות שמורים לתמונות ראשיות, תיק עבודות ותמונת הצלמת.

## דרישות

- Node.js 22.13 ומעלה
- npm

הפרויקט עובד ישירות ב-Windows, ב-macOS וב-Linux. אין צורך ב-Bash או ב-WSL.

## הפעלה ב-Windows

פתחי PowerShell בתיקיית הפרויקט והריצי:

```powershell
npm install
npm run dev
```

לאחר שהשרת עולה, פתחי בדפדפן את הכתובת שמוצגת במסוף.

## בניית גרסת Production

```powershell
npm run build
npm run start
```

## קבצים עיקריים

- `app/page.tsx` — מבנה ותוכן האתר
- `app/globals.css` — העיצוב וההתאמה למסכים שונים
- `app/layout.tsx` — הגדרות השפה והמטא-דאטה
- `public/` — המקום לקובצי התמונות והלוגו

## הוספת תמונות בהמשך

בשלב הנוכחי מופיעים באתר מקומות שמורים לתמונות בלבד. לאחר הוספת התמונות לתיקיית `public`, ניתן להחליף את אזורי ה-placeholder ברכיבי תמונה בתוך `app/page.tsx`.
