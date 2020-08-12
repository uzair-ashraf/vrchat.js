export interface WorldEndPoints {
  readonly any: string;
  readonly active: string;
  readonly recentlyVisited: string;
  readonly favorite: string;
}

export interface WorldOptions {
  featured?: boolean;
  sort?: string;
  user?: string;
  userId?: string;
  n?: number;
  order?: string;
  offset?: number;
  search?: string;
  releaseStatus?: string;
}
