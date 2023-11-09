// src/components/HowItWorks.js

import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const steps = [
  {
    title: 'Create Your Developer Profile',
    description: "Getting started is easy. Web developers can create a comprehensive profile by sharing their skills, experience, and career aspirations. Upload your CV to showcase your work and skills effectively.",
  },
  {
    title: 'Discover Top Talent or Showcase Your Skills',
    description: 'Hiring agents can browse developer profiles based on their specific criteria. Find the perfect match for your projects by filtering skills, experience, and more. Developers, on the other hand, can get discovered by potential employers looking for talent like yours.',
  },
  {
    title: 'Connect and Collaborate',
    description: " Reach out, connect, and collaborate. Send messages, schedule interviews, and discuss project details right here on our platform. It's the perfect place to build valuable connections and grow your career.",
  },
  {
    title: 'Land Your Dream Job or Hire the Ideal Developer',
    description: "It's all about success. Developers can secure their dream job, and hiring agents can find the perfect candidate. Watch your career soar as you collaborate and achieve your goals through our platform.",
  },
  {
    title: 'Grow and Thrive',
    description: "It's not just a platform; it's a pathway to your web development dreams. With DevLink, you can continuously grow and thrive in the world of web development. Your success story begins here.",
  }
];

const HowItWorks = () => {
  return (
    <Container className="py-16">
      <Typography variant="h3" component="h2" className="text-center mb-8">
        How It Works
      </Typography>
      <br></br>
      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center text-2xl">
                  {index + 1}
                </div>
              </div>
              <Typography variant="h6" component="h3" className="mb-2">
                {step.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
