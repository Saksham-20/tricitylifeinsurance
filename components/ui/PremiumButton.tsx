'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
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
  attentionOnce?: boolean;
  attentionKey?: string;
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
  attentionOnce = false,
  attentionKey = 'primary-cta',
}: PremiumButtonProps) {
  const [showAttention, setShowAttention] = useState(() => {
    if (!attentionOnce || typeof window === 'undefined') {
      return false;
    }

    const storageKey = `cta-attention-${attentionKey}`;
    if (window.sessionStorage.getItem(storageKey)) {
      return false;
    }

    window.sessionStorage.setItem(storageKey, 'shown');
    return true;
  });

  useEffect(() => {
    if (!showAttention) {
      return;
    }

    const timer = window.setTimeout(() => setShowAttention(false), 1800);
    return () => window.clearTimeout(timer);
  }, [showAttention]);

  const baseClasses =
    'group relative inline-flex min-h-12 items-center justify-center rounded-2xl font-headline font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary/35 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-[#1a6fff] text-white shadow-[0_12px_26px_rgba(2,83,205,0.26)] hover:brightness-105',
    secondary: 'border border-primary/25 bg-white text-primary shadow-[0_10px_22px_rgba(15,24,41,0.06)] hover:border-primary/40 hover:bg-primary/[0.06]',
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
      whileHover={{ scale: disabled ? 1 : 1.005 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      animate={showAttention && !disabled ? { scale: [1, 1.015, 1] } : undefined}
      transition={showAttention ? { duration: 0.6, repeat: 2, ease: 'easeInOut' } : { duration: 0.2 }}
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
