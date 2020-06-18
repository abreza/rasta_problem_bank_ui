// eslint-disable-next-line no-unused-vars
let rasta_bank = {
  isLoading: false,

  questionProperties: {
    authors: [],
    tags: [
      {
        id: 1,
        name: 'ترکیبیات',
        subtags: ['استقرا', 'لانه کبوتری'],
      },
      {
        id: 2,
        name: 'هندسه',
        subtags: ['مسطحه', 'فضایی'],
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
        author: '',
        tags: [],
        subTags: [],
        events: [],
        source: '',
        hardness: {
          hardnessValue: 5, // همونی که از ۱۰عه
          leastAppropriateGrade: 9,
          lastAppropriateGrade: 12,
        },
        reviewStatus: '', // وضعیت بازبینی سوال توسط منتورهای بالاسری
      },
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
