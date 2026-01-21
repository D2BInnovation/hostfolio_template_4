import type { PortfolioData } from "@/types/portfolio"

interface FooterProps {
  data: PortfolioData
}

export function Footer({ data }: FooterProps) {
  const { personal } = data
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm font-mono">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
