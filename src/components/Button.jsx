import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-church-blue hover:bg-church-blue-dark text-white focus:ring-church-blue",
    secondary:
      "bg-church-red hover:bg-church-red-dark text-white focus:ring-church-red",
    outline:
      "border-2 border-church-blue text-church-blue hover:bg-church-blue hover:text-white focus:ring-church-blue",
    ghost:
      "text-church-blue hover:bg-church-blue hover:bg-opacity-50 focus:ring-church-blue",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
