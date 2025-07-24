import { useState } from 'react';
import { submitFormData } from '../utils/formSubmissionUtils';
import type {FormSubmissionState} from "../types/formTypes.ts";
import {getErrorMessage} from "../utils/errorMessage.ts";

export const useFormSubmission = () => {
    const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
        isLoading: false,
        errors: {},
        generalError: null,
        isSuccess: false,
    });

    const submitForm = async <T>(
        endpoint: string,
        data: T,
    ): Promise<boolean> => {
        setSubmissionState({
            isLoading: true,
            errors: {},
            generalError: null,
            isSuccess: false,
        });

        try {
            const response = await submitFormData(endpoint, data);

            if (response.success) {
                setSubmissionState({
                    isLoading: false,
                    errors: {},
                    generalError: null,
                    isSuccess: true,
                });
                return true;
            } else {
                setSubmissionState({
                    isLoading: false,
                    errors: response.errors || {},
                    generalError: response.message || 'Submission failed',
                    isSuccess: false,
                });
                return false;
            }
        } catch (error:any) {
            setSubmissionState({
                isLoading: false,
                errors: {},
                generalError: `Network error. Please try again`,
                isSuccess: false,
            });
            return false;
        }
    };

    const clearErrors = () => {
        setSubmissionState(prev => ({
            ...prev,
            errors: {},
            generalError: null,
        }));
    };

    const clearFieldError = (fieldName: string) => {
        setSubmissionState(prev => ({
            ...prev,
            errors: {
                ...prev.errors,
                [fieldName]: '',
            },
        }));
    };

    return {
        ...submissionState,
        submitForm,
        clearErrors,
        clearFieldError,
    };
};
