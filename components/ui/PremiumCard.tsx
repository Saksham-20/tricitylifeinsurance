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
  const baseClasses = `rounded-2xl transition-all duration-200 ${border ? 'border border-primary/10' : ''} shadow-${shadow}`;

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 16px 24px rgba(0, 0, 0, 0.16)' } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}
