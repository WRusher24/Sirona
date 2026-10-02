# Sirona Website — Admin Guide (No Coding Required)

This guide is written for the website administrator — **you do not need any
programming knowledge** to use it. Everything on the public website (texts,
headlines, buttons, photos, and the company logo) can be changed in minutes
through a friendly dashboard.

---

## 1. Logging In to the Admin Panel

1. Open your website and add **`/admin`** to the address.
   For example: `https://www.sirona.co.il/admin`
2. You will see a secure login screen (**מערכת ניהול האתר**).
3. Enter the username and password given to you by the person who installed
   the website. On a brand-new installation the defaults are:
   - **Username:** `admin`
   - **Password:** `sirona-2025`
4. Click **התחברות למערכת** (Sign in).

> **Important — protect your site:** after the first login, open the
> **הגדרות** (Settings) tab and change the password to something only you
> know (at least 8 characters, letters and numbers).

You stay logged in for 7 days on the same computer. To sign out, click
**יציאה** (top of the panel). The admin panel is hidden from search engines
and can only be reached with the password.

### The panel at a glance

| Tab (Hebrew) | What it does |
| --- | --- |
| **סקירה כללית** | Dashboard: new inquiries counter, recent messages, shortcuts |
| **עריכת תוכן** | Edit every text on the website |
| **תמונות ולוגו** | Upload/replace/remove the logo and all photos |
| **פניות** | Read and manage messages sent from the Contact page |
| **הגדרות** | Change your password + system notes |

Every change you save appears on the live website **immediately** — visitors
see it as soon as they refresh the page.

---

## 2. Editing Website Texts

Everything written on the site — page titles, paragraphs, button labels,
brand descriptions, phone number, address, working hours and more — is
editable.

1. Open the **עריכת תוכן** (Edit Content) tab.
2. Texts are organized by page: **עמוד הבית** (Home), **מותג פרטי וייצור**
   (Private Label), **צור קשר** (Contact) and **כללי** (site-wide).
3. **Find what you want to change.** The fastest way is the search box at
   the top — type a word from the text (e.g. type `סנו` to find the Sino
   paragraph, or `טלפון` to find the phone number).
4. Click inside the field and type your new wording.
   - Fields marked **לא נשמר** (not saved) have changes waiting.
5. When you finish, click the blue **שמירת שינויים** (Save Changes) button
   in the bar that appears at the bottom of the screen.
6. Open the website in another tab and refresh — your new text is live.

**Good to know**

- **Changed your mind?** Click **ביטול** in the save bar before saving.
- **Want the original text back?** Every field you customized shows a small
  **שחזור ברירת מחדל** (restore default) button next to its name.
- You cannot break the design: long texts simply wrap, and nothing on the
  live site will look "broken" if a text is longer or shorter.

---

## 3. Uploading Photos & the Company Logo (from your PC)

Go to the **תמונות ולוגו** (Images & Logo) tab.

### Replacing the company logo

1. The first card, **לוגו החברה**, shows the current logo (it appears in the
   website header).
2. Click **החלפה מהמחשב** (Replace from computer).
3. Pick an image file from your PC — **PNG with a transparent background
   looks best** (JPG / WebP / GIF also work, up to 6MB).
4. That's it — the new logo appears in the website header instantly.

### Replacing any site photo

Each card in **תמונות האתר** belongs to a section (Hero photo, Glanz brand
photo, production line, laboratory, warehouse, factory, etc.). The card
shows which page it belongs to.

- **החלפה מהמחשב** — choose a new photo from your PC (recommended width
  1600px for large photos).
- **הסרה** (Remove) — hides the photo from the site; the section keeps a
  clean, elegant empty area instead of a broken image.
- **שחזור ברירת מחדל** (Restore default) — brings back the original
  professional photo that shipped with the site.

**Tips for best results**

- Use bright, landscape (wide) photos — they match the site's light design.
- Compress very large photos before uploading (max 6MB per file).
- Keep a folder on your PC with the original images, so you can always
  re-upload them after a server migration.

---

## 4. Managing B2B Inquiries (צור קשר messages)

Every message submitted through the Contact form is stored here — nothing is
lost.

1. Open the **פניות** (Inquiries) tab. A red badge on the tab shows how many
   **new** messages are waiting.
2. Each inquiry card shows: the sender's name, business/company, subject,
   full message, date and status.
3. Use the filter buttons on top (**הכל / חדש / נקרא / טופל**) to see only
   what you need.
4. After reading a message, click **סימון כנקרא** (mark as read). After
   answering the customer (by phone/email), click **סימון כטופל** (mark as
   handled) so the list stays tidy.
5. **החזרה לחדש** returns a message to "new" if it needs attention again.
6. **מחיקה** (Delete) permanently removes a message (you'll be asked to
   confirm).

---

## 5. Changing Your Password

1. Open **הגדרות** (Settings).
2. Under **שינוי סיסמת מנהל**, type your current password, then the new
   password twice, and click **שמירת סיסמה חדשה**.
3. Use the new password on your next login.

**Forgot your password?** Ask your technical contact (or whoever hosts the
site) to reset it: they can delete the admin row from the `admins` table
(e.g. `DELETE FROM admins;`) — the system will then recreate the account
from the `ADMIN_USERNAME` / `ADMIN_PASSWORD` values in the server's `.env`
file on the next login attempt.

---

## 6. Everyday Best Practices

- **Edit titles, keep the meaning:** visitors come for a manufacturer they
  can trust — keep texts professional and clear.
- **Review inquiries daily:** a fast answer wins B2B deals.
- **Refresh photos seasonally:** a new Hero or factory photo keeps the site
  alive — one upload is all it takes.
- **Nothing here can break the site:** every change is reversible with
  השחזרה לברירת המחדל, and the original content always remains available.

If anything looks off after a change and you can't restore it, note which
field you edited and contact your technical support with the details — all
changes are stored in the database and can be rolled back.
