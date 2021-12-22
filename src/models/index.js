// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Video, Course } = initSchema(schema);

export {
  User,
  Video,
  Course
};