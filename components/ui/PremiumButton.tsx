'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface PremiumButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  showArrow?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function PremiumButton({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  showArrow = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: PremiumButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center justify-center rounded-2xl font-headline font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-[#1a6fff] text-white shadow-[0_14px_30px_rgba(2,83,205,0.32)] hover:shadow-[0_18px_42px_rgba(2,83,205,0.42)] hover:brightness-105',
    secondary: 'border border-primary/20 bg-primary/[0.05] text-primary hover:border-primary/30 hover:bg-primary/[0.1]',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'gap-2.5 px-8 py-4 text-base font-bold md:text-lg',
    lg: 'gap-3 px-10 py-[1.125rem] text-lg font-bold md:px-14 md:py-5 md:text-xl',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      initial={{ scale: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </>
      )}
    </motion.button>
  );
}
