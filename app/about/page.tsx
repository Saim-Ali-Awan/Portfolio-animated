import { Metadata } from 'next';
import { Skiper28 } from '@/components/ui/skiper-ui/skiper28'
import React from 'react'
export const metadata: Metadata = {
  title: "Saim Ali | Home",
  description: "Welcome to my portfolio",
};
const page = () => {
  return (
    <div>
      <Skiper28 />
    </div>
  )
}

export default page
