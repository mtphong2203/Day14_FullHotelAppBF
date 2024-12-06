import { InjectionToken } from "@angular/core";
import { IOrderService } from "../services/order/order.interface";
import { IRoomService } from "../services/room/room.interface";
import { IUserService } from "../services/user/user.interface";

export const ORDER_SERVICE = new InjectionToken<IOrderService>('ORDER_SERVICE');

export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');

export const ROLE_SERVICE = new InjectionToken<IUserService>('ROLE_SERVICE');