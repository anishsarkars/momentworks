import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  href 
}) => {
  const baseStyles = "rounded-full px-7 py-3 font-medium transition-all duration-300 text-center inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-primary text-white shadow-primary-button hover:opacity-90 active:scale-95",
    secondary: "bg-white text-primary shadow-secondary-button hover:bg-light active:scale-95",
    tertiary: "bg-white text-secondary shadow-pill hover:bg-light active:scale-95"
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component 
      {...props as any}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};
