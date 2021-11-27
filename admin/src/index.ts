import * as admin from 'firebase-admin';
import cryptoRandomString from 'crypto-random-string';
import { serviceAccount } from './.serviceAccount';
import { token, user } from 'homeMaidAdminFirestore';

const main = async () => {
  const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  let isTokenExist = true;
  let token = cryptoRandomString({ length: 68, type: 'url-safe' });

  // Generate unique token
  while (isTokenExist) {
    // search duplicate token
    const searchResult = await firebase
      .firestore()
      .collection('tokens')
      .where('token', '==', token)
      .get();

    if (!searchResult.empty) {
      // Regenerate token
      token = cryptoRandomString({ length: 68, type: 'url-safe' });
    } else {
      isTokenExist = false;
    }
  }
  console.log('Issued Token: ', token);

  const tokenId = firebase.firestore().collection('users').doc().id;

  const tokenDocumentData: token = { token };
  const usersDocumentData: user = {
    userName: 'huequica',
    tokenId,
  };
  const writeResponses = await Promise.all([
    firebase
      .firestore()
      .collection('tokens')
      .doc(tokenId)
      .set(tokenDocumentData),
    firebase.firestore().collection('users').doc().set(usersDocumentData),
  ]);

  console.log(writeResponses);
};

main();
