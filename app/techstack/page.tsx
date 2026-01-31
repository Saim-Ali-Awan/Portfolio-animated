import { Skiper30 } from '@/components/ui/skiper-ui/skiper30'
import React from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Saim Ali | Techstack",
  description: "Welcome to my portfolio",
};
const page = () => {
  return (
    <div>
      <Skiper30 />
    </div>
  )
}

export default page
