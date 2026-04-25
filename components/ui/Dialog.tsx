import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-white/95 backdrop-blur-md"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

interface DialogContentProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const DialogContent: React.FC<DialogContentProps> = ({ className, children, onClose }) => {
  return (
    <div
      className={cn(
        "relative bg-white dark:bg-background rounded-xl border shadow-2xl p-6 w-full max-w-lg mx-4",
        className
      )}
      style={{ maxHeight: '90vh', overflowY: 'auto' }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className, children }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
};

interface DialogTitleProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ className, children }) => {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h2>
  );
};

interface DialogDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ className, children }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

interface DialogFooterProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogFooter: React.FC<DialogFooterProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
