import * as functions from 'firebase-functions';
import app from './API';

const api = functions.region('asia-northeast1').https.onRequest(app);
export { api };
