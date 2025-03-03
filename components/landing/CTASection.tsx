'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { formatNumber } from '@/lib/utils';

const stats = [
  { label: "Hours Saved", value: "250,000+" },
  { label: "Enterprise Clients", value: "50+" },
  { label: "User Satisfaction", value: "98%" },
  { label: "ROI Average", value: "820%" }
];

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <Container>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Ready to Transform Your BIM Workflow?"
            description="Join the leading architecture and engineering firms already saving thousands of hours with CreateWalls."
            titleClassName="text-white"
            descriptionClassName="text-white opacity-90"
          />
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-white text-primary-700 hover:bg-neutral-100 font-bold py-3 px-8 rounded-md shadow-lg transition-colors"
              >
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-md transition-colors"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}