import orderInstance from "../axios/orderInstance";

const create = async (data) => {
  try {
    const order = await orderInstance.post(`/`, data);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

const findById = async (orderId) => {
  try {
    const order = await orderInstance.get(`/${orderId}`);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

const OrderService = {
  create,
  findById,
};
export default OrderService;
