import express from 'express';
import { body, check, validationResult } from 'express-validator';
import { execRequest, helloRequest } from 'homeMaidApi';
import { fetchUserFromToken } from '@/service/firestore/fetchUserFromToken';
import exec from '@/service/exec';
import { writeHistory } from './service/firestore/writeHistories';

const app: express.Express = express();
app.use(express.json({}));

app.get(
  '/hello',
  [check('token').notEmpty()],
  async (req: helloRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ statusCode: 401, message: errors.array() });
    }

    if (!req.query.token) {
      return res
        .status(401)
        .send({ statusCode: 500, message: 'missing token' });
    }

    const userResponse = await fetchUserFromToken(req.query.token);
    if (!userResponse) {
      return res
        .status(401)
        .send({ statusCode: 401, message: 'User not found.' });
    }

    return res.send({
      statusCode: 200,
      message: `hello, ${userResponse.userName}`,
    });
  }
);

app.post(
  '/exec',
  [body('token').notEmpty()],
  async (req: execRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ statusCode: errors.array() });
    }

    if (!req.body.token) {
      return res
        .status(401)
        .send({ statusCode: 401, message: 'missing token' });
    }

    const userResponse = await fetchUserFromToken(req.body.token);
    if (!userResponse) {
      return res
        .status(401)
        .send({ statusCode: 401, message: 'User not found' });
    }

    // request execute scene to switchBotAPI
    const sceneApiRequest = await exec(
      Boolean(req.body.isTurnOn),
      Boolean(req.body.withRoom)
    );

    if (!sceneApiRequest) {
      return res.send({
        statusCode: 500,
        message: 'API REQUEST ERROR',
      });
    }

    // no wait to complete histories transaction
    writeHistory({
      category: 'apiExecute',
      endpoint: sceneApiRequest.execPath,
      user: userResponse,
      result: sceneApiRequest.data,
    });

    return res.send({
      statusCode: 200,
      message: sceneApiRequest.data.message,
      body: sceneApiRequest.data.body,
    });
  }
);

export default app;
