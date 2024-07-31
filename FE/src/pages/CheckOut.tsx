import React from 'react'
import useCart from '../hooks/useCart'
import useLocalStorage from '../hooks/useStorage'
import { Product } from '../interfaces/Product'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { customerInfoSchema } from '../schemas/orderSchema'
import { ICustomerInfo, IOrder } from '../interfaces/Order'
import { useMutation } from '@tanstack/react-query'
import { instance } from '../apis'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
    const nav = useNavigate()
    const { data: cartData, calculateTotal } = useCart()
    const [user] = useLocalStorage("user", {})
    const userId = user?.user?._id;
    // console.log(userId)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICustomerInfo>({
        resolver:joiResolver(customerInfoSchema)
    })
    const { mutate } = useMutation({
        mutationFn: async(order: {userId: string; items: [], totalPrice: number, customerInfo: object}) =>{
            const { data } = await instance.post(`/order`, order)
            return data;
        },
        onSuccess: () => {
            nav('/thankyou')
            alert('Đặt hàng thành công');
            window.location.reload();
        }
    })
    const onSubmit = (data: ICustomerInfo) => {
        const order: IOrder = {
          userId: userId,
          items: cartData?.products || [], 
          totalPrice: calculateTotal(),
          customerInfo: data
        };
        mutate(order);
        // console.log('Order Data: ', order);
    };
  return (
    <div>
      <div className="container mx-auto">
      <h1 className='font-bold tex-4xl'>Check Out</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
        <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Tên
                </label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  {...register('address')}
                  id="address"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  {...register('phone')}
                  id="phone"
                  type="number"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment">
                  Hình thức thanh toán
                </label>
                <input
                  {...register('payment')}
                  id="payment"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.payment ? 'border-red-500' : ''}`}
                />
                {errors.payment && <p className="text-red-500 text-xs italic">{errors.payment.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  Thành phố
                </label>
                <input
                  {...register('city')}
                  id="city"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && <p className="text-red-500 text-xs italic">{errors.city.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Thanh toán
                </button>
              </div>
            </form>
        </div>
        <div className="col-span-4">
        {cartData?.products?.map((item: Product) => (
              <div key={item._id} className='border-b py-4'>
                <h4>Tên: {item.title}</h4>
                <p>Giá: {item.price}</p>
                <p>Số lượng: {item.quantity}</p>
              </div>
            ))}
            <p className='mt-5'>
              <strong className='mr-2'> Sản phẩm: </strong>{cartData?.products ? cartData?.products.length : 0}
            </p>
            <p>
              <strong className='mr-2'>Tổng tiền: </strong> {calculateTotal()}
            </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CheckOut