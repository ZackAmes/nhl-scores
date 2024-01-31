import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { frameGenerator, IFrameProps } from './frames.js';
 
const app = express();

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

app.use('/', async (_, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');
 
    
    const { getServerData } = await import('./dist/function/function.js');
    const data = await getServerData();
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
 
 
    const html = template.replace(`<!--outlet-->`, `${render(data)} ${script}`);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.get('/frame', async (req, res) => {

  let data;
  try {
    const { getServerData } = await import('./dist/function/function.js');
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
    const { getServerData } = await import('./dist/function/function.js');
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
 
app.listen(5173, () => {
  console.log('http://localhost:5173.');
});