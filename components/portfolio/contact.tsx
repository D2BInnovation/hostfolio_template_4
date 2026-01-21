"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, MapPin, Send, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ContactScene } from "@/components/3d/contact-scene"
import type { PortfolioData } from "@/types/portfolio"

interface ContactProps {
  data: PortfolioData
}

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

export function Contact({ data }: ContactProps) {
  const { contact, personal } = data

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* 3D Background */}
      <ContactScene />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-background/60 via-background/80 to-background z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-primary font-mono mb-6 tracking-wide uppercase px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Sparkles size={16} />
              <span>Contact</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="gradient-text">{contact.title}</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-muted-foreground leading-relaxed mb-12 text-lg md:text-xl max-w-lg mx-auto">
              {contact.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <MagneticButton>
              <Button asChild size="lg" className="group animate-glow-pulse px-10 py-7 text-lg rounded-full">
                <a href={`mailto:${personal.email}`} className="flex items-center gap-3">
                  <span>Say Hello</span>
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
            </MagneticButton>
          </AnimatedSection>

          {/* Contact Details */}
          <AnimatedSection delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-10">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group glass px-6 py-3 rounded-full hover:border-primary/50 border border-transparent"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">{personal.email}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground glass px-6 py-3 rounded-full">
                <MapPin size={18} />
                <span className="font-mono text-sm">{personal.location}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection delay={500}>
            <div className="flex items-center justify-center gap-6">
              {contact.socialLinks.map((link, index) => {
                const Icon = iconMap[link.icon] || Mail
                return (
                  <MagneticButton key={link.platform} strength={0.5}>
                    <a
                      href={link.url}
                      target={link.icon === "email" ? undefined : "_blank"}
                      rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                      className={`text-muted-foreground hover:text-primary transition-all duration-300 p-4 rounded-full glass hover:border-primary/50 border border-transparent hover:scale-110 stagger-${index + 1}`}
                      aria-label={link.platform}
                    >
                      <Icon size={24} />
                    </a>
                  </MagneticButton>
                )
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
