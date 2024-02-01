import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'https://nhl-scores.vercel.app/';

const frameMetadata = getFrameMetadata({
  buttons: [{label: 'Farcaster'}, {label: 'Twitter'}],
  image: 'https://first-frame-phi.vercel.app/choice.jpg',
  post_url: 'https:///first-frame-phi.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: '',
  description: 'choose',
  openGraph: {
    title: 'choose',
    description: 'pick a path',
    images: ['https://first-frame-phi.vercel.app/lightpath.jpg', 'https://first-frame-phi.vercel.app/darkpath.png'],
  },
  other: {
    ...frameMetadata,
  },
};

async function get_scores() {
  const response = await fetch('https://nhl-score-api.herokuapp.com/api/scores/latest');
  const data = await response.json();
  console.log(data);
  return data;
}


export default function Page(data: any) {
  console.log(data)
  return (
    <>
      <h1>nhl scores</h1>
    </>
  );
}
