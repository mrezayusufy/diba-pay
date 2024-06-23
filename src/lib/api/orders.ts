import { api } from './api';

export const fetchOrders = () => api.url('/orders').get().json();
export const createOrder = (orderData: any) => api.url('/orders').post(orderData);