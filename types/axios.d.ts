import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** When true, 401 responses do not clear the token or redirect to login. */
    skipAuthRedirect?: boolean;
  }
}
