import type { CustomerModel } from "./customer.model";
import type { StateModel } from "./state.model";

export interface OrderModel {
    orderId: number;
    orderCreatedAt: string;
    orderUpdatedAt: string;
    orderCustomerId: number;
    orderCustomer: CustomerModel;
    orderStateId: number;
    orderState: StateModel;
}