import * as admin from 'firebase-admin';
import cryptoRandomString from 'crypto-random-string';
import { serviceAccount } from './.serviceAccount';

const main = async () => {
  const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const tokenId = firebase.firestore().collection('users').doc().id;

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

  const documentData = { token };
  const writeDocumentResponse = await firebase
    .firestore()
    .collection('tokens')
    .doc(tokenId)
    .set(documentData);

  console.log(writeDocumentResponse);
};

main();
