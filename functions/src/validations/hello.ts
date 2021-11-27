import { CustomValidator } from 'express-validator';
import * as admin from 'firebase-admin';
const firebase = admin.initializeApp();

export const isTokenExist: CustomValidator = async (token: string) => {
  const searchResult = await firebase
    .firestore()
    .collection('tokens')
    .where('token', '==', token)
    .get();

  if (searchResult.empty) throw new Error('unauthorized: unexpected token.');
};
