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


export default function Page() {
  return (
    <>
      <h1>nhl scores</h1>
    </>
  );
}
