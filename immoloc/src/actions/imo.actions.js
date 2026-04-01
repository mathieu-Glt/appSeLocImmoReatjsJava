import axios from 'axios'


export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_PRODUCTS_FOR_SALE = "GET_PRODUCTS_FOR_SALE";
export const GET_FILTERED_PRODUCTS = "GET_FILTERED_PRODUCTS";
export const GET_PRODUCTS_FOR_RENTAL = "GET_PRODUCTS_FOR_RENTAL";
export const GET_PRODUCTS_FOR_BUY = "GET_PRODUCTS_FOR_BUY";

export const getProducts = (num) => {
    console.log("🚀 ~ getProducts ~ getProducts:")
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}/data`)
            // .get('http://localhost:8800/data')
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res.data)
                const array = res.data.slice(0, num)
                dispatch({ type: GET_PRODUCTS, payload: array })
            })
            .catch((err) => console.log(err))
    }
}

export const getProductById = (id) => {
    console.log("🚀 ~ getProductById ~ getProductById:")
    console.log("🚀 ~ getProductById ~ id:", id)
    const objectId = parseInt(id)
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/data`)
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res.data)
                const product = res.data.find(item => item.id === objectId)
                console.log("🚀 ~ .then ~ product:", product)
                dispatch({ type: GET_PRODUCTS_BY_ID, payload: product })
            })
            .catch((err) => console.log(err))
    }
}

export const getProductForTypeSale = (nme) => {
    console.log("🚀 ~ getProductForTypeSale ~ nme:", nme)
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}/data`)
            .then((res) => {
            // console.log("🚀 ~ .then ~ res:", res.data)
            const products = res.data.filter(item => item.typeOfSale === nme)
            console.log("🚀 ~ .then ~ products:", products)
            dispatch({ type: GET_PRODUCTS_FOR_SALE, payload: products });

            })
            .catch((err) => console.log(err))

    }
    
}

export const getProductsFiltered = (object, count) => {
    console.log("🚀 ~ getProductsFiltered ~ count:", count)
    console.log("🚀 ~ getProductsFiltered ~ object:", object)
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/data`)
        .then((res) => {
          const filteredProducts = res.data.filter((product) => {
            // Vérifiez chaque propriété filtrée et retournez true si toutes les conditions sont remplies
            return (
              (!object.type || product.type === object.type) &&
              (!object.price || product.price <= object.price ) &&
              (!object.localisation || product.localisation === object.localisation) &&
              (!object.zip || product.zip === object.zip) &&
              (!object.nbrpiece || product.nbrpiece === object.nbrpiece) && 
              (!object.surface || product.surface === object.surface)  
              
            );
          });
          dispatch({ type: GET_FILTERED_PRODUCTS, payload: filteredProducts });
        })
        .catch((err) => console.log(err));
    };
  };  

  export const getProductsFilteredMax = (object, count) => {
    console.log("🚀 ~ getProductsFiltered ~ count:", count)
    console.log("🚀 ~ getProductsFiltered ~ object:", object)
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/data`)
        .then((res) => {
          const filteredProducts = res.data.filter((product) => {
            // Vérifiez chaque propriété filtrée et retournez true si toutes les conditions sont remplies
            return (
              (!object.type || product.type === object.type) &&
              (!object.price || product.price >= object.price ) &&
              (!object.localisation || product.localisation === object.localisation) &&
              (!object.zip || product.zip === object.zip) &&
              (!object.nbrpiece || product.nbrpiece === object.nbrpiece) && 
              (!object.surface || product.surface === object.surface)  
              
            );
          });
          dispatch({ type: GET_FILTERED_PRODUCTS, payload: filteredProducts });
        })
        .catch((err) => console.log(err));
    };
  };  



export const getProductsOfRental = (num) => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}/data`)
            // .get('http://localhost:8800/data')
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res.data)
                const products = res.data.filter(item => item.typeOfSale === "louer")
                console.log("🚀 ~ .then ~ products:", products)
                const array = products.slice(0, num)

                dispatch({ type: GET_PRODUCTS_FOR_RENTAL, payload: array });
                })
            .catch((err) => console.log(err))
    }
}

export const getProductsOfBuy = (num) => {
  return (dispatch) => {
      return axios 
          .get(`${process.env.REACT_APP_API_URL}/data`)
          // .get('http://localhost:8800/data')
          .then((res) => {
              console.log("🚀 ~ .then ~ res:", res.data)
              const products = res.data.filter(item => item.typeOfSale === "achat")
              console.log("🚀 ~ .then ~ products:", products)
              const array = products.slice(0, num)

              dispatch({ type: GET_PRODUCTS_FOR_BUY, payload: array });
              })
          .catch((err) => console.log(err))
  }
}