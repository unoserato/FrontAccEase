import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import SectionHeader from "@/components/public/SectionHeader"
import {
  ShieldCheck,
  Target,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  Users,
  Code2,
} from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      title: "Educational Rigor",
      description:
        "Every lesson, quiz, and metric is strictly aligned with the W3C Web Content Accessibility Guidelines (WCAG 2.1 & 2.2 AA).",
      icon: GraduationCap,
    },
    {
      title: "Practical, Code-First Learning",
      description:
        "We believe developers learn best by auditing real websites, breaking down DOM issues, and applying immediate code refactors.",
      icon: Code2,
    },
    {
      title: "Digital Equity For All",
      description:
        "Accessibility is a fundamental human right. Empowering the next generation of engineers creates a more equitable web for everyone.",
      icon: HeartHandshake,
    },
    {
      title: "Actionable Telemetry",
      description:
        "Replacing guesswork with precise principle mastery analytics, enabling instructors to intervene where students struggle most.",
      icon: Target,
    },
  ]

  const teamMembers = [
    {
      name: "FrontAccEase Research Team",
      role: "Academic Product Initiative",
      description:
        "Focused on bridging human-computer interaction (HCI), web standards pedagogy, and AI-assisted educational tooling for collegiate IT programs.",
    },
    {
      name: "Accessibility & Standards Advisory",
      role: "WCAG Compliance & Curriculum Design",
      description:
        "Ensuring all instructional units adhere to internationally recognized W3C WAI standards and real-world screen reader testing protocols.",
    },
  ]

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* 1. Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Our Mission &amp; Purpose
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Advancing Web Accessibility <br className="hidden sm:inline" />
            <span className="text-primary">In IT Education</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            FrontAccEase is an educational technology initiative built to equip IT students and instructors with practical, standards-compliant web accessibility skills.
          </p>
        </div>
      </section>

      {/* 2. WHAT IS FRONTACCEASE & PURPOSE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <Badge variant="outline" className="text-xs">
                What Is FrontAccEase?
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                A Unified Learning &amp; Assessment Platform
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                FrontAccEase is a web-based educational platform designed specifically for university computer science and information technology programs.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                It combines interactive, principle-based learning modules (Perceivable, Operable, Understandable, Robust), diagnostic assessments, classroom management tools, and an automated audit engine called <strong>Aria Analyzer</strong>.
              </p>
            </div>
            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              <span>Built for higher education curricula &amp; industry readiness</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-10 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <Badge variant="outline" className="text-xs">
                Our Purpose
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Closing The Industry Skill Gap
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While digital accessibility regulations (such as ADA Title III and the European Accessibility Act) are rapidly expanding, most computing curricula do not adequately teach accessibility beyond a brief theoretical mention.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our purpose is to ensure every IT student graduates with the practical capability to design, write, and audit digital interfaces that work for every user, regardless of ability.
              </p>
            </div>
            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-foreground">
              <Lightbulb className="size-4 text-primary" />
              <span>Transforming abstract guidelines into second-nature coding instincts</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES / APPROACH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Our Principles"
          title="Our Pedagogical Approach"
          subtitle="How we structure our tools and curriculum to achieve durable learning outcomes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const VIcon = v.icon
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 space-y-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <VIcon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. THE TEAM & PROJECT INITIATIVE */}
      <section className="bg-muted/30 border-y border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            badge="Project Initiative"
            title="The FrontAccEase Initiative"
            subtitle="Developed as an academic and technological solution to advance digital inclusion in computing education."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center space-y-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Join The Movement Toward An Accessible Web
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
            Whether you are a student learning frontend development or an educator building course materials, FrontAccEase is here to support you.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Contact The Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
