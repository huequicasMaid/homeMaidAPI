import * as admin from 'firebase-admin';
import { history } from 'homeMaidFirestore';
const firebase = admin.initializeApp();

export const writeHistory = async (writeHistory: history): Promise<void> => {
  const writeDocument = writeHistory;

  firebase.firestore().collection('histories').add(writeDocument);
};
