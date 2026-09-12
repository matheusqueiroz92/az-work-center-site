export function isDesignSystemRouteEnabled(
  vercelEnv: string | undefined,
): boolean {
  return vercelEnv !== "production";
}
