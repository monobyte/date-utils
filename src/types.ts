export interface DateRange {
    startDate?: Date;
    endDate?: Date;
}

export declare type Complete<T> = {
    [K in keyof T]-?: T[K];
};
