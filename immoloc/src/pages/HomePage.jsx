import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import ModalGuide from '../components/ModalGuide'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/Col';
import ModalInfoSupLeft from '../components/ModalInfoSupLeft'
import ProductList from '../components/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { getProductForTypeSale, getProducts, getProductsFiltered, getProductsFilteredMax } from '../actions/imo.actions'
import { isEmpty } from '../utils/utils'
import ProductItem from '../components/ProductItem'

function HomePage() {

    const [displayNavLeft, setDisplayNavLeft] = useState(false)
    const productsData = useSelector(state => state.imoReducer)?.products
    const productsSale = useSelector(state => state.imoReducer)?.productOfSale
    const productsFilter = useSelector(state => state.imoReducer)?.productOfFilter
    console.log("🚀 ~ HomePage ~ productsFilter:", productsFilter)
    console.log("🚀 ~ HomePage ~ productsSale:", productsSale)
    console.log("🚀 ~ ProductList ~ productsData:", productsData)
    const [products, setProducts] = useState([])
    const [loadPost, setLoadPost] = useState(true)
    const [search, setSearch] = useState(false)
    const [loadPostProductSale, setLoadPostProductSale] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    // const [inputValue, setInputValue] = useState('');
    const [validated, setValidated] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionType, setSelectedOptionType] = useState('');
    const [selectedOptionPiece, setSelectedOptionPiece] = useState('');
    const [selectedIdChangeMin, setSelectedIdChangeMin] = useState('');
    const [selectedIdChangeMax, setSelectedIdChangeMax] = useState('');
    const [commune, setCommune] = useState('')
    // console.log("🚀 ~ HomePage ~ selectedIdChangeMax:", selectedIdChangeMax)
    // console.log("🚀 ~ HomePage ~ selectedIdChangeMin:", selectedIdChangeMin)
    console.log("🚀 ~ HomePage ~ selectedOptionPiece:", selectedOptionPiece)
    console.log("🚀 ~ HomePage ~ selectedOptionType:", selectedOptionType)
    console.log("🚀 ~ HomePage ~ selectedOption:", selectedOption)

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    console.log("🚀 ~ HomePage ~ minPrice:", minPrice)

    useEffect(() => {
        navigator.geolocation.watchPosition(async (position) => {
            try {
                console.log("position", position);
                const { latitude, longitude } = position.coords
                const response = await fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
                const data = await response.json();
                // if(data.status === 200) {
                    console.log("data : ", data);
                    const commune = data[0].codesPostaux[0]
                    console.log("🚀 ~ navigator.geolocation.watchPosition ~ commune:", commune)
                    setCommune(commune)

                    // }
            } 
            catch (error) {
                console.log("🚀 ~ navigator.geolocation.watchPosition ~ error:", error)
                
            }

        })
      })
    

    const handlePriceChange = (event) => {
      setMinPrice(parseInt(event.target.value));
    };
  
    const handleSliderChange = (event) => {
        console.log("🚀 ~ handleSliderChange ~ event:", event.target.id)
        setSelectedIdChangeMin(event.target.id)
        setMinPrice(parseInt(event.target.value));
      };

      const handleSliderChangeMax = (event) => {
        console.log("🚀 ~ handleSliderChangeMax ~ event:", event.target.id)
        setSelectedIdChangeMax(event.target.id)
        setMaxPrice(parseInt(event.target.value));
      };
    
    const [count, setCount] = useState(4)
    const dispatch = useDispatch()
    const [post, setPost] = useState({
        // type: selectedOptionType,
        // price: minPrice,
        surface: "",
        localisation: '',
        zip: '',
        // nbrpiece: selectedOptionPiece,
        terms: false
    })
    // const [selectedOption, setSelectedOption] = useState('');

    const product = { 
        ...post, 
        type: selectedOptionType,
        price: minPrice | maxPrice,
        nbrpiece: selectedOptionPiece
    }
    

    // useEffect(() => {
        //     setIsLoading(!isLoading)
        //   }, [productsData])
        
        // const handleInputChange = (value) => {
            //     console.log("🚀 ~ handleInputChange ~ value:", value)
            //     setInputValue(value);
            //   };
            
        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
            console.log("Selected option:", event.target.value);
        };

        const handleSelectChangePiece = (event) => {
            setSelectedOptionPiece(event.target.value);
            console.log("Selected option:", event.target.value);
        };
        
        
        const handleSubmit = (event) => {
          event.preventDefault();
          console.log("Form submitted. Selected option:", selectedOption);
          dispatch(getProductForTypeSale(selectedOption, count))
        };
        
        const handleSubmitModalLeft = (event) => {
            event.preventDefault();
            console.log("🚀 ~ HomePage 7887~ product:", product)
            if(selectedIdChangeMin === "exampleForm.ControlRangeMin") {
                console.log("🚀 ~ HomePage ~ selectedIdChangeMin:", selectedIdChangeMin)
                dispatch(getProductsFiltered(product, count))
                setSearch(true)

            } else if(selectedIdChangeMax === "exampleForm.ControlRangeMax") {
                console.log("🚀 ~ HomePage ~ selectedIdChangeMax:", selectedIdChangeMax)
                
                dispatch(getProductsFilteredMax(product, count))
                setSearch(true)
                
            }
            
            
        }

        
        const handleSelectChange = (event) => {
            setSelectedOptionType(event.target.value);
        };
        
        
        
        const handleChange = (evt) => {
            const { name, value } = evt.target;
            setPost((prevPost) => ({
              ...prevPost,
              [name]: value,
            }));
        };


    useEffect(() => {
        if(loadPost) {
            dispatch(getProducts(count))
            setLoadPost(false)
            setCount( count + 4)
            setIsLoading(false)
        }
        
        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)

    }, [loadPost, dispatch])

    useEffect(() => {
        if(loadPostProductSale) {
            dispatch(getProductForTypeSale(selectedOption, count))
            setLoadPostProductSale(false)
            setCount( count + 4)
            setIsLoading(false)
            
        }
    }, [loadPostProductSale, dispatch])
    

    const displayNav = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            console.log(' fin de page !');
            // console.log(document.scrollingElement.scrollHeight);
            // console.log(window.innerHeight + document.documentElement.scrollTop + 1);
            // console.log(window.innerHeight);
            setDisplayNavLeft(!displayNavLeft)
            if(displayNavLeft === true) {
                setDisplayNavLeft(!displayNavLeft)
            }
            // setLoadPost(true)
        
        }
    }

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }
    
    const loadMoreProductSale = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPostProductSale(true)
        }
    }

    useEffect(() => {
        
        window.addEventListener('scroll', displayNav)
        return () => window.removeEventListener('scroll', displayNav)
        
    })
    
    console.log("🚀 ~ HomePage ~ selectedOption:", selectedOption)
    console.log("🚀 ~ HomePage ~ commune:", commune)

    return (
        <>
    <div style={{ backgroundImage: 'url(./images/p.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%'}}>
        {/* <Navigation/> */}
        <h1 style={{ textAlign: 'center' }}>Acceuil</h1>
        <ModalGuide selectedOption={selectedOption}  setSelectedOption={setSelectedOption} handleOptionChange={handleOptionChange} handleSubmit={handleSubmit} />
        <br/>
        <br/>
        <br/>
        <Container>
            <Row>
                <Col>
                <div className='h-100'>
        <ul className='d-flex flex-wrap wrap '>
        {isLoading ? (
            <i className='fas fa-spinner fa-spin'></i>
        ) : (
            selectedOption && !isEmpty(productsSale[0]) ? (
                // Afficher les produits en vente si une option est sélectionnée et si des produits en vente sont disponibles
                productsSale.map((product) => (
            <ProductItem product={product} key={product.id} />
        ))
    ) : search && !isEmpty(productsFilter[0]) ? (
        // Afficher les produits filtrés si une recherche est effectuée et si des produits filtrés sont disponibles
        productsFilter.map((product) => (
            <ProductItem product={product} key={product.id} />
        ))
    ) : !isEmpty(productsData[0]) ? (
        // Sinon, afficher tous les produits disponibles
        productsData.map((product) => (
            <ProductItem product={product} key={product.id} />
        ))
    ) : (
        // Si aucun produit n'est trouvé, afficher un message indiquant qu'aucun produit n'a été trouvé
        <p>Aucun produit trouvé</p>
    )
)}
        </ul>
        
    </div>
</Col>
                <Col>{ displayNavLeft && <div className='modal-left'><ModalInfoSupLeft commune={commune} post={post} setPost={setPost} maxPrice={maxPrice} minPrice={minPrice} handlePriceChange={handlePriceChange} handleSliderChange={handleSliderChange}  handleChange={handleChange} handleSubmitModalLeft={handleSubmitModalLeft} selectedOptionType={selectedOptionType} setSelectedOptionType={setSelectedOptionType} handleSelectChange={handleSelectChange} handleSelectChangePiece={handleSelectChangePiece} selectedOptionPiece={selectedOptionPiece} handleSliderChangeMax={handleSliderChangeMax} /></div>}</Col>
            </Row>
        </Container>
    </div>
        <Footer/>
        </>
  )
}

export default HomePage
