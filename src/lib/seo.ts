export type IndexingEnv = {
  vercelEnv?: string | undefined;
  allowIndexing?: string | undefined;
};

export type IndexingEnvSource = {
  VERCEL_ENV?: string | undefined;
  ALLOW_INDEXING?: string | undefined;
};

export function parseAllowIndexing(value: string | undefined): boolean {
  return value === "true";
}

export function readIndexingEnv(
  source: IndexingEnvSource = {
    VERCEL_ENV: process.env.VERCEL_ENV,
    ALLOW_INDEXING: process.env.ALLOW_INDEXING,
  },
): IndexingEnv {
  return {
    vercelEnv: source.VERCEL_ENV,
    allowIndexing: source.ALLOW_INDEXING,
  };
}

export function allowIndexing(env: IndexingEnv): boolean {
  return (
    env.vercelEnv === "production" && parseAllowIndexing(env.allowIndexing)
  );
}

export function getRobotsDirective(env: IndexingEnv): {
  index: boolean;
  follow: boolean;
} {
  const allowed = allowIndexing(env);

  return {
    index: allowed,
    follow: allowed,
  };
}
