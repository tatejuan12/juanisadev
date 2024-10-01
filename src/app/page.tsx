import styles from "@styles/modules/_page.module.scss";
import Image from "next/image";
import { TypewriterGreeting } from "./parts/TypewriterGreeting";
import JuanGPT from "./sections/JuanGPT";
import Hero from "@app/sections/Hero";
import { Avatar } from "./parts/Avatar";

export default function Home() {
  return (
    <main>
      <Hero/>
      <JuanGPT/>
    </main>
  );
}
