export interface User {
  readonly name: string;
  readonly role: string;
  /** Initials shown when no avatar image is available. */
  readonly initials: string;
  readonly avatarUrl?: string;
}
