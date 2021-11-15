import {AxiosError} from "axios";
import {availableLanguage} from "../types";

type ServerErrorResponse = {
    error: string
}

export const isAxiosError = function(err: unknown): err is AxiosError<ServerErrorResponse> {
    return (err as AxiosError).response !== undefined
}

export const isAvailableLang = function(str: string): str is availableLanguage {
    return ['eng', 'esp', 'both'].includes(str);
}
