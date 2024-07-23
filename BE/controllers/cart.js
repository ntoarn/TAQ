import CartModel from "../models/CartModel.js";

export const getCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await CartModel.findOne({ userId}).populate("products.productId")
        const cartData = {
            products: cart.products.map((item) =>({
                productId: item.productId._id,
                title: item.productId.title,
                quantity: item.quantity
            }))
        }
        return res.status(200).json({
            message: "Lay gio hang cua user thanh cong",
            data: cartData
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
export const addItemToCart = async (req, res) => {
    const { userId , productId, quantity } = req.body;
    try {
        let cart = await CartModel.findOne({ userId })
        if(!cart){
            cart = new CartModel({ userId, products: [] })
        }
        const existProductIndex = cart.products.findIndex((item) => item.productId.toString() == productId)
        if(existProductIndex !== -1){
            cart.products[existProductIndex].quantity += quantity
            // await cart.save()
        }else{
            cart.products.push({ productId, quantity })
            // await cart.save()
        }
        await cart.save()
        return res.status(200).json({
            message: "Them san pham vao gio hang thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }   
}

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body
    try {
        let cart = await CartModel.findOne({ userId })
        if(!cart){
            return res.status(404).json({
                message: "Khong tim thay san pham trong gio hang"
            })
        }
        cart.products = cart.products.filter((product) => product.productId && product.productId.toString() !== productId)
        await cart.save()
        return res.status(200).json({
            message: "Xoa san pham khoi gio hang thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

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
// export const getAllCart = async (req, res) => {
//     const { userId } = req.params
//     try {
//         const cart = await CartModel.findOne({ userId }).populate("userId").populate("products")
//         if(!cart || cart.length === 0) {
//             return res.status(404).json({
//                 message: "Khong tim thay danh muc"
//             })
//         }
//         return res.status(200).json({
//             message: "Lay danh muc thanh cong",
//             data: cart
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         })
//     }
// }

// export const getCartById = async (req, res) => {
//     try {
//         const cart = await CartModel.findById(req.params.id).populate("products")
//         if(!cart ) {
//             return res.status(404).json({
//                 message: "Khong tim thay danh muc"
//             })
//         }
//         return res.status(200).json({
//             message: "Lay danh muc thanh cong",
//             data: cart
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         })
//     }
// }

// export const createCart = async (req, res) => {
//     try {
//         console.log('Received data:', req.body); 
//         const cart = await CartModel.create(req.body);
        
//         if(!cart) {
//             return res.status(400).json({
//                 message: "Thêm đơn hàng thất bại"
//             });
//         }

//         return res.status(200).json({
//             message: "Thêm đơn hàng thành công",
//             data: cart
//         });
//     } catch (error) {
//         console.error('Error creating Cart:', error); 
//         return res.status(500).json({
//             error: error.message
//         });
//     }
// }
// export const updateCart = async (req, res) => {
//     try {
//         // const { error } = sizeValid.validate(req.body, {abortEarly: false})
//         // if(error) {
//         //     const errors = error.details.map(err => err.message)
//         //     return res.status(500).json({
//         //         message: errors
//         //     })
//         // }
//         const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body,{
//             new:true
//         })
//         if(!cart) {
//             return res.status(404).json({
//                 message: "Update danh muc that bai"
//             })
//         }
//         return res.status(200).json({
//             message: "Update danh muc thanh cong",
//             data: cart
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         })
//     }
// }
// export const deleteCart = async (req, res) => {
//     try {
//         const cart = await CartModel.findByIdAndDelete(req.params.id)
//         if(!cart) {
//             return res.status(404).json({
//                 message: "Them danh muc that bai"
//             })
//         }
//         return res.status(200).json({
//             message: "Them danh muc thanh cong",
//             data: cart
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         })
//     }
// }