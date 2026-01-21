"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, Folder } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { AnimatedSection } from "@/components/ui/animated-section"
import type { PortfolioData } from "@/types/portfolio"

interface ProjectsProps {
  data: PortfolioData
}

export function Projects({ data }: ProjectsProps) {
  const { projects } = data
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-6 relative">
        <AnimatedSection>
          <h2 className="text-sm text-primary font-mono mb-4 tracking-wide uppercase">
            Projects
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-12 gradient-text">
            Some things I've built
          </h3>
        </AnimatedSection>

        {/* Featured Projects */}
        <div className="space-y-32 mb-24">
          {featuredProjects.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              direction={index % 2 === 0 ? "right" : "left"}
              delay={index * 100}
            >
              <div
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:text-right" : ""
                }`}
              >
                {/* Project Image / Placeholder */}
                <TiltCard
                  className={`group ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  maxTilt={10}
                >
                  <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden border border-border/50">
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Folder size={64} className="text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-[-2px] rounded-lg animate-gradient-border p-[2px]">
                        <div className="w-full h-full bg-secondary rounded-lg" />
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* Project Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-primary font-mono text-sm mb-2 tracking-wider">
                    Featured Project
                  </p>
                  <h4 className="text-2xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <Card className="bg-card/80 backdrop-blur mb-4 border-border/50 hover:border-primary/30 transition-colors hover-lift">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed text-left">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                  <div
                    className={`flex flex-wrap gap-3 mb-6 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-muted-foreground text-sm font-mono hover:text-primary transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`flex items-center gap-5 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                      aria-label="View GitHub repository"
                    >
                      <Github size={22} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <AnimatedSection delay={200}>
            <h4 className="text-xl font-semibold text-foreground text-center mb-8">
              Other Noteworthy Projects
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 100}>
                  <TiltCard className="h-full group" maxTilt={8}>
                    <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Folder size={32} className="text-primary" />
                          </div>
                          <div className="flex items-center gap-4">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                              aria-label="View GitHub repository"
                            >
                              <Github size={20} />
                            </a>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                              aria-label="View live demo"
                            >
                              <ExternalLink size={20} />
                            </a>
                          </div>
                        </div>
                        <h5 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                          {project.title}
                        </h5>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
