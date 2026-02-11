import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Input({ className, label, error, ...props }) {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
            <input
                className={twMerge(
                    clsx(
                        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand",
                        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                        error && "border-red-500 focus:ring-red-200 focus:border-red-500",
                        className
                    )
                )}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {error}
            </p>}
        </div>
    );
}
