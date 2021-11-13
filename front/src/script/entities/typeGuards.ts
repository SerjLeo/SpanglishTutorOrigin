import {AxiosError} from "axios";

type ServerErrorResponse = {
    error: string
}

export const isAxiosError = function(err: unknown): err is AxiosError<ServerErrorResponse> {
    return (err as AxiosError).response !== undefined
}
