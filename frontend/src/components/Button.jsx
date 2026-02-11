import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({ className, variant = "primary", size = "md", ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-brand text-white hover:bg-brand/90 shadow-sm shadow-brand/20",
        secondary: "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
        outline: "bg-transparent border-2 border-brand text-brand hover:bg-brand/5",
        ghost: "bg-transparent hover:bg-gray-100 text-slate-600",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            {...props}
        />
    );
}
