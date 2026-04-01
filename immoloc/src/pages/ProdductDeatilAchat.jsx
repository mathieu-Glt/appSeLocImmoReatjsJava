import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../actions/imo.actions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Carousel from 'react-bootstrap/Carousel';

function ProdductDeatilAchat() {
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const id = params.id;
    console.log("🚀 ~ ProdductDeatilAchat ~ id:", id)
    const product = useSelector(state => state.imoReducer.product);
    console.log("🚀 ~ ProdductDeatilAchat ~ product:", product)
    const [isLoading, setIsLoading] = useState(true);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        dispatch(getProductById(id)); // Dispatch l'action pour récupérer le produit par ID
    }, [dispatch, id]); // Ajoutez [dispatch, id] comme dépendance pour que l'effet s'exécute lorsque l'ID change

    useEffect(() => {
        if (product !== null) {
            setIsLoading(false);
        }
    }, [product]);

    const handleGoBack = () => {
        navigate(-1)
    }




  return (
    <div style={{ backgroundImage: 'url(../../public/images/imo.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%'}}>
    <Button style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={handleGoBack}>Retour</Button>
    {isLoading ? (
        <i className='fas fa-spinner fa-spin'></i> 
    ) : (
        product ? (
            <Card className="mx-auto my-5" style={{ width: '48rem' }}>
                 <Carousel activeIndex={index} onSelect={handleSelect}>
                    {product.picture.map((pict, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                className="d-block w-100 h-50"
                                src={'../' + pict}
                                alt={`Slide ${idx}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Body>
                    <Card.Title>{product.type}</Card.Title>
                    <Card.Text>
                        <strong>description :</strong> {product.description}
                    </Card.Text>
                    <Card.Text>
                        <strong>prix / m² :</strong> {product.price}
                    </Card.Text>
                    <Card.Text>
                        <strong>surface :</strong> {product.surface}
                    </Card.Text>
                    <Card.Text>
                        <strong>type de vente :</strong> {product.typeOfSale}
                    </Card.Text>
                    <Card.Text>
                        <strong>localisation :</strong> {product.localisation}
                    </Card.Text>
                    <Card.Text>
                        <strong>code postal :</strong> {product.zip}
                    </Card.Text>
                    <Card.Text>
                        Contactez notre agence au : 0123456789
                    </Card.Text>


                </Card.Body>
            </Card>
        ) : (
            <p>Aucun produit trouvé</p>
        )
    )}
</div>

  )
}

export default ProdductDeatilAchat