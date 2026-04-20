import { Hero } from "@/components/hero";
import { HowIWork } from "@/components/how-i-work";
import { HowIThink } from "@/components/how-i-think";
import { HowIBuildSkills } from "@/components/how-i-build-skills";
import { Projects } from "@/components/projects";
import { CvConstellation } from "@/components/cv-constellation";
import { Contact } from "@/components/contact";
import { TopNav } from "@/components/top-nav";

export default function Page() {
  return (
    <main>
      <TopNav />
      <Hero />
      <section
        id="ai-praksis"
        className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-16 pt-16 md:pb-24 md:pt-24"
      >
        <h2 className="display text-balance text-3xl leading-[1.1] md:text-5xl">
          Sådan arbejder jeg med AI
        </h2>

        <div className="relative mt-10 md:mt-14">
          <HowIThink />
          <HowIWork />
          <HowIBuildSkills />
        </div>
      </section>
      <Projects />
      <CvConstellation />
      <Contact />
    </main>
  );
}
