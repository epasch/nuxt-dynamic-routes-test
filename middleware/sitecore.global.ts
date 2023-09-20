export default defineNuxtRouteMiddleware(to => { 
    // check if route already matched
    if (to.matched.length > 0) return;

    const { getRouteName, isSitecorePath, resolveTemplateFn } = useSitecoreRouting();
    // if route does not exist, and path is a sitecore path, add the route and replace
    if(isSitecorePath(to.path)) {
        const router = useRouter();
        const routeName = getRouteName(to.path);
        if(!router.hasRoute(routeName)) {
            const template = 'article'; //await useAsyncDataAsPromise<string>(() => resolveTemplateFn(to));
            if (template) {
                const randomId = Math.ceil(Math.random() * 100);
                router.addRoute({
                    path: to.path,
                    name: routeName,
                    props: {
                        id: randomId
                    },
                    component: () => import(`../pages/templates/${ template }.vue`).then(r => r.default || r)
                });
                // replace route, and force redirectCode to 200 so client gets a proper 200 response
                return navigateTo(to, { replace: true, redirectCode: 200 });
            } else {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Page not found',
                    })
                );
            }
        }
    }
});
