// components/form/FormField.tsx
import React from "react";

interface FormFieldProps {
    children: React.ReactElement<{ className?: string }>;
    error?: string;
    label?: string;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                        children,
                                                        error,
                                                        label,
                                                        className = '',
                                                    }) => {
    const childWithError = React.cloneElement(children, {
        className: `${children.props.className} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        }`,
    });

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            {childWithError}
            {error && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};