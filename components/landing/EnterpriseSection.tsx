'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const features = [
  {
    title: "Team Deployment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    description: "Centralized deployment across your entire organization with admin controls and usage analytics."
  },
  {
    title: "Custom Integration",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    description: "Integrate with your existing BIM workflows, standards, and custom Revit templates."
  },
  {
    title: "Priority Support",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    description: "Dedicated account manager and technical support with 4-hour response time guarantee."
  },
  {
    title: "Training & Onboarding",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    description: "Comprehensive training sessions for your team and custom documentation for your workflows."
  },
  {
    title: "Volume Licensing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    description: "Flexible licensing options with significant discounts for enterprise-wide deployment."
  },
  {
    title: "Custom Development",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    description: "Custom feature development to meet your specific requirements and workflow needs."
  }
];

export default function EnterpriseSection() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Enterprise Solutions"
          description="Tailored for large architecture and engineering firms with complex BIM workflows"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center shadow-soft"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Enterprise Case Study: AECOM</h3>
          <p className="mb-6">
            AECOM implemented CreateWalls across their global BIM teams, resulting in a 40% reduction in modeling time and standardized wall creation processes across 22 offices.
          </p>
          <Button 
            className="bg-white text-primary-700 hover:bg-neutral-100"
          >
            Read Full Case Study
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}