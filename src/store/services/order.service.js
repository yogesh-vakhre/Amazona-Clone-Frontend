import orderInstance from "../axios/orderInstance";

const create = async (data) => {
  try {
    const order = await orderInstance.post(`/`, data);
    return order.data;
  } catch (error) {
    return console.error(error);
  }
};

const OrderService = {
  create,
};
export default OrderService;
