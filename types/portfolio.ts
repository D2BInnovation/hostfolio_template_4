export interface Personal {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  bio: string
}

export interface HeroButton {
  text: string
  link: string
}

export interface Hero {
  greeting: string
  description: string
  primaryButton: HeroButton
  secondaryButton: HeroButton
}

export interface About {
  description: string[]
  skills: string[]
}

export interface Experience {
  id: number
  company: string
  position: string
  duration: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  image: string
  featured: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Contact {
  title: string
  description: string
  socialLinks: SocialLink[]
}

export interface PortfolioData {
  personal: Personal
  hero: Hero
  about: About
  experience: Experience[]
  projects: Project[]
  contact: Contact
}
