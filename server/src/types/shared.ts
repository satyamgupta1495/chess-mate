export interface IResponse<T> {
    success: boolean;
    errorMsg: string;
    successMsg: string;
    errors?: string[];
    response?: T | undefined;
    data?: T | undefined;
}

export type ServiceResponse<T> = {
    errorMessage: string;
    internalError: boolean;
    response: { result?: T, count?: number, total?: number, metadata?: Object };
    success: boolean;
    error: string;
}