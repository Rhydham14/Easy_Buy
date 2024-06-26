const orderService = require('../Services/orderService')
const orderlist = async (req, res) =>{
    try{
        const {productDetails} = req.body;
        await orderService.orderlist(productDetails);
        console.log("orderlist controller");
        res.status(200).json({ message: "Order added successfully" });

    }catch(error){
        res.status(500).json({ message: "Failed to Order porduct" });
    }
};
const getAllOrders = async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  };

module.exports = {
    orderlist,
    getAllOrders
}