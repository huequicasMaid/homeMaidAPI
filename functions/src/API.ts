import express from 'express';
import devices from '@/service/devices';
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

app.get('/hello', (req: express.Request, res: express.Response) => {
  res.send({ statusCode: 200, message: 'hello' });
});

export default app;
