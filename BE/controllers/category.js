import CategoryModel from "../models/CategoryModel.js";

export const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({}).populate("products");
    res.status(200).json({
      message: "Lay danh sach danh muc thanh cong",
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};
export const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    if (!category) {
      return res.status(400).json({
        message: "Tao danh muc that bai",
      });
    }
    return res.status(200).json({
      message: "Tao danh muc thanh cong",
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(400).json({
        message: "Lay danh muc that bai",
      });
    }
    return res.status(200).json({
      message: "Lay danh muc thanh cong",
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if(!category){
            return res.status(400).json({
                message: "Update danh muc that bai",
                
            })
        }
        return res.status(200).json({
            message: "Update danh muc thanh cong",
            data: category
        })
    } catch (error) {
        console.log(error)
    }
}
export const removeCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id)
        if(!category){
            return res.status(400).json({
                message: "Xoa danh muc that bai",
                
            })
        }
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
    }
}