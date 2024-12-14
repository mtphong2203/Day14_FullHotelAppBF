import { InjectionToken } from "@angular/core";
import { IOrderService } from "../services/order/order.interface";
import { IRoomService } from "../services/room/room.interface";
import { IUserService } from "../services/user/user.interface";
import { IRoleService } from "../services/role/role.interface";
import { IAuthService } from "../services/auth/auth.interface";
import { IBookingService } from "../services/booking/booking.interface";
import { IPermissionService } from "../services/permissions/permission.interface";

export const ORDER_SERVICE = new InjectionToken<IOrderService>('ORDER_SERVICE');

export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');

export const ROLE_SERVICE = new InjectionToken<IRoleService>('ROLE_SERVICE');

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');

export const BOOKING_SERVICE = new InjectionToken<IBookingService>('BOOKING_SERVICE');

export const PERMISSION_SERVICE = new InjectionToken<IPermissionService>('PERMISSION_SERVICE');