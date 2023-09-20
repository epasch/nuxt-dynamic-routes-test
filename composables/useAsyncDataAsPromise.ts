export default function<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const { data, error, status } = useAsyncData<T>(fn);

        const unwatch = watch(status, updates => {
            if (updates === 'success') {
                resolve(data.value as T);
                unwatch();
            }

            if (updates === 'error') { 
                reject(error);
                unwatch();
            }
        });
    });
}
