import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductItemLouer({ product }) {
    
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(!isLoading)
      }, [product])
    
  return (
    <Card key={product.id} style={{ width: '280px' }}>
    <Card.Img variant="top" src={product.picture[0]} style={{ width: '280px', height: '200px' }} />
    <Card.Body>
      <Card.Title>{product.type}</Card.Title>
      <Card.Text>
        {product.description.substring(1, 97) + '...'}
      </Card.Text>
      <Card.Text>
        type de vente : {product.typeOfSale}
      </Card.Text>
      <Link to={`/achat/products/${product.id}`}>
        <Button variant="primary">Détails</Button>
      </Link>
    </Card.Body>
  </Card>
)
}

export default ProductItemLouer