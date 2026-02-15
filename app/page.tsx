import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import portfolioData from "@/data.json"
import type { PortfolioData } from "@/types/portfolio"

export default function Home() {
  const data = portfolioData as PortfolioData

  return (
    <main className="min-h-screen relative bg-background overflow-x-hidden">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-card/50 pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <Navbar data={data} />
      {data.hero && <Hero data={data} />}
      {data.about && <About data={data} />}
      {data.experience && data.experience.length > 0 && <Experience data={data} />}
      {data.projects && data.projects.length > 0 && <Projects data={data} />}
      {data.contact && <Contact data={data} />}
      <Footer data={data} />
    </main>
  )
}
