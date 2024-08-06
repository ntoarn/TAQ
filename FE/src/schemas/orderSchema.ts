
import Joi from 'joi';

export const customerInfoSchema = Joi.object({
  name: Joi.string().required().label('Tên'),
  email: Joi.string().email({tlds: false}).required().label('Email'),
  address: Joi.string().required().label('Địa chỉ'),
  phone: Joi.string().pattern(/^[0-9]+$/).required().label('Số điện thoại'),
  payment: Joi.string().valid('COD', 'MOMO').required().label('Hình thức thanh toán'),
  city: Joi.string().required().label('Thành phố'),
});
