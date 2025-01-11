import { config as loadConfig } from 'dotenv';

loadConfig();

export interface IEnvConfig {
    rapidAPIBaseURL: string;
    rapidAPIToken: string;
    rapidAPIMaxRetry: number;
    rapidAPICallIntervalInSeconds: number;
    apiKey: string;
    discountPercentage: number;
    applyDiscountNumOfDays: number;
}

export const EnvConfig: IEnvConfig = {
    rapidAPIBaseURL: process.env.RAPID_API_BASE_URL,
    rapidAPIToken: process.env.RAPID_API_KEY,
    rapidAPIMaxRetry: process.env.RAPID_API_MAX_RETRY ? Number(process.env.RAPID_API_MAX_RETRY) : 5,
    rapidAPICallIntervalInSeconds: process.env.RAPID_API_CALL_INTERVAL_IN_SECONDS ? Number(process.env.RAPID_API_CALL_INTERVAL_IN_SECONDS) : 5,
    apiKey: process.env.API_KEY,
    discountPercentage: process.env.DISCOUNT_PERCENTAGE ? Number(process.env.DISCOUNT_PERCENTAGE) : 0,
    applyDiscountNumOfDays: process.env.APPLY_DISCOUNT_NUM_OF_DAYS ? Number(process.env.APPLY_DISCOUNT_NUM_OF_DAYS) : 0,
};