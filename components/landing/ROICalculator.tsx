'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { formatCurrency } from '@/lib/utils';

export default function ROICalculator() {
  // Input states with new ranges
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerProject, setHoursPerProject] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [projectsPerYear, setProjectsPerYear] = useState(12);
  
  // Calculated values
  const [timePerProject, setTimePerProject] = useState(0);
  const [moneyPerProject, setMoneyPerProject] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [fiveYearSavings, setFiveYearSavings] = useState(0);
  const [roi, setRoi] = useState(0);
  
  // Constants
  const AUTOMATION_EFFICIENCY = 0.8; // 80% time saved with automation
  const ANNUAL_COST_PER_USER = 28; // $28 per user per year
  
  // Calculate ROI whenever inputs change
  useEffect(() => {
    // Time saved per project per person (in hours)
    const timeSavedPerPersonPerProject = hoursPerProject * AUTOMATION_EFFICIENCY;
    
    // Time saved per project for the whole team (in hours)
    const timeSavedPerProject = timeSavedPerPersonPerProject * teamSize;
    setTimePerProject(timeSavedPerProject);
    
    // Money saved per project
    const moneySavedPerProject = timeSavedPerProject * hourlyRate;
    setMoneyPerProject(moneySavedPerProject);
    
    // Annual savings
    const yearlySavings = moneySavedPerProject * projectsPerYear;
    setAnnualSavings(yearlySavings);
    
    // 5-year savings
    const fiveYearTotal = yearlySavings * 5;
    setFiveYearSavings(fiveYearTotal);
    
    // ROI calculation (5-year return on investment)
    const fiveYearCost = teamSize * ANNUAL_COST_PER_USER * 5;
    const calculatedRoi = fiveYearCost > 0 ? ((fiveYearTotal / fiveYearCost) * 100) : 0;
    setRoi(calculatedRoi);
  }, [teamSize, hoursPerProject, hourlyRate, projectsPerYear]);
  
  const inputRanges = [
    {
      label: "Team Size",
      min: 2,
      max: 30,
      step: 1,
      value: teamSize,
      onChange: setTeamSize,
      format: (value: number) => `${value} users`,
      minLabel: "2",
      maxLabel: "30"
    },
    {
      label: "Hours Per Project",
      min: 2,
      max: 20,
      step: 1,
      value: hoursPerProject,
      onChange: setHoursPerProject,
      format: (value: number) => `${value} hrs`,
      minLabel: "2",
      maxLabel: "20"
    },
    {
      label: "Hourly Rate",
      min: 15,
      max: 30,
      step: 1,
      value: hourlyRate,
      onChange: setHourlyRate,
      format: (value: number) => `$${value}`,
      minLabel: "$15",
      maxLabel: "$30"
    },
    {
      label: "Projects/Year",
      min: 1,
      max: 50,
      step: 1,
      value: projectsPerYear,
      onChange: setProjectsPerYear,
      format: (value: number) => `${value}`,
      minLabel: "1",
      maxLabel: "50"
    }
  ];
  
  return (
    <section className="py-12 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <SectionHeading
          title="Calculate your Team's savings"
          description="See how much time and money your team can save with Create Walls"
          className="mb-8"
        />
        
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="grid md:grid-cols-2">
            <motion.div 
              className="p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Input Your Team Details</h3>
              
              <div className="space-y-4">
                {inputRanges.map((input, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        {input.label}
                      </label>
                      <span className="text-sm font-bold">{input.format(input.value)}</span>
                    </div>
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => input.onChange(Number(e.target.value))}
                      className="w-full h-2 bg-primary-400 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
                
                <div className="bg-primary-700/50 backdrop-blur-sm p-3 rounded-lg mt-2 text-sm">
                  <p className="opacity-90 mb-1">
                    Our plugin reduces wall creation time by <span className="font-bold">80%</span>
                  </p>
                  <p className="opacity-90 text-xs">
                    Formula: Hours × Team × Rate × 80% × Projects
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Your Savings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">Time Saved Per Project</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-primary-700">{timePerProject.toFixed(0)}</span>
                    <span className="ml-1 text-neutral-600 text-sm">hours</span>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">Money Per Project</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-accent-600">{formatCurrency(moneyPerProject)}</span>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">Annual Savings</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-primary-700">{formatCurrency(annualSavings)}</span>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">5-Year Savings</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-accent-700">{formatCurrency(fiveYearSavings)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                    <p className="text-sm font-medium text-neutral-700">
                      Return on Investment
                    </p>
                  </div>
                  <p className="text-lg font-bold text-accent-700">{roi.toFixed(0)}%</p>
                </div>
                <p className="text-xs text-neutral-500 mt-1 ml-5">
                  Based on license cost of $28 per user per year
                </p>
              </div>
              
              <div className="mt-4">
                <Button className="w-full">
                  Get Enterprise Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto mt-6 grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              title: "Time Reduction",
              description: "Our plugin reduces wall creation time by 80%, allowing your team to focus on design rather than repetitive tasks."
            },
            {
              title: "Error Reduction",
              description: "Automated wall creation reduces human error, minimizing costly rework and revisions during the design process."
            },
            {
              title: "Scalability",
              description: "As your team and project load grows, the savings multiply, making this a smart long-term investment."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-neutral-200">
              <h4 className="font-semibold text-primary-700 text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-neutral-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}