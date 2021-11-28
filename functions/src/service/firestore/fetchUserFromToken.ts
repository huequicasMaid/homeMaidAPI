import * as admin from 'firebase-admin';
import { user } from 'homeMaidFirestore';

const firebase = admin.initializeApp();

export const fetchUserFromToken = async (
  token: string
): Promise<user | void> => {
  const tokenSearchResult = await firebase
    .firestore()
    .collection('tokens')
    .where('token', '==', token)
    .get();

  if (tokenSearchResult.empty) return;

  const tokenId = tokenSearchResult.docs[0].id;

  const userSearchResult = await firebase
    .firestore()
    .collection('users')
    .where('tokenId', '==', tokenId)
    .get();

  if (userSearchResult.empty) return;
  return userSearchResult.docs[0].data() as user;
};
