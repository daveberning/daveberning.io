declare module "#build/routes" {
  const routes: Array<{
    path: string;
    name?: string;
    meta?: Record<string, any>;
  }>;
  export default routes;
}
