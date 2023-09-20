export default function() {
    const includePaths: RegExp[] = [
        /^(\/columnists\/)(.*)/i
    ];

    const resolveTemplateFn = (to:any) => {
        return new Promise<string>(resolve => {
            console.log('checking template');
            if (to.path.startsWith('/columnists/')) {
                setTimeout(() => resolve('article'), 100);
            }
        });
    }

    const isSitecorePath = (path: string) => includePaths.find((regex: RegExp) => regex.test(path));
    const getRouteName = (path: string) => base64UrlEncode(path);

    return {
        includePaths,
        resolveTemplateFn,
        isSitecorePath,
        getRouteName
    }
}
