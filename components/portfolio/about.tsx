"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Skills3D } from "@/components/3d/skills-sphere"
import type { PortfolioData } from "@/types/portfolio"

interface AboutProps {
  data: PortfolioData
}

export function About({ data }: AboutProps) {
  const { about, personal } = data

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4 tracking-wide uppercase">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              A bit about me
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - 3D Skills Sphere */}
          <AnimatedSection direction="right" delay={100}>
            <div className="relative">
              <Skills3D skills={about.skills} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent to-background/50" />
            </div>
          </AnimatedSection>

          {/* Right Column - Text */}
          <AnimatedSection direction="left" delay={200}>
            <div className="space-y-6">
              {about.description.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 p-6 rounded-xl glass border border-primary/20">
                <p className="text-foreground text-lg">
                  <span className="text-muted-foreground">Based in </span>
                  <strong className="text-primary">{personal.location}</strong>
                </p>
              </div>

              {/* Skills badges as secondary display */}
              <div className="pt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {about.skills.slice(0, 8).map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-sm bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default opacity-0 animate-fade-in-up border border-primary/20"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
