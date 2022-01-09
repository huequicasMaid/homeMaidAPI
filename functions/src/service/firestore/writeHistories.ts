import { writeHistory as request } from 'homeMaidServices';
import { firebase } from '@/config/firebase';

export const writeHistory = async (writeHistory: request): Promise<void> => {
  const writeDocument = writeHistory;

  firebase
    .firestore()
    .collection('histories')
    .add({ ...writeDocument, createdAt: new Date() });
};
