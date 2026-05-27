import HomeHero from "@/components/HomeHero";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return <HomeHero projects={projects} />;
}
