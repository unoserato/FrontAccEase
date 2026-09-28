import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  GraduationCap,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Get In Touch
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Contact &amp; Support
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Have questions about integrating FrontAccEase into your IT curriculum, feedback on Aria Analyzer, or technical inquiries? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <Card className="border-border shadow-xs">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl font-bold">Send A Message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you within 1-2 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-3">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      Message Received
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for contacting FrontAccEase. An academic support coordinator will respond to <strong className="text-foreground">{formData.email}</strong> shortly.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: "", email: "", subject: "", message: "" })
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Rivera"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="e.g. alex.rivera@university.edu"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-subject">Inquiry Subject</Label>
                      <Input
                        id="contact-subject"
                        type="text"
                        required
                        placeholder="e.g. Academic Classroom Pilot / Feedback on Aria Analyzer"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder="Describe your inquiry or how we can assist your coursework..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center gap-2 mt-2"
                    >
                      <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                      <Send className="size-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support & Project Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-base text-foreground">
                Project &amp; Institutional Support
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Direct Inquiries
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      support@frontaccease.com
                    </p>
                    <p className="text-xs text-muted-foreground">
                      General support, feature requests, and bug reports.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <GraduationCap className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Academic Integrations
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      academic@frontaccease.com
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For faculty interested in deploying FrontAccEase in web engineering and HCI courses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Building2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Response Timeline
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Standard academic support hours: Monday – Friday, 9:00 AM – 5:00 PM (PHT/UTC+8).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                <HelpCircle className="size-4" />
                <span>Looking for immediate answers?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check our <a href="/accessibility" className="text-primary font-medium underline">WCAG &amp; POUR Guide</a> or explore our <a href="/features" className="text-primary font-medium underline">Features Page</a> for technical documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
