// Client-side email service using EmailJS
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Users need to set these up at emailjs.com
const EMAIL_CONFIG = {
  serviceId: 'service_equitix',
  templateId: 'template_equitix',
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with actual key
};

interface EmailParams {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}

// Simulated email sending (works without configuration)
export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  // For demo purposes, simulate email sending
  // In production, configure EmailJS with real credentials
  console.log('Email would be sent:', params);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store in localStorage for demo purposes
  const sentEmails = JSON.parse(localStorage.getItem('equitix-sent-emails') || '[]');
  sentEmails.push({
    ...params,
    sentAt: new Date().toISOString(),
    id: `email-${Date.now()}`,
  });
  localStorage.setItem('equitix-sent-emails', JSON.stringify(sentEmails));
  
  return true;
};

export const sendEnrollmentEmail = async (email: string, className: string, instructorName: string): Promise<boolean> => {
  return sendEmail({
    to_email: email,
    to_name: email.split('@')[0],
    subject: `Enrollment Confirmed: ${className}`,
    message: `
      Thank you for enrolling in "${className}" with ${instructorName}!
      
      You will receive access to the masterclass materials shortly.
      
      Happy learning!
      The Equitix Team
    `,
  });
};

export const sendContactEmail = async (name: string, email: string, message: string): Promise<boolean> => {
  return sendEmail({
    to_email: email,
    to_name: name,
    subject: 'Thank you for contacting Equitix',
    message: `
      Dear ${name},
      
      We've received your message and will get back to you within 24-48 hours.
      
      Your message:
      "${message}"
      
      Best regards,
      The Equitix Team
    `,
  });
};

export const sendWelcomeEmail = async (name: string, email: string): Promise<boolean> => {
  return sendEmail({
    to_email: email,
    to_name: name,
    subject: 'Welcome to Equitix!',
    message: `
      Welcome to Equitix, ${name}!
      
      You're now part of India's growing community of smart investors.
      
      Here's what you can do:
      • Explore our Learning Center
      • Join Masterclasses from experts
      • Track stocks and build your portfolio
      • Connect with the community
      
      Happy investing!
      The Equitix Team
    `,
  });
};
