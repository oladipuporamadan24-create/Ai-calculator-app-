import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'action' | 'scientific';
  className?: string;
  doubleWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'default', className, doubleWidth = false }) => {
  const baseStyles = "h-14 rounded-xl text-xl font-medium transition-all active:scale-95 flex items-center justify-center select-none shadow-sm";
  
  const variants = {
    default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700",
    operator: "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600",
    action: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30",
    scientific: "bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-800"
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles, 
        variants[variant], 
        doubleWidth ? "col-span-2 w-full" : "w-full",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
