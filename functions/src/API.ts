import express from 'express';
import { header, validationResult } from 'express-validator';
import { execRequest, helloRequest } from 'homeMaidApi';
import { fetchUserFromToken } from '@/service/firestore/fetchUserFromToken';
import exec from '@/service/exec';
import { writeHistory } from '@/service/firestore/writeHistories';

const app: express.Express = express();
app.use(express.json({}));

app.get(
  '/hello',
  header('authorization').notEmpty(),
  async (req: helloRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ statusCode: 401, message: errors.array() });
    }

    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ statusCode: 401, message: 'missing token' });
    }

    const userResponse = await fetchUserFromToken(req.headers.authorization);
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
  header('token').notEmpty(),
  async (req: execRequest, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ statusCode: errors.array() });
    }

    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ statusCode: 401, message: 'missing token' });
    }

    const userResponse = await fetchUserFromToken(req.headers.authorization);
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
