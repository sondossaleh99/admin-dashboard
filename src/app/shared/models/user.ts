export interface User {
  name: string;
  role: string;
  /** Initials shown when no avatar image is available. */
  initials: string;
  avatarUrl?: string;
}
