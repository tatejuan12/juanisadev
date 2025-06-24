import JuanGPT from "./sections/JuanGPT";
import Hero from "@app/sections/Hero";
import Journey from "@app/sections/Journey";
import "@styles/_base.scss";

export default function Home() {
    return (
        <main>
            <Hero/>
            <JuanGPT/>
            <Journey/>
        </main>
    );
}
