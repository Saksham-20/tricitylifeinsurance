'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  hover?: boolean;
  border?: boolean;
  shadow?: 'elevation-1' | 'elevation-2' | 'elevation-3' | 'elevation-4';
  className?: string;
  onClick?: () => void;
}

export default function PremiumCard({
  children,
  hover = true,
  border = true,
  shadow = 'elevation-2',
  className = '',
  onClick,
}: PremiumCardProps) {
  const shadowClasses = {
    'elevation-1': 'shadow-elevation-1',
    'elevation-2': 'shadow-elevation-2',
    'elevation-3': 'shadow-elevation-3',
    'elevation-4': 'shadow-elevation-4',
  };

  const baseClasses = `rounded-2xl transition-all duration-200 ${border ? 'border border-primary/10' : ''} ${shadowClasses[shadow]}`;

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={hover ? { scale: 1.01, boxShadow: '0 12px 22px rgba(15, 24, 41, 0.12)' } : { scale: 1 }}
      whileTap={hover ? { scale: 0.995 } : { scale: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}
