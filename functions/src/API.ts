import express from 'express';
import { header, validationResult } from 'express-validator';
import { execRequest, helloRequest } from 'homeMaidApi';
import { fetchUserFromToken } from '@/service/firestore/fetchUserFromToken';
import exec from '@/service/exec';
import { writeHistory } from '@/service/firestore/writeHistories';
import {
  ExecutionFailedException,
  SceneIdNotFoundException,
  UserNotFoundException,
} from '@/exception';

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
  header('authorization').notEmpty(),
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

    try {
      const userResponse = await fetchUserFromToken(req.headers.authorization);
      // request execute scene to switchBotAPI
      const sceneApiRequest = await exec(
        Boolean(req.body.isTurnOn),
        Boolean(req.body.withRoom)
      );

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
    } catch (error: unknown) {
      if (error instanceof UserNotFoundException) {
        return res
          .status(401)
          .send({ statusCode: 401, message: 'User not found' });
      }

      if (error instanceof SceneIdNotFoundException) {
        return res
          .status(500)
          .send({ statusCode: 500, message: 'SceneId not found.' });
      }

      if (error instanceof ExecutionFailedException) {
        return res
          .status(500)
          .send({ statusCode: 500, message: 'API REQUEST ERROR' });
      }

      return res
        .status(500)
        .send({ statusCode: 500, message: 'Caught Unhandled Exception.' });
    }
  }
);

export default app;
