import ColorModel from "../models/ColorModel.js"

export const getAllColor = async (req, res) => {
    try {
        const color = await ColorModel.find({}).populate("products")
        if(!color || color.length === 0) {
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message: "Lay danh muc thanh cong",
            data: color
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const getColorById = async (req, res) => {
    try {
        const color = await ColorModel.findById(req.params.id).populate("products")
        if(!color ) {
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message: "Lay danh muc thanh cong",
            data: size
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const createColor = async (req, res) => {
    try {
        // const { error } = sizeValid.validate(req.body, {abortEarly: false})
        // if(error) {
        //     const errors = error.details.map(err => err.message)
        //     return res.status(500).json({
        //         message: errors
        //     })
        // }
        const color = await ColorModel.create(req.body)
        if(!color) {
            return res.status(404).json({
                message: "Them danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Them danh muc thanh cong",
            data: color
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const updateColor = async (req, res) => {
    try {
        // const { error } = sizeValid.validate(req.body, {abortEarly: false})
        // if(error) {
        //     const errors = error.details.map(err => err.message)
        //     return res.status(500).json({
        //         message: errors
        //     })
        // }
        const color = await ColorModel.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        })
        if(!color) {
            return res.status(404).json({
                message: "Update danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Update danh muc thanh cong",
            data: color
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
export const deleteColor = async (req, res) => {
    try {
        const color = await ColorModel.findByIdAndDelete(req.params.id)
        if(!color) {
            return res.status(404).json({
                message: "Them danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Them danh muc thanh cong",
            data: color
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}