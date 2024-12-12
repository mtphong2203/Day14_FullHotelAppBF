export interface IPermissionService {
    canActivate(): boolean;
    isUnauthenticated(): boolean;
}