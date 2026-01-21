"use client"

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { HeroScene } from "@/components/3d/hero-scene"
import type { PortfolioData } from "@/types/portfolio"

interface HeroProps {
  data: PortfolioData
}

export function Hero({ data }: HeroProps) {
  const { personal, hero } = data

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Full 3D Background */}
      <HeroScene />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/40 to-background/80 z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="opacity-0 animate-fade-in-up">
            <p className="text-primary font-mono mb-4 tracking-wider text-shadow-glow">{hero.greeting}</p>
          </div>
          
          <h1 className="opacity-0 animate-fade-in-up animation-delay-100 text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
            <span className="animate-shimmer">{personal.name}</span>
          </h1>
          
          <h2 className="opacity-0 animate-fade-in-up animation-delay-200 text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8">
            {personal.title}
          </h2>
          
          <p className="opacity-0 animate-fade-in-up animation-delay-300 text-muted-foreground max-w-xl text-lg leading-relaxed mb-10 backdrop-blur-sm bg-background/20 p-4 rounded-lg border border-border/30">
            {hero.description}
          </p>
          
          <div className="opacity-0 animate-fade-in-up animation-delay-400 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button asChild size="lg" className="animate-glow-pulse text-lg px-8 py-6">
                <a href={hero.primaryButton.link}>{hero.primaryButton.text}</a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" asChild size="lg" className="border-primary/50 hover:border-primary hover:bg-primary/10 bg-transparent text-lg px-8 py-6">
                <a href={hero.secondaryButton.link}>{hero.secondaryButton.text}</a>
              </Button>
            </MagneticButton>
          </div>

          {/* Social Links */}
          <div className="opacity-0 animate-fade-in-up animation-delay-500 flex items-center gap-8 mt-12">
            {[
              { href: personal.github, icon: Github, label: "GitHub" },
              { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
            ].map((social, index) => (
              <MagneticButton key={social.label} strength={0.4}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className={`text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 stagger-${index + 1} hover:drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]`}
                  aria-label={social.label}
                >
                  <social.icon size={28} />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a 
          href="#about" 
          aria-label="Scroll to about section"
          className="block animate-bounce hover:text-primary transition-colors"
        >
          <ArrowDown className="text-muted-foreground drop-shadow-[0_0_10px_rgba(100,255,218,0.3)]" size={28} />
        </a>
      </div>
    </section>
  )
}
