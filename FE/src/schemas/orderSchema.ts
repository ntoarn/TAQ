import Joi from 'joi';

const orderItemSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

const customerInfoSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: false }).required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    payment: Joi.string().required(),
    city: Joi.string().required()
});

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(orderItemSchema).required(),
    orderNumber: Joi.string().required(),
    customerInfo: customerInfoSchema.required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().valid("pending", "confirmed", "shipped", "delivered").default("pending")
});

export { orderItemSchema, customerInfoSchema, orderSchema };