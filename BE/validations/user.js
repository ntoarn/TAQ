import Joi from "joi";

export const registerValue = Joi.object({
    // name: Joi.string().required().min(6).max(255).messages({
    //     "string.empty":"Không được bỏ trống!!!!",
    //     "any.required": "Thông tin bắt buộc!!!",
    //     "string.min" : "Tên đang nhập có ít nhất (#limit) kí tự",
    //     "string.max":"Tên đang nhập có ít hơn {#limit + 1} kí tự ",
    // }),
    email: Joi.string().required().email().messages({
        "string.empty":"Email không được bỏ trống!!!!",
        "any.required": "Thông tin bắt buộc!!!",
        "string.email": "Email không đúng định dạng"
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty":"Không được bỏ trống!!!!",
        "any.required": "Thông tin bắt buộc!!!",
        "string.min" : "Mật khẩu có ít nhất 6 kí tự",
        "string.max":"Mật khẩu có ít hơn 255 kí tự ",
    }),
    confirmPassword: Joi.string().required().min(6).max(225).valid(Joi.ref("password")).messages({
        "string.empty":"Không được bỏ trống!!!!",
        "any.required": "Thông tin bắt buộc!!!",
        "string.min" : "confirmPassword có ít nhất 6 kí tự",
        "string.max":"confirmPassword có ít hơn 255 kí tự ",
        "any.only": "confirmPassword không khớp với mật khẩu"
    }),
    // address: Joi.string().required().min(6).max(255).messages({
    //     "string.empty":"Địa chỉ không được bỏ trống!!!!",
    //     "any.required": "Thông tin bắt buộc!!!",
    // }),
    // phone: Joi.string().required().min(10).max(10).messages({
    //     "string.empty":"Số điện thoại không được bỏ trống!!!!",
    //     "any.required": "Thông tin bắt buộc!!!",
    //     "string.min" : "Số điện thoại có ít nhất 10 kí tự",
    //     "string.max":"Số điện thoai co 10 ky tu"
    // }),
    role: Joi.string()

})
export const loginValid = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty":"Email không được bỏ trống!!!!",
        "any.required": "Thông tin bắt buộc!!!",
        "string.email": "Email không đúng định dạng"
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty":"Không được bỏ trống!!!!",
        "any.required": "Thông tin bắt buộc!!!",
        "string.min" : "Mật khẩu có ít nhất 6 kí tự",
        "string.max":"Mật khẩu có ít hơn 255 kí tự ",
    }),

})