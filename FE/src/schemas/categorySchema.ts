import * as z from "zod";

const categorySchema = z.object({
	name: z.string().min(3, { message: "Title ít nhất 3 ký tự" }),
	slug: z.string().min(1, { message: "Không được bỏ trống dữ liệu" })
});
export default categorySchema;

