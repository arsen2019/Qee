import type { ApiResponse } from "../types/formTypes.ts";
import { postData } from "./utils.ts";
import { getErrorMessage } from "./errorMessage.ts";

export const submitFormData = async <T>(
    endpoint: string,
    data: T
): Promise<ApiResponse> => {
    try {
        const response = await postData(endpoint, JSON.stringify(data));

        return {
            success: true,
            data: response.data,
            statusCode: response.status,
        };
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        const responseData = error?.response?.data ?? {};
        const message = getErrorMessage(status, responseData?.message);
        return {
            success: false,
            statusCode: status,
            message:message,
            errors: responseData.errors || {},
        };
    }
};
