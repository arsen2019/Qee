export interface FormSubmissionState {
    isLoading: boolean;
    errors: Record<string, string>;
    generalError: string | null;
    isSuccess: boolean;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string>;
    statusCode: number;
}