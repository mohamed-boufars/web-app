import userModel from "../models/userModel.js";


export const userController = async (req, res) => {
    try {
      const user = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "All users List",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting users",
      });
    }
  };
  //delete controller
  export const deleteUserController = async (req, res) => {
    try {
      await userModel.deleteOne({ email: req.params.email });
      res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting user",
        error,
      });
    }
  };  
  

export const userCountController = async (req, res) => {
  try {
    const total = await userModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};