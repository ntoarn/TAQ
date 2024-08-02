import CategoryModel from "../models/CategoryModel.js";
import ColorModel from "../models/ColorModel.js";
import ProductModel from "../models/ProductModel.js";
import SizeModel from "../models/SizeModel.js";

export const getAllProduct = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .populate("categoryId")
      .populate("sizeId")
      .populate("colorId");
    if (product && product.length !== 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong",
        data: product,
      });
    }
    return res.status(404).json({
      message: "Khong co san pham nao trong danh sach",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    console.log("Received data:", req.body);

    const product = await ProductModel.create(req.body);
    console.log("Product created:", product);

    const [updateCategory, updateSize, updateColor] = await Promise.all([
      CategoryModel.findByIdAndUpdate(
        product.categoryId,
        {
          $push: { products: product._id },
        },
        { new: true }
      ).catch((err) => {
        console.error("Error updating category:", err);
        return null;
      }),

      SizeModel.findByIdAndUpdate(
        product.sizeId,
        {
          $push: { products: product._id },
        },
        { new: true }
      ).catch((err) => {
        console.error("Error updating size:", err);
        return null;
      }),

      ColorModel.findByIdAndUpdate(
        product.colorId,
        {
          $push: { products: product._id },
        },
        { new: true }
      ).catch((err) => {
        console.error("Error updating color:", err);
        return null;
      }),
    ]);

    if (!updateCategory) {
      console.error("Failed to update category:", product.categoryId);
      return res.status(400).json({
        message: "Cập nhật danh mục sản phẩm thất bại",
      });
    }

    if (!updateSize) {
      console.error("Failed to update size:", product.sizeId);
      return res.status(400).json({
        message: "Cập nhật kích thước sản phẩm thất bại",
      });
    }

    if (!updateColor) {
      console.error("Failed to update color:", product.colorId);
      return res.status(400).json({
        message: "Cập nhật màu sản phẩm thất bại",
      });
    }

    return res.status(201).json({
      message: "Tạo danh sách sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error); // Log lỗi chi tiết
    return res.status(500).json({
      message: "Tạo sản phẩm thất bại",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Lay danh sach san pham that bai",
      });
    }
    return res.status(201).json({
      message: "Lay danh sach san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(400).json({
        message: "Cap nhap san pham that bai",
      });
    }
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      product.categoryId,
      {
        $push: { products: product._id },
      },
      {
        new: true,
      }
    );
    if (!updateCategory) {
      return res.status(400).json({
        message: "Cap nhap danh muc san pham that bai",
      });
    }
    return res.status(201).json({
      message: "Cap nhap san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(400).json({
        message: "Xoa danh sach san pham that bai",
      });
    }
    return res.status(201).json({
      message: "Xoa san pham thanh cong",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const products = await ProductModel.find({ categoryId })
      .populate("categoryId")
      .populate("sizeId")
      .populate("colorId");

    if (products && products.length !== 0) {
      return res.status(200).json({
        message: "Lấy danh sách sản phẩm theo danh mục thành công",
        data: products,
      });
    }
    return res.status(404).json({
      message: "Không có sản phẩm nào trong danh mục này",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};