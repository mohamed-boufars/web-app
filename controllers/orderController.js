import orderModel from "../models/orderModel.js";


export const orderController = async (req, res) => {
    try {
      const order = await orderModel.find({});
      res.status(200).send({
        success: true,
        message: "All orders List",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting orders",
      });
    }
  };