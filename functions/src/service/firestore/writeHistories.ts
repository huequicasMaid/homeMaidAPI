import { history } from 'homeMaidFirestore';
import { firebase } from '@/config/firebase';

export const writeHistory = async (writeHistory: history): Promise<void> => {
  const writeDocument = writeHistory;

  firebase.firestore().collection('histories').add(writeDocument);
};
