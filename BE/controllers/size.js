import SizeModel from "../models/SizeModel.js"


export const getAllSize = async (req, res) => {
    try {
        const size = await SizeModel.find({}).populate("products")
        if(!size || size.length === 0) {
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

export const getSizeById = async (req, res) => {
    try {
        const size = await SizeModel.findById(req.params.id).populate("products")
        if(!size ) {
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

export const createSize = async (req, res) => {
    try {
        // const { error } = sizeValid.validate(req.body, {abortEarly: false})
        // if(error) {
        //     const errors = error.details.map(err => err.message)
        //     return res.status(500).json({
        //         message: errors
        //     })
        // }
        const size = await SizeModel.create(req.body)
        if(!size) {
            return res.status(404).json({
                message: "Them danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Them danh muc thanh cong",
            data: size
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

export const updateSize = async (req, res) => {
    try {
        // const { error } = sizeValid.validate(req.body, {abortEarly: false})
        // if(error) {
        //     const errors = error.details.map(err => err.message)
        //     return res.status(500).json({
        //         message: errors
        //     })
        // }
        const size = await SizeModel.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        })
        if(!size) {
            return res.status(404).json({
                message: "Update danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Update danh muc thanh cong",
            data: size
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
export const deleteSize = async (req, res) => {
    try {
        const size = await SizeModel.findByIdAndDelete(req.params.id)
        if(!size) {
            return res.status(404).json({
                message: "Them danh muc that bai"
            })
        }
        return res.status(200).json({
            message: "Them danh muc thanh cong",
            data: size
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}