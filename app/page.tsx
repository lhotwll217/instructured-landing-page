import Header from "@/components/header"
import Hero from "@/components/hero"
import BenefitsBento from "@/components/benefits-bento"
import FeaturesBento from "@/components/features-bento"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import HowItWorks from "@/components/how-it-works"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <div className="dark">
      <Header />
      <Hero />
      <BenefitsBento />
      <FeaturesBento />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
