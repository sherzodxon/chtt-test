/**
 * CHTT Test savollari — manba: test.docx (25 ta savol, 3 ta rasm).
 * Word'dagi "(true)" belgisi `correct: true` sifatida saqlangan va UI'da hech qachon ko‘rsatilmaydi.
 * Matnlar Word'dan ko‘chirilib, imlo xatolari tuzatilgan (ma'no va to‘g‘ri javoblar o‘zgarmagan).
 */

export interface Option {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuestionImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Question {
  id: number;
  question: string;
  image?: QuestionImage;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Dmed tizimida «Qabullar» bo‘limi tugmasi bosilganda qaysi bo‘limlar ochiladi?",
    options: [
      { id: "a", text: "Qabul, tizimda ro‘yxatga olish, statsionar, laboratoriya", correct: false },
      { id: "b", text: "Aktiv, bajarildi, bekor qilingan, qabullar taqvimi", correct: true },
      { id: "c", text: "Bajarildi, aktiv, bemorni statsionarga biriktirish", correct: false },
    ],
  },
  {
    id: 2,
    question: "Dmed tizimida hamshira uchun «Hujjatlar» bo‘limiga ruxsat berilganmi?",
    options: [
      { id: "a", text: "Ha, albatta", correct: false },
      { id: "b", text: "Yo‘q", correct: true },
      { id: "c", text: "Mumkin, lekin cheklangan", correct: false },
    ],
  },
  {
    id: 3,
    question: "Ctrl + C tugmalari bir vaqtda bosilsa, qanday ish bajariladi?",
    options: [
      { id: "a", text: "Kesib olish", correct: false },
      { id: "b", text: "Nusxalash", correct: true },
      { id: "c", text: "Belgilash", correct: false },
    ],
  },
  {
    id: 4,
    question: "Ctrl + Enter Word dasturi ichida qanday vazifani bajaradi?",
    options: [
      { id: "a", text: "Yangi matn yaratadi", correct: false },
      { id: "b", text: "Yangi fayl ochadi", correct: false },
      { id: "c", text: "Yangi list qo‘shadi", correct: true },
    ],
  },
  {
    id: 5,
    question: "Dmed tizimida bemor birinchi bo‘lib qaysi bo‘limga uchraydi?",
    options: [
      { id: "a", text: "Qabul bo‘limiga", correct: true },
      { id: "b", text: "Shifokorga", correct: false },
      { id: "c", text: "Amaliyotchi hamshiraga", correct: false },
    ],
  },
  {
    id: 6,
    question: "Qabuldagi bemorning nechta holati bor?",
    options: [
      { id: "a", text: "Taklif etilgan, navbatda, qabulda", correct: true },
      { id: "b", text: "Taklifda, navbatda, ketib qolgan", correct: false },
      { id: "c", text: "Taklif etilmagan, navbatda", correct: false },
    ],
  },
  {
    id: 7,
    question: "Dmed tizimida bemor to‘g‘ridan-to‘g‘ri shifoxonaga murojaat qila oladimi?",
    options: [
      { id: "a", text: "Birinchi navbatda mahallasidagi poliklinikadan yo‘llanma olishi kerak", correct: true },
      { id: "b", text: "Avval shifoxona qabul bo‘limiga murojaat qiladi", correct: false },
      { id: "c", text: "Ha, albatta mumkin", correct: false },
    ],
  },
  {
    id: 8,
    question: "Rasmda qaysi bo‘lim oynasi ko‘rsatilgan?",
    image: {
      src: "/questions/question-8.png",
      width: 343,
      height: 473,
      alt: "Dmed tizimi: bemorni qidirish oynasi (Hujjat bo‘limi)",
    },
    options: [
      { id: "a", text: "Qabul bo‘limining «Aktiv» oynasidagi qabul qilish oynasi", correct: true },
      { id: "b", text: "Statsionar bemorni ro‘yxatga olish", correct: false },
      { id: "c", text: "Retsept yozib berish", correct: false },
    ],
  },
  {
    id: 9,
    question: "Tizimda retsept yozib berishga kimga ruxsat beriladi?",
    options: [
      { id: "a", text: "Texnik xodimga", correct: false },
      { id: "b", text: "Qabul hamshirasiga", correct: false },
      { id: "c", text: "Shifokorga", correct: true },
    ],
  },
  {
    id: 10,
    question:
      "Bemor birinchi marta tashrif buyurganda rasmda ko‘rsatilgan usulda ro‘yxatdan o‘ta oladimi?",
    image: {
      src: "/questions/question-10.png",
      width: 414,
      height: 409,
      alt: "Dmed tizimi: bemorni qabulga yozish oynasi (MyID bo‘limi)",
    },
    options: [
      { id: "a", text: "Yo‘q", correct: true },
      { id: "b", text: "Ha", correct: false },
      { id: "c", text: "Bo‘ladi, agar bemor chet el fuqarosi bo‘lsa", correct: false },
    ],
  },
  {
    id: 11,
    question: "Ctrl + S tugmasi qaysi vazifani bajaradi?",
    options: [
      { id: "a", text: "Saqlash", correct: true },
      { id: "b", text: "Nusxalash", correct: false },
      { id: "c", text: "Nusxani joylash", correct: false },
    ],
  },
  {
    id: 12,
    question: "Operatsion tizimlar to‘g‘ri berilgan qatorni toping.",
    options: [
      { id: "a", text: "Windows, macOS, Google", correct: false },
      { id: "b", text: "macOS, Linux, Windows", correct: true },
      { id: "c", text: "Android, iOS, Telegram", correct: false },
    ],
  },
  {
    id: 13,
    question: "Rasmdagi «Jarayonda» so‘zi qanday ma'noni anglatadi?",
    image: {
      src: "/questions/question-13.png",
      width: 1542,
      height: 395,
      alt: "Dmed tizimi: shifokor ro‘yxati, holati «Jarayonda»",
    },
    options: [
      { id: "a", text: "Hech qanday", correct: false },
      { id: "b", text: "Bemor hali ham davolanishda va ko‘rikda ekanini", correct: true },
      { id: "c", text: "Bemor davolanib bo‘lgan", correct: false },
    ],
  },
  {
    id: 14,
    question: "Kompyuterda asosiy qurilmalar soni nechta?",
    options: [
      { id: "a", text: "5 ta", correct: false },
      { id: "b", text: "4 ta", correct: false },
      { id: "c", text: "3 ta", correct: true },
    ],
  },
  {
    id: 15,
    question: "Patronaj hamshira uchun kunlik rejani kim tuzadi?",
    options: [
      { id: "a", text: "Amaliyotchi hamshira", correct: true },
      { id: "b", text: "Shifokor", correct: false },
      { id: "c", text: "Bo‘lim mudiri", correct: false },
    ],
  },
  {
    id: 16,
    question: "Dmed tizimining bemorlar uchun ham ilovasi bormi?",
    options: [
      { id: "a", text: "Ha", correct: true },
      { id: "b", text: "Yo‘q", correct: false },
      { id: "c", text: "Telegram bot mavjud", correct: false },
    ],
  },
  {
    id: 17,
    question: "Dmed tizimiga kirish uchun qaysi dastur orqali tasdiqlanish kerak?",
    options: [
      { id: "a", text: "Hech qanday tizimdan", correct: false },
      { id: "b", text: "Dmed tizimining maxsus botidan", correct: false },
      { id: "c", text: "OneID tizimi orqali", correct: true },
    ],
  },
  {
    id: 18,
    question: "Bemor chet el fuqarosi bo‘lsa, tizim fuqaroni ro‘yxatga ola oladimi?",
    options: [
      { id: "a", text: "Ha, ro‘yxatga ola oladi", correct: true },
      { id: "b", text: "Yo‘q", correct: false },
      {
        id: "c",
        text: "Agar fuqaro chet el fuqarosi bo‘lsa ham, O‘zbekiston hududida 15 kun yashagan bo‘lsa",
        correct: false,
      },
    ],
  },
  {
    id: 19,
    question: "Alt + Shift tugmalari kombinatsiyasi qanday vazifani bajaradi?",
    options: [
      { id: "a", text: "Kompyuterni yoqish", correct: false },
      { id: "b", text: "Kompyuterni o‘chirish", correct: false },
      { id: "c", text: "Tilni o‘zgartirish", correct: true },
    ],
  },
  {
    id: 20,
    question: "Alt + F4 tugmalari qanday vazifani bajaradi?",
    options: [
      { id: "a", text: "Amalni tasdiqlaydi", correct: false },
      { id: "b", text: "Nusxalaydi", correct: false },
      { id: "c", text: "Chiqish", correct: true },
    ],
  },
  {
    id: 21,
    question: "Dmed tizimida bir martalik parolni kiritish muddati qancha?",
    options: [
      { id: "a", text: "5 daqiqa", correct: true },
      { id: "b", text: "4 daqiqa", correct: false },
      { id: "c", text: "3 daqiqa", correct: false },
    ],
  },
  {
    id: 22,
    question:
      "Bemorning ma'lumotlari Dmed tizimiga kiritilib, kasallik varaqasi to‘liq yopilgandan so‘ng uni o‘zgartirish mumkinmi?",
    options: [
      { id: "a", text: "Ha, mumkin", correct: false },
      { id: "b", text: "Yo‘q, mumkin emas", correct: true },
      { id: "c", text: "Ha, agar bemor kasalxonadan chiqib ketmagan bo‘lsa", correct: false },
    ],
  },
  {
    id: 23,
    question:
      "Shifokor taklif qilishidan oldin bemor o‘z telefonidagi Dmed ilovasi orqali o‘zini o‘zi taklif qila oladimi?",
    options: [
      { id: "a", text: "Ha, mumkin", correct: false },
      { id: "b", text: "Yo‘q, mumkin emas", correct: true },
      { id: "c", text: "Albatta, agar bemor chet el fuqarosi bo‘lsa", correct: false },
    ],
  },
  {
    id: 24,
    question: "HDMI kabel kompyuterning (PC) qaysi qismlarini bog‘lab turadi?",
    options: [
      { id: "a", text: "Monitor va tizim blokini", correct: true },
      { id: "b", text: "Klaviatura va monitorni", correct: false },
      { id: "c", text: "Bunday narsa mavjud emas", correct: false },
    ],
  },
  {
    id: 25,
    question: "Dmed tizimida nechta til mavjud?",
    options: [
      { id: "a", text: "2 ta", correct: false },
      { id: "b", text: "5 ta", correct: false },
      { id: "c", text: "4 ta", correct: true },
    ],
  },
];

export const questionsById = new Map(questions.map((q) => [q.id, q]));
