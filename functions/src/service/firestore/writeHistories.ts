import { writeHistory as request } from 'homeMaidServices';
import { firebase } from '@/config/firebase';

export const writeHistory = async (writeHistory: request): Promise<void> => {
  firebase
    .firestore()
    .collection('histories')
    .add({ ...writeHistory, createdAt: new Date() });
};
