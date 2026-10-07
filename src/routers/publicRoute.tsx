import AuthLayout from "@/layout/AuthLayout"
import PublicLayout from "@/layout/PublicLayout"
import { lazy } from "react"
import { Route } from "react-router-dom"

const LoginPage = lazy(() => import("@/components/ui/auth-04"))
const AboutPage = lazy(() => import("@/pages/public/AboutPage"))
const AccessibilityPage = lazy(
  () => import("@/pages/public/AccessibilityPage")
)
const AccessibilityStatementPage = lazy(
  () => import("@/pages/public/AccessibilityStatementPage")
)
const ContactPage = lazy(() => import("@/pages/public/ContactPage"))
const FeaturesPage = lazy(() => import("@/pages/public/FeaturesPage"))
const HowItWorksPage = lazy(() => import("@/pages/public/HowItWorksPage"))
const LandingPage = lazy(() => import("@/pages/public/LandingPage"))
const PricingPage = lazy(() => import("@/pages/public/PricingPage"))
const PrivacyPage = lazy(() => import("@/pages/public/PrivacyPage"))
const SignUpPage = lazy(() => import("@/pages/public/SignUpPage"))
const TermsPage = lazy(() => import("@/pages/public/TermsPage"))

export const publicRoute = (
  <>
    <Route element={<PublicLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="how-it-works" element={<HowItWorksPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="accessibility" element={<AccessibilityPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route
        path="accessibility-statement"
        element={<AccessibilityStatementPage />}
      />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </Route>
  </>
)
