import express from 'express';
import devices from '@/service/devices';
import scenes from '@/service/scenes';
const app: express.Express = express();

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
  if (!sceneResponse || !sceneResponse.statusCode || sceneResponse.body) {
    res.send({ statusCode: 500, message: 'API  REQUEST ERROR' });
    return;
  }

  res.send({
    statusCode: sceneResponse.statusCode || 500,
    body: sceneResponse.body,
  });
});

app.get('/hello', (req: express.Request, res: express.Response) => {
  res.send({ statusCode: 200, message: 'hello' });
});

export default app;
