import {
    FrameRequest,
    getFrameAccountAddress,
    getFrameMessage,
    getFrameHtmlResponse,
  } from '@coinbase/onchainkit';
  import { NextRequest, NextResponse } from 'next/server';


  async function get_scores() {
    const response = await fetch('https://nhl-score-api.herokuapp.com/api/scores/latest');
    const data = await response.json();
    console.log(data);
    return data;
  }
  
  async function getResponse(req: NextRequest): Promise<NextResponse> {
    let accountAddress: string | undefined = '';
  
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);
    const score_data = await get_scores();
  
    if (isValid) {
      try {
        accountAddress = await getFrameAccountAddress(message, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
      } catch (err) {
        console.error(err);
      }
    }
    

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `🌊 ${accountAddress} 🌊`,
          },
          {
            label: `games: ${score_data.games.length}`
          }
        ],
        image: `https://picsum.photos/640/360`
      }),
    );
  }
  
  export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
  }
  
  export const dynamic = 'force-dynamic';