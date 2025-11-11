import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface HookResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error: Error | undefined;
}

export function useApi<T>(url: string): HookResult<T> {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        api.get(url)
            .then(({ data }) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, [url]);

    return { data, isLoading, error };
}
