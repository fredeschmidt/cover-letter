import { Hero } from "@/components/hero";
import { HowIWork } from "@/components/how-i-work";
import { HowIThink } from "@/components/how-i-think";
import { Projects } from "@/components/projects";
import { CvConstellation } from "@/components/cv-constellation";
import { Contact } from "@/components/contact";
import { TopNav } from "@/components/top-nav";

export default function Page() {
  return (
    <main>
      <TopNav />
      <Hero />
      <HowIThink />
      <HowIWork />
      <Projects />
      <CvConstellation />
      <Contact />
    </main>
  );
}
