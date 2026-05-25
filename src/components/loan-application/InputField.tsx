import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full ${
            icon ? "pl-11" : "px-4"
          } py-3.5 bg-gray-50 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400 ${
            error
              ? "border-error bg-error/5"
              : "border-transparent focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-error text-xs font-semibold mt-1.5 ml-1">{error}</p>}
    </div>
  );
};

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  icon,
  className = "",
  id,
  children,
  ...props
}) => {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <select
          id={id}
          className={`w-full ${
            icon ? "pl-11" : "px-4"
          } pr-10 py-3.5 bg-gray-50 border-2 rounded-xl transition-all outline-none text-gray-900 font-medium appearance-none ${
            error
              ? "border-error bg-error/5"
              : "border-transparent focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5"
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-error text-xs font-semibold mt-1.5 ml-1">{error}</p>}
    </div>
  );
};
