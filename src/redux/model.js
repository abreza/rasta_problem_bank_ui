// eslint-disable-next-line no-unused-vars
let rasta_bank = {
  isLoading: false,

  questionProperties: {
    tags: [
      {
        id: 1,
        name: 'ترکیبیات',
        subtags: [
          { name: 'استقرا', id: 2 },
          { name: 'لانه کبوتری', id: 6 },
        ],
      },
      {
        id: 2,
        name: 'هندسه',
        subtags: [
          { name: 'مسطحه', id: 2 },
          { name: 'فضایی', id: 6 },
        ],
      },
    ],
    events: ['مدرسه تابستانه', 'کابارآمادالاپسته'],
    sources: ['المپیاد ریاضی روسیه', 'سایت بریلیانت'],
  },

  allQuestions: [
    {
      info: {
        id: 123,
        name: '',
        tags: [],
        hardnessValue: 5, // همونی که از ۱۰عه
        reviewStatus: '', // وضعیت بازبینی سوال توسط منتورهای بالاسری
      },

      author: '',
      hardness: {
        hardnessValue: 5, // همونی که از ۱۰عه
        leastAppropriateGrade: 9,
        lastAppropriateGrade: 12,
      },
      events: [],
      source: '',
      subTags: [],
      questionText: '',
      questionAnswer: '',
    },
  ],

  allAccounts: [

  ],

  thisAccount: {
    isLoggedIn: false,
    name: 'Mamadreza Kiani',
    type: 'STUDENT',
  },
};
