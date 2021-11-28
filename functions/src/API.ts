import express from 'express';
import { body, check, validationResult } from 'express-validator';
import { execRequest, helloRequest } from 'homeMaidApi';
import { fetchUserFromToken } from '@/service/firestore/fetchUserFromToken';
import devices from '@/service/devices';
import scenes from '@/service/scenes';
import exec from '@/service/exec';

const app: express.Express = express();
app.use(express.json({}));

app.get('/devices', async (req: express.Request, res: express.Response) => {
  const devicesResponse = await devices();
  if (!devicesResponse) {
    res.send({ statusCode: 500, message: 'API REQUEST ERROR' });
    return;
  }

  res.send({
    statusCode: devicesResponse.statusCode,
    body: devicesResponse.body,
  });
});

app.get('/scenes', async (req: express.Request, res: express.Response) => {
  const sceneResponse = await scenes();

  if (!sceneResponse) {
    res.send({ statusCode: 500, message: 'API REQUEST ERROR' });
    return;
  }

  res.send({
    statusCode: sceneResponse.statusCode,
    body: sceneResponse.body,
  });
});

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

  const sceneApiRequest = await exec(
    Boolean(req.body.isTurnOn),
    Boolean(req.body.withRoom)
  );

  if (!sceneApiRequest) {
    res.send({
      statusCode: 500,
      message: 'API REQUEST ERROR',
    });
    return;
  }

  res.send({
    statusCode: 200,
    message: sceneApiRequest.message,
    body: sceneApiRequest.body,
  });
});

export default app;
