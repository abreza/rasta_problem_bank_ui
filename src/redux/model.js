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
      shortInfo: {
        id: 123,
        name: '',
        tags: [],
        difficultyLevel: 5,
        reviewStatus: 'W',
      },
      difficulty: {
        difficultyLevel: 5,
        appropriateGrades: [9, 12],
      },
      publishedDate: '',
      source: '',
      author: '',
      events: [],
      subTags: [],
      questionText: '',
      questionAnswer: '',
    },
  ],

  allUsers: [
    {
      isLoggedIn: false,
      name: 'Mamadreza Kiani',
      username: 'MAMAD_KIA',
      type: 'ADDER',
      numberOfAddedQuestions: 2,
      lastSeen: '99/4/19',
    },
    {
      isLoggedIn: true,
      name: 'Alireza HAshemi',
      username: 'AmooHashem',
      type: 'MENTOR',
      numberOfAddedQuestions: 9,
      lastSeen: '99/4/19',
    },
  ],

  thisUser: {
    isLoggedIn: false,
    name: 'Mamadreza Kiani',
    username: 'MAMAD_KIA',
    type: 'ADDER',
    numberOfAddedQuestions: 2,
    lastSeen: '99/4/19', //TODO: what to do?‌ :)
  },
};
