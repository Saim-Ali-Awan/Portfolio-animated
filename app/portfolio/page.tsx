
import { Metadata } from 'next';
import React from 'react'
import Skiper16 from '@/components/ui/skiper-ui/skiper16'
export const metadata: Metadata = {
  title: "Saim Ali | Portfolio",
  description: "Welcome to my portfolio",
};
const page = () => {
  return (
    <div>
      <Skiper16 />
    </div>
  )
}

export default page
