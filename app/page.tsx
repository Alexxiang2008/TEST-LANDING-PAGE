'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Factory, Lightbulb, Shield, Award, CheckCircle2, Gift, Mail, Phone, MessageCircle, Sparkles, Zap, TrendingUp } from 'lucide-react'

// Animated stat counter component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

// Parallax section component
function ParallaxSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

// Fade in when in view component
function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section with Apple-style animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

          {/* Floating orbs with mouse parallax */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
              scale: [1, 1.2, 1],
            }}
            transition={{
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 0.3 },
              y: { duration: 0.3 }
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            animate={{
              x: -mousePosition.x * 0.02,
              y: -mousePosition.y * 0.02,
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
              x: { duration: 0.3 },
              y: { duration: 0.3 }
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Trusted by Global Brands Since 2012</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-white block">Professional Industrial</span>
              <span className="gradient-text block mt-2">Vacuum Solutions</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              12+ Years Excellence in Custom OEM/ODM Manufacturing
              <span className="block mt-2 text-blue-400 font-semibold">For Brands with $5M+ Annual Purchasing Power</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button variant="premium" size="xl" className="group">
                <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Get Free Sample Kit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Factory className="w-5 h-5" />
                View Solutions
              </Button>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { label: "Years Experience", value: 12, suffix: "+" },
                { label: "Production Lines", value: 8, suffix: "" },
                { label: "Global Certifications", value: 6, suffix: "+" },
                { label: "Quality Rate", value: 100, suffix: "%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section with stagger animations */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Our Services
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Why Global Brands Choose <span className="gradient-text">LiyyouVac</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized in high-performance industrial vacuum solutions for Belt & Road countries
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "OEM Solutions",
                description: "Complete manufacturing of industrial vacuums under your brand name with full customization options",
                features: ["Custom branding & packaging", "Tailored specifications", "Market-specific compliance"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Lightbulb,
                title: "ODM Design",
                description: "Original design manufacturing with our R&D team to create unique industrial vacuum solutions",
                features: ["Innovative product design", "Engineering expertise", "Rapid prototyping"],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: TrendingUp,
                title: "Custom Solutions",
                description: "End-to-end customized industrial cleaning solutions for your specific industry needs",
                features: ["Industry-specific design", "Performance optimization", "Full technical support"],
                color: "from-orange-500 to-red-500"
              },
            ].map((service, index) => (
              <FadeInWhenVisible key={service.title} delay={index * 0.2}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 group-hover:border-blue-200">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:gradient-text transition-all duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3 text-gray-700"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      className="mt-6 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section with parallax */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <ParallaxSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  <Shield className="inline-block w-12 h-12 text-blue-600 mb-2" />
                  <br />
                  International Certifications
                </h2>
                <p className="text-xl text-gray-600">Meeting the highest global standards for quality and safety</p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "CE", region: "European Union", emoji: "🇪🇺", color: "from-blue-500 to-blue-600" },
                { name: "CB", region: "International", emoji: "✓", color: "from-green-500 to-green-600" },
                { name: "UL", region: "United States", emoji: "🇺🇸", color: "from-red-500 to-red-600" },
                { name: "RoHS", region: "Environmental", emoji: "♻️", color: "from-purple-500 to-purple-600" },
                { name: "REACH", region: "EU Chemical", emoji: "🌍", color: "from-yellow-500 to-yellow-600" },
                { name: "Energy Star", region: "Energy Efficient", emoji: "⭐", color: "from-cyan-500 to-cyan-600" },
              ].map((cert, index) => (
                <FadeInWhenVisible key={cert.name} delay={index * 0.1}>
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.1, y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`} />

                    <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-transparent">
                      <div className="text-5xl mb-3">{cert.emoji}</div>
                      <div className="font-bold text-gray-900 text-lg mb-1">{cert.name}</div>
                      <div className="text-xs text-gray-600">{cert.region}</div>
                    </div>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Manufacturing Excellence with image reveal */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInWhenVisible>
              <div>
                <motion.span
                  className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  ISO 9001 Certified
                </motion.span>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  World-Class Manufacturing Excellence
                </h2>

                <p className="text-xl text-gray-300 mb-10">
                  8 specialized production lines with ISO 9001 certified quality management system
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Shield, title: "Raw Material Inspection", desc: "Rigorous testing of all incoming materials" },
                    { icon: Factory, title: "Precision Manufacturing", desc: "Advanced production with strict quality control" },
                    { icon: CheckCircle2, title: "Multi-Stage Testing", desc: "Performance testing at multiple stages" },
                    { icon: Award, title: "100% Final Inspection", desc: "Every unit tested before shipping" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Factory className="w-32 h-32 text-white/20" />
                  </div>

                  <motion.div
                    className="absolute -bottom-10 -left-10 bg-blue-600 rounded-3xl p-8 shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                  >
                    <div className="text-5xl font-bold mb-2">ISO 9001</div>
                    <div className="text-blue-200">Quality Management</div>
                  </motion.div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* CTA Section with magnetic button effect */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center">
              <motion.div
                className="inline-block mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Gift className="w-16 h-16 text-yellow-300" />
              </motion.div>

              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-300 text-sm font-semibold mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="inline w-4 h-4 mr-2" />
                LIMITED TIME OFFER
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Get Your FREE Sample Kit Today
              </h2>

              <p className="text-xl text-blue-100 mb-4">
                Experience our quality firsthand - complimentary sample kit for qualified buyers
              </p>

              <p className="text-lg text-blue-200 mb-12">
                <Sparkles className="inline w-5 h-5 mr-2" />
                Plus: Free consultation on custom solutions for your brand
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Button variant="premium" size="xl" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12 py-8">
                  <Gift className="w-6 h-6" />
                  Claim My FREE Sample Kit Now
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </motion.div>

              {/* Contact methods */}
              <motion.div
                className="grid md:grid-cols-3 gap-6 mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { icon: Mail, label: "Email Us", value: "sales@liyyouvac.com", href: "mailto:sales@liyyouvac.com" },
                  { icon: Phone, label: "Call Us", value: "+86 123 4567 8900", href: "tel:+8612345678900" },
                  { icon: MessageCircle, label: "WhatsApp", value: "Chat Now", href: "https://wa.me/8612345678900" },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    className="glass rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <contact.icon className="w-10 h-10 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-semibold text-white mb-1">{contact.label}</div>
                    <div className="text-blue-200 text-sm">{contact.value}</div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-blue-500/50"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Gift className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </div>
  )
}
