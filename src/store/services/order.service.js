import orderInstance from "../axios/orderInstance";

const getOrders = async () => await orderInstance.get(`/mine`);

const createOrder = async (data) => await orderInstance.post(`/`, data);

const findOrderById = async (orderId) => await orderInstance.get(`/${orderId}`);

const payOrderById = async (orderId) =>
  await orderInstance.put(`/${orderId}/pay`);

const deliverOrderById = async (orderId) =>
  await orderInstance.put(`/${orderId}/deliver`);

const OrderService = {
  getOrders,
  createOrder,
  findOrderById,
  payOrderById,
  deliverOrderById,
};
export default OrderService;
