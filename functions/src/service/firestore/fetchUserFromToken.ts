import { user } from 'homeMaidFirestore';
import { firebase } from '@/config/firebase';
import { UserNotFoundException } from '@/exception';

/**
 * search request user from token
 * @param {string} token
 * @return {Object} User Object
 * @throws {UserNotFoundException} Not exist user or token
 */
export const fetchUserFromToken = async (token: string): Promise<user> => {
  const tokenSearchResult = await firebase
    .firestore()
    .collection('tokens')
    .where('token', '==', token)
    .get();

  if (tokenSearchResult.empty) throw new UserNotFoundException();

  const tokenId = tokenSearchResult.docs[0].id;

  const userSearchResult = await firebase
    .firestore()
    .collection('users')
    .where('tokenId', '==', tokenId)
    .get();

  if (userSearchResult.empty) throw new UserNotFoundException();
  return userSearchResult.docs[0].data() as user;
};
