export interface IResponse<T> {
    success: boolean;
    errorMsg: string;
    successMsg: string;
    errors?: string[];
    response?: T | undefined;
    data?: T | undefined;
}