import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import get_canvas from './frame-canvas.js';
 
const app = express();
 
interface IFrameProps {
  frame?: string;
  imageUrl: string;
  buttons?: string[];
  postUrl?: string;
}

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

function generateFarcasterFrameMetaTag({ frame, imageUrl, postUrl, buttons }: IFrameProps): string {
  // Default to vNext
  if (!frame) {
      frame = "vNext"
  }
  // Ensure there are at most four buttons
  if (buttons && buttons.length > 4) {
      throw new Error("Maximum of four buttons are allowed per frame.");
  }

  // Generate Open Graph tags for image, redirect, and buttons
  let metaTag = `<meta property="fc:frame" content="${frame ? frame : "vNext"}" />\n`;
  metaTag += `<meta property="fc:frame:image" content="${imageUrl}" />\n`;

  if (buttons) {
      buttons.forEach((button, index) => {
          metaTag += `<meta property="fc:frame:button:${index + 1}" content="${button}" />\n`;
      });
  }

  // post URL if exists
  if (postUrl) {
      metaTag += `<meta property="fc:frame:post_url" content="${postUrl}" /> \n`
  }

  return metaTag;
}

async function frameGenerator(frameProps: IFrameProps): Promise<string> {

  const metaTag = generateFarcasterFrameMetaTag(frameProps);


  const { getServerData } = await import('./dist/function/function.js');
  const data = await getServerData();

  const img = get_canvas(data);

  const html = `<!DOCTYPE html>
      <html>
          <head>
              <meta charset="utf-8">
              <title>NHL Scores</title>
              <meta property="og:title" content="NHLScores" />
              <meta property="og:image" content="${img}" />
              ${metaTag}
          </head>
      </html>
  `;
  return html;
}

app.get('/frame', (req, res) => {

  const frameProps: IFrameProps = {
      imageUrl: 'https://i.imgur.com/osEKmhB.png',
      buttons: ['get', 'button2'],
  };

  res.status(200).send(frameGenerator(frameProps));
});

app.post('/frame', (req, res) => {

  console.log(req.body)

  const frameProps: IFrameProps = {
      imageUrl:  'https://i.imgur.com/osEKmhB.png',
      buttons: ['post', 'button2'],

  };
  
  res.status(200).send(frameGenerator(frameProps));
});
 
app.listen(5173, () => {
  console.log('http://localhost:5173.');
});