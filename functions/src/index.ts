import * as functions from 'firebase-functions';
import app from './API';

functions.https.onRequest(app);
export {app};
