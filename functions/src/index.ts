import * as functions from 'firebase-functions';
import app from './API';

const api = functions.https.onRequest(app);
export { api };
