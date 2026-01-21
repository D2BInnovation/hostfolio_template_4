"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { TiltCard } from "@/components/ui/tilt-card"
import { ExperienceTimeline3D } from "@/components/3d/experience-timeline-3d"
import type { PortfolioData } from "@/types/portfolio"

interface ExperienceProps {
  data: PortfolioData
}

export function Experience({ data }: ExperienceProps) {
  const { experience } = data

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* 3D Background */}
      <ExperienceTimeline3D experienceCount={experience.length} />
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-card/50 backdrop-blur-sm" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4 tracking-wide uppercase">
              Experience
            </p>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Where I've worked
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experience.map((job, index) => (
            <AnimatedSection key={job.id} delay={index * 150} direction="up">
              <TiltCard maxTilt={5} glareEnabled>
                <div className="group relative p-8 rounded-2xl bg-card/70 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500">
                  {/* Glowing accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                        <span>{job.position}</span>
                        <span className="text-primary">@</span>
                        <span className="text-primary">{job.company}</span>
                        <ArrowUpRight
                          size={18}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {job.location}
                      </p>
                    </div>
                    <div className="text-primary font-mono text-sm px-4 py-2 rounded-full bg-primary/10 border border-primary/30 whitespace-nowrap">
                      {job.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {job.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-3 mb-6">
                    {job.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className="text-muted-foreground flex items-start gap-3 group/item"
                      >
                        <span className="text-primary mt-1 transition-transform group-hover/item:scale-125 group-hover/item:rotate-90">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z"/>
                          </svg>
                        </span>
                        <span className="group-hover/item:text-foreground transition-colors">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
