import * as z from "zod";

const productSchema = z.object({
	title: z.string().min(3, { message: "Title ít nhất 3 ký tự" }),
	price: z.number().min(0, { message: "Price không được để âm" }),
	description: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
	image: z.any().optional(),
	categoryId: z.string(),
});
export default productSchema;

