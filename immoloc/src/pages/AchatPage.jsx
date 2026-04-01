import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsOfBuy } from '../actions/imo.actions'
import ProductItem from '../components/ProductItem'
import { isEmpty } from '../utils/utils'
import ProductItemAchat from './ProductItemAchat'

function AchatPage() {

    const [loadPost, setLoadPost] = useState(true)
    const [count, setCount] = useState(4)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const productsData = useSelector(state => state.imoReducer)?.productOfBuy
    console.log("🚀 ~ AchatPage ~ productsData:", productsData)


    
    useEffect(() => {
        if(loadPost) {
            dispatch(getProductsOfBuy(count))
            setLoadPost(false)
            setCount( count + 4)
            setIsLoading(false)
        }

        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)


    }, [loadPost, dispatch])

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }


  return (
    <div style={{ backgroundImage: 'url(./images/p.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%'}}>
             <ul className='d-flex flex-wrap wrap w-50 justify-content-center m-auto'>
     {isLoading ? (
    <i className='fas fa-spinner fa-spin'></i>
) : !isEmpty(productsData[0]) ? (
    // Si les données des produits ne sont pas vides, mappez chaque produit et affichez-le en utilisant le composant ProductItem
    productsData.map((product) => (
        <ProductItemAchat product={product} key={product.id} />
    ))
) : (
    // Sinon, s'il n'y a aucun produit disponible, affichez un message approprié
    <p>Aucun produit trouvé</p>
)}
        </ul>

    </div>
  )
}

export default AchatPage