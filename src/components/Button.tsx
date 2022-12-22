import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const buttonStyles = cva(
  "inline-flex justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-indigo-600 border-transparent hover:bg-indigo-700 focus:ring-indigo-600",
        secondary:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-indigo-600",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Button: React.FC<
  ButtonProps & HTMLAttributes<HTMLButtonElement>
> = ({ variant = "primary", fullWidth = false, children, ...props }) => {
  return (
    <button className={buttonStyles({ variant, fullWidth })} {...props}>
      {children}
    </button>
  );
};
