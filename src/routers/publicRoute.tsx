import LoginPage from "@/components/ui/auth-04"
import PublicLayout from "@/layout/PublicLayout"
import AboutPage from "@/pages/public/AboutPage"
import AccessibilityPage from "@/pages/public/AccessibilityPage"
import AccessibilityStatementPage from "@/pages/public/AccessibilityStatementPage"
import ContactPage from "@/pages/public/ContactPage"
import FeaturesPage from "@/pages/public/FeaturesPage"
import HowItWorksPage from "@/pages/public/HowItWorksPage"
import LandingPage from "@/pages/public/LandingPage"
import PrivacyPage from "@/pages/public/PrivacyPage"
import SignUpPage from "@/pages/public/SignUpPage"
import TermsPage from "@/pages/public/TermsPage"
import { Route } from "react-router-dom"

export const publicRoute = (
  <Route element={<PublicLayout />}>
    <Route index element={<LandingPage />} />
    <Route path="features" element={<FeaturesPage />} />
    <Route path="how-it-works" element={<HowItWorksPage />} />
    <Route path="accessibility" element={<AccessibilityPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="privacy" element={<PrivacyPage />} />
    <Route path="terms" element={<TermsPage />} />
    <Route
      path="accessibility-statement"
      element={<AccessibilityStatementPage />}
    />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignUpPage />} />
  </Route>
)
