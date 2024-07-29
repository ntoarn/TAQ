// import React, { createContext, useEffect, useState } from 'react'
// import { ICart } from '../interfaces/Cart'
// import { instance } from '../apis'

// type Props = {
//     children: React.ReactNode
// }
// export const cartCT = createContext({} as any)
// const CartContext = ({children}: Props) => {
//   const [cart, setCart] = useState<ICart>({} as ICart)
  
//   useEffect(() => {
//     const userId = localStorage.getItem('userId') // Lấy userId từ localStorage
//     if (userId) {
//       const fetchCart = async () => {
//         try {
//           const { data } = await instance.get(`/cart/${userId}`)
//           if (data) {
//             setCart(data)
//           }
//         } catch (error) {
//           console.error("Failed to fetch cart:", error)
//         }
//       }

//       fetchCart()
//     } else {
//       console.error("No userId found in localStorage")
//     }
//   }, [])

//   return (
//     <cartCT.Provider value={{ cart, setCart }}>
//         {children}
//     </cartCT.Provider>
//   )
// }

// export default CartContext
