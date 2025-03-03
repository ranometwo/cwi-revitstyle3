'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const pricingPlans = [
  {
    name: "Student",
    description: "For students and educational use",
    price: "Free",
    period: "for 1 year",
    buttonText: "Get Started",
    buttonVariant: "secondary" as const,
    features: [
      "Single user license",
      "Basic support",
      "Compatible with Revit 2020-2025",
      "Basic wall creation tools",
      "Community forum access"
    ],
    highlighted: false
  },
  {
    name: "Monthly",
    description: "For individual architects and small teams",
    price: "$4",
    period: "/month per user",
    buttonText: "Start Free Trial",
    buttonVariant: "primary" as const,
    features: [
      "Single user license",
      "Standard support",
      "Compatible with Revit 2020-2025",
      "Advanced wall creation features",
      "Email support",
      "Regular updates",
      "Project templates"
    ],
    highlighted: true
  },
  {
    name: "Annual",
    description: "Best value for professionals",
    price: "$28",
    period: "/year per user",
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    features: [
      "Single user license",
      "Priority support",
      "Compatible with Revit 2020-2025",
      "Advanced wall creation features",
      "Email support",
      "Regular updates",
      "Project templates",
      "Save $20 compared to monthly"
    ],
    highlighted: false
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <Container>
        <SectionHeading
          title="Pricing Plans"
          description="Flexible options for architects and BIM professionals"
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white rounded-xl ${
                plan.highlighted 
                  ? 'border-2 border-primary-500 shadow-xl transform md:scale-105 z-10' 
                  : 'border border-neutral-200 shadow-card'
              } overflow-hidden transition-all duration-300 hover:shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {plan.highlighted && (
                <div className="bg-primary-500 text-white text-center py-2 text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 border-b border-neutral-100">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-primary-700">{plan.price}</span>
                  <span className="text-neutral-500 ml-2">{plan.period}</span>
                </div>
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-accent-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-neutral-600 mb-4">
            All paid plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-neutral-600">
            Need a custom enterprise solution? <a href="#" className="text-primary-600 font-medium hover:underline transition-colors">Contact our sales team</a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}