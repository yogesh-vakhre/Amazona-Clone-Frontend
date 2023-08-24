import orderInstance from "../axios/orderInstance";

const getOrders = async () => {
  try {
    const order = await orderInstance.get(`/mine`);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

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

const payOrderById = async (orderId) => {
  try {
    const order = await orderInstance.put(`/${orderId}/pay`);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

const deliverOrderById = async (orderId) => {
  try {
    const order = await orderInstance.put(`/${orderId}/deliver`);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

const OrderService = {
  getOrders,
  create,
  findById,
  payOrderById,
  deliverOrderById,
};
export default OrderService;
