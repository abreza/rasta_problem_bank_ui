import { schema } from 'normalizr';

const user = new schema.Entity('users');
const subTag = new schema.Entity('subTags');
const tag = new schema.Entity('tags', {
  subTags: [subTag],
});
const event = new schema.Entity('events');
const source = new schema.Entity('sources', {
  subTags: [subTag],
});
const questionProperty = new schema.Entity('questionProperties', {
  tags: [tag],
  events: [event],
  source: [source],
});

const question = new schema.Entity('questions');

export const Schemas = {
  USER: user,
  USER_ARRAY: [user],
  QUESTION_PROPERTIES: questionProperty,
  QUESTION: question,
  QUESTION_ARRAY: [question],
};
