import CartModel from "../models/CartModel.js";


export const getCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await CartModel.findOne({ userId }).populate('products.productId');
        const cartData = {
            products: cart.products.map((item) =>{
               return {
                productId: item.productId._id,
                image: item.productId.image,
                title: item.productId.title,
                price: item.productId.price,
                quantity: item.quantity
               }
            })
        }
        return res.status(200).json( cartData
        )
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        cart = new CartModel({ userId, products: [] });
      }
      const existProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() == productId
      );
      if (existProductIndex !== -1) {
        cart.products[existProductIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
      return res.status(200).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      console.error("Error in addItemToCart:", error);
      return res.status(500).json({
        error: error.message,
      });
    }
  };

export const removeFromCart = async (req, res) => {
  const { userId, productId, } = req.body;
  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Khong tim thay san pham trong gio hang",
      });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );
    await cart.save();
    return res.status(200).json({
      message: "Xoa san pham khoi gio hang thanh cong",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateProductQuantity = async (req, res ) =>{
    const { userId, productId, quantity } = req.body
    try {
        let cart = await CartModel.findOne({ userId })
        if(!cart){
            return res.status(404).json({
                message: "Khong tim thay san pham trong gio hang"
            })
        }
        const product = cart.products.find((item) => item.productId.toString() === productId)
        if(!product){
            return res.status(404).json({
                message: "Khong tim thay san pham trong gio hang"
            })
        }
        product.quantity = quantity
        await cart.save()
        return res.status(200).json({
            message: "Cap nhat so luong san pham thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
// tang slg
export const increaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await CartModel.findOne({ userId })
    if(!cart){
      return res.status(404).json({
        message: "Khong tim thay san pham trong gio hang"
      })
    }
    const product = cart.products.find((item) => item.productId.toString() === productId)
    if(!product){
      return res.status(404).json({
        message: "Khong tim thay san pham trong gio hang"
      })
    }
    product.quantity++
    await cart.save()
    return res.status(200).json(cart)
  } catch (error) {
    return res.status(500).json({
      error: error.message
  })
  }
}
// giam slg
export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body
  try {
    let cart = await CartModel.findOne({ userId })
    if(!cart){
      return res.status(404).json({
        message: "Khong tim thay san pham trong gio hang"
      })
    }
    const product = cart.products.find((item) => item.productId.toString() === productId)
    if(!product){
      return res.status(404).json({
        message: "Khong tim thay san pham trong gio hang"
      })
    }
    if(product.quantity > 1){
      product.quantity--
      
    }
    await cart.save()
    return res.status(200).json(cart)
  } catch (error) {
    return res.status(500).json({
      error: error.message
  })
  }
}