import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';
import { getFrameAccountAddress } from '@coinbase/onchainkit';
import {IFrameProps, frameGenerator} from './frames';

const app = express();
 
const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});
 
app.use(vite.middlewares);
 
app.use('/', async (req, res) => {
  const url = req.originalUrl;
 
  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    const { getServerData } = await vite.ssrLoadModule('/src/function.ts');
    const data = await getServerData();
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
 
 
    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end('error');
  }
});
 
app.get('/frame', async (req, res) => {

  let data;
  try {
    const { getServerData } = await vite.ssrLoadModule('/src/function.ts');
    const data = await getServerData();
  } catch (error) {
    res.status(500).end('error');
  }

  const frameProps: IFrameProps = {
    data: data,
    buttons: ['get', 'button2'],
  };


  

  res.status(200).send(frameGenerator(frameProps));
});

app.post('/frame', async (req, res) => {

  console.log(req.body)

  let data;
  try {
    const { getServerData } = await vite.ssrLoadModule('/src/function.ts');
    const data = await getServerData();
  } catch (error) {
    res.status(500).end('error');
  }

  const frameProps: IFrameProps = {
    data: data,
    buttons: ['get', 'button2'],
  };
  
  res.status(200).send(frameGenerator(frameProps));
});

app.listen(4173, () => {
  console.log('http://localhost:4173.');
});