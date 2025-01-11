export type CommonResponse<T> = {
    readonly code: number;
    readonly desc: string;
    readonly data: T;
}