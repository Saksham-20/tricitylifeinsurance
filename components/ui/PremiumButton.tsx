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
    'relative inline-flex items-center justify-center font-headline font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-[#1a6fff] text-white shadow-[0_6px_24px_rgba(2,83,205,0.35)] hover:shadow-[0_8px_36px_rgba(2,83,205,0.5)] hover:brightness-105',
    secondary: 'bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/30',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-10 py-4.5 text-base md:text-lg gap-2.5 font-bold',
    lg: 'px-14 py-6 text-lg md:text-xl gap-3 font-bold',
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
