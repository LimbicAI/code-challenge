export const hasLessWordsThan = (text = '', wordCount = 1) =>
  text.split(' ').length < wordCount;
export const isSentence = (text) => !hasLessWordsThan(text, 3);
