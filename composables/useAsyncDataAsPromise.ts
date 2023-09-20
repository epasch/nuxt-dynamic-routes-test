export default function<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        const { pending, data, error} = useAsyncData<T>(fn);
        const unwatch = watch([pending, data, error], ([pendingUpdates, dataUpdates, errorUpdates]) => {
            if (!pendingUpdates) {
                if (errorUpdates) {
                    reject(errorUpdates);
                } else {
                    resolve(dataUpdates as T);
                }
                
                unwatch();
            }
        });
    });
}
