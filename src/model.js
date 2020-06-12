let rasta_bank = {

  isLoading: false,
  

  questionProperties: {
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
    authors: ['عرفان معینی', 'رضا ابوالقاسمی'],
  },

  questions: [
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
          hardnessValue: 5,// همونی که از ۱۰عه
          leastAppropriateGrade: 9,
          lastAppropriateGrade: 12,
        },
        reviewStatus: '', // وضعیت بازبینی سوال توسط منتورهای بالاسری 
      },
      questionText: '',
      questionAnswer: '',
    },
  ],

  account: {
    isLoggedIn: false,
    user: {
      type: 'STUDENT',
    },
  },
};