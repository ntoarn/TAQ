import CategoryModel from "../models/CategoryModel.js"
import ProductModel from "../models/ProductModel.js"

export const getAllProduct = async (req, res) => {
    try {
        const product = await ProductModel.find({}).populate("categoryId")
        if (product && product.length !== 0) {
            return res.status(200).json({
                message: "Lay danh sach san pham thanh cong",
                data: product
            })
        }
        return res.status(404).json({
            message: "Khong co san pham nao trong danh sach"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.create(req.body)
    //     const updateCategory = await CategoryModel.findByIdAndUpdate(product.categoryId, {
    //         $push: { products: product._id },
    //     }, {
    //     new: true
    // })
    // if(!updateCategory){
    //     return res.status(400).json({
    //         message: "Cap nhap danh muc san pham that bai",
    //     })
    // }
    return res.status(201).json({
        message: "Tao danh sach san pham thanh cong",
        data: product
    })

} catch (error) {
    next(error)
}
}

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(400).json({
                message: "Lay danh sach san pham that bai",
            })
        }
        return res.status(201).json({
            message: "Lay danh sach san pham thanh cong",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!product) {
            return res.status(400).json({
                message: "Cap nhap san pham that bai",
            })
        }
        const updateCategory = await CategoryModel.findByIdAndUpdate(product.categoryId, {
            $push: { products: product._id },
        }, {
        new: true
    })
    if(!updateCategory){
        return res.status(400).json({
            message: "Cap nhap danh muc san pham that bai",
        })
    }
        return res.status(201).json({
            message: "Cap nhap san pham thanh cong",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            name: error.name
        })
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findByIdAndDelete(`${req.params.id}`,{
            hide:true,
        },{
            new: true
        })
        if (!product) {
            return res.status(400).json({
                message: "Xoa danh sach san pham that bai",
            })
        }
        return res.status(201).json({
            message: "Xoa san pham thanh cong",
            data: product
        })
    } catch (error) {
        next(error)
    }
}