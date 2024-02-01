'use client'

import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic'
import { Suspense } from 'react';
import { View } from '@/components/canvas/view';
import { Common } from '@/components/canvas/view';


const Test = dynamic(() => import('@/components/canvas/Test').then((mod) => mod.Test), { ssr: false })

export default function Page(data: any) {
  console.log(data)
  return (
    <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Test route={'/blob'} scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
  );
}
