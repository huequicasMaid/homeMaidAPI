import express from 'express';
import devices from '@/service/devices';
const app: express.Express = express();

app.use(express.json);
app.use(express.urlencoded({extended: true}));

app.get('/devices', async (req: express.Request, res: express.Response) => {
  const devicesResponse = await devices();

  if (!devicesResponse) {
    res.send({statusCode: 500, message: 'API REQUEST ERROR'});
    return;
  }

  res.send({
    statusCode: devicesResponse.statusCode,
    body: devicesResponse.body,
  });
});

export default app;
