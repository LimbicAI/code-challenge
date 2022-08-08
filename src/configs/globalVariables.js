export const defaultQuestions = [
  {
    questionString: 'Default question 1 ?',
    type: 'text-area',
  },
  {
    questionString: 'Default question 2 ?',
    type: 'radio',
    options: [
      {
        value: 'radioValue1',
      },
      {
        value: 'radioValue2',
      },
    ],
  },
  {
    questionString: 'Default question 3 ?',
    type: 'checkbox',
    options: [
      {
        value: 'checkValue1',
      },
      {
        value: 'checkValue2',
      },
    ],
  },
];

export const answerTypes = [
  {
    label: 'text-area',
  },
  {
    label: 'radio',
  },
  {
    label: 'checkbox',
  },
];
