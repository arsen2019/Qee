import React from 'react';

interface LoadingButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    loadingText?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
                                                                isLoading,
                                                                children,
                                                                type = 'button',
                                                                onClick,
                                                                disabled = false,
                                                                className = '',
                                                                loadingText = 'Please wait...',
                                                            }) => {
    const baseClasses = `
    relative inline-flex items-center justify-center
    transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${className}`}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {isLoading ? loadingText : children}
        </button>
    );
};