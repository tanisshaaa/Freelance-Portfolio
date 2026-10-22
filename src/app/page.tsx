import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Nutshell } from "@/components/Nutshell";
import { Services } from "@/components/Services";
import { WorkGrid } from "@/components/WorkGrid";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <WorkGrid />
        <Nutshell />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
