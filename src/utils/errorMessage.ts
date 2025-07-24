export const getErrorMessage = (statusCode: number, defaultMessage?: string): string => {
    const errorMessages: Record<number, string> = {
        400: 'Please check your input and try again.',
        401: 'Authentication required.',
        403: 'This email or phone is already registered',
        404: 'The requested resource was not found.',
        406: 'Date is busy',
        409: 'This information conflicts with existing data.',
        422: 'Please correct the highlighted fields.',
        429: 'Too many requests. Please try again later.',
        500: 'Server error. Please try again later.',
        502: 'Service temporarily unavailable.',
        503: 'Service temporarily unavailable.',
    };

    return errorMessages[statusCode] || defaultMessage || 'An unexpected error occurred.';
};