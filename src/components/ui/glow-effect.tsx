import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: 'gold' | 'emerald' | 'primary';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  className,
  color = 'gold',
  intensity = 'medium',
}) => {
  const glowColors = {
    gold: 'hsl(var(--accent-gold))',
    emerald: 'hsl(var(--accent-emerald))',
    primary: 'hsl(var(--primary))',
  };

  const intensities = {
    subtle: { blur: 40, opacity: 0.15 },
    medium: { blur: 60, opacity: 0.25 },
    strong: { blur: 80, opacity: 0.4 },
  };

  const settings = intensities[intensity];

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: glowColors[color],
          filter: `blur(${settings.blur}px)`,
          opacity: settings.opacity,
        }}
        animate={{
          opacity: [settings.opacity * 0.7, settings.opacity, settings.opacity * 0.7],
          scale: [0.95, 1.02, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const FloatingOrbs: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gold/10 blur-3xl"
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-emerald/10 blur-3xl"
        style={{ bottom: '20%', right: '15%' }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gold/5 blur-3xl"
        style={{ top: '50%', left: '50%' }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export const ShimmerBorder: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn('relative p-[1px] rounded-2xl overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent-gold) / 0.5), transparent)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative bg-card rounded-2xl">{children}</div>
    </div>
  );
};
