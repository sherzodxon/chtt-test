# CHTT Test

Frontend-only test ilovasi (Next.js 16, App Router, TypeScript, CSS Modules). Backend yo‘q — barcha holat `localStorage`da.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Tuzilma

- `data/questions.ts` — 25 ta savol (test.docx'dan), `correct: true` — to‘g‘ri javob
- `public/questions/` — savol rasmlari (8, 10, 13-savollar)
- `lib/testStore.ts` — test holati (start, javob, navigatsiya, yakunlash, reset), localStorage bilan sinxron
- `lib/scoring.ts` — natija hisoblash (60% va undan yuqori — o‘tdi)
- `lib/config.ts` — vaqt (30 daqiqa), o‘tish bali, tab qoidalari
- `hooks/` — `useTestSnapshot`, `useCountdown`, `useTabMonitor`
- `app/` — `/` start, `/test` test, `/result` natija

## Savollarni o‘zgartirish

`data/questions.ts` faylini tahrirlang. Har bir savolda bitta variant `correct: true` bo‘lishi kerak.
Rasm qo‘shish uchun faylni `public/questions/` ga joylab, `image` maydonini (src, width, height, alt) to‘ldiring.
# chtt-test
