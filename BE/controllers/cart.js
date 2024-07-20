import CartModel from "../models/CartModel.js"


export const getAllCart = async (req, res) => {
    try {
        const cart = await CartModel.find({}).populate("userId").populate("products")
        if(!cart || cart.length === 0) {
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message: "Lay danh muc thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const getCartById = async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.id).populate("products")
        if(!cart ) {
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message: "Lay danh muc thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const createCart = async (req, res) => {
    try {
        console.log('Received data:', req.body); 
        const cart = await CartModel.create(req.body);
        
        if(!cart) {
            return res.status(400).json({
                message: "Thêm đơn hàng thất bại"
            });
        }

        return res.status(200).json({
            message: "Thêm đơn hàng thành công",
            data: cart
        });
    } catch (error) {
        console.error('Error creating Cart:', error); 
        return res.status(500).json({
            error: error.message
        });
    }
}
export const updateCart = async (req, res) => {
    try {
        // const { error } = sizeValid.validate(req.body, {abortEarly: false})
        // if(error) {
        //     const errors = error.details.map(err => err.message)
        //     return res.status(500).json({
        //         message: errors
        //     })
        // }
        const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        })
        if(!cart) {
            return res.status(404).json({
                message: "Update danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Update danh muc thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
export const deleteCart = async (req, res) => {
    try {
        const cart = await CartModel.findByIdAndDelete(req.params.id)
        if(!cart) {
            return res.status(404).json({
                message: "Them danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Them danh muc thanh cong",
            data: cart
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}