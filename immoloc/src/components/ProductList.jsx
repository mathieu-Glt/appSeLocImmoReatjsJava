// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProducts } from '../actions/imo.actions'
// import { isEmpty } from '../utils/utils'
// import ProductItem from './ProductItem'

// function ProductList() {

//     // const productsData = useSelector(state => state.imoReducer)
//     // console.log("🚀 ~ ProductList ~ productsData:", productsData)
//     // const [products, setProducts] = useState([])
//     // const [loadPost, setLoadPost] = useState(true)
//     // const [count, setCount] = useState(5)
//     // const dispatch = useDispatch()

//     // useEffect(() => {
//     //     if(loadPost) {
//     //         dispatch(getProducts(count))
//     //         setLoadPost(false)
//     //         setCount( count + 5)
    
//     //     }
//     // }, [])


//   return (
//     <div className='d-flex flex-wrap '>
//         <ul>
//             {!isEmpty(productsData[0]) && 
//                 productsData.map((products) => {
//                     return <ProductItem products={products} />
//                 })
//             }
//         </ul>
        
//     </div>
//   )
// }

// export default ProductList