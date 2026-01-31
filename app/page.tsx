import { Metadata } from "next";
import { Skiper31 } from "@/components/ui/skiper-ui/skiper31";

export const metadata: Metadata = {
  title: "Saim Ali | Home",
  description: "Welcome to my portfolio",
};

export default function Home() {
  return <Skiper31 />;
}