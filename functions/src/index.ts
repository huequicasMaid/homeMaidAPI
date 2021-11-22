import * as functions from 'firebase-functions';

type response = {
  status: number;
  message: string;
};

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  const res: response = {
    status: 200,
    message: 'Hello from Firebase!',
  };
  response.send(res);
});

export const helloWorld2 = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  const res: response = {
    status: 200,
    message: 'Hello from Firebase!',
  };
  response.send(res);
});
