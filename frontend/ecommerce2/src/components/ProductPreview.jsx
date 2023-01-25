import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductPreview({ _id, name, category, pictures }) {
  return (
    <Link to={`{/products/${_id}}`}>
      <Card>
        <Card.Body>
          <Card.Img variant="top" className="" src={pictures[0].url}>
            <Card.Title>{name}</Card.Title>
            <Badge bg="warning" text="dark">
              {category}
            </Badge>
          </Card.Img>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ProductPreview
