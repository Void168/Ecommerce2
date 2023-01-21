import React from 'react'
import { useState } from 'react'
import { Alert, Col, Container, Row, Form } from 'react-bootstrap'
import { useNavigation } from 'react-router-dom'
import { useCreateProductMutation } from '../services/appApi'

function NewProducts() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [imgToRemove, setImageToRemove] = useState(null)
  // const navigate = useNavigation()
  const [
    createProduct,
    { isError, error, isLoading, isSuccess },
  ] = useCreateProductMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: '',
        uploadPreset: '',
      },
      (error, result) => {
        if (!error && result.event === 'sucess') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ])
        }
      },
    )
    widget.open()
  }
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h1>Tạo sản phẩm mới</h1>
            {isSuccess && (
              <Alert variant="sucess">Tạo sản phẩm thành công</Alert>
            )}
            {isError && <Alert variant="error">Tạo sản phẩm thất bại</Alert>}
            <div>
              <label>Tên sản phẩm</label>
              <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Mô tả</label>
              <input
                as="textarea"
                placeholder="Nhập mô tả"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Giá tiền</label>
              <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div onChange={(e) => setCategory(e.target.value)}>
              <label>Danh mục</label>
              <select>
                <option disabled>Chọn một</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div>
              <button onClick={showWidget}>Chọn ảnh</button>
              <div>
                {images.map((image) => (
                  <div>
                    <img src={images.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" disabled={isLoading || isSuccess}>
              Xác nhận
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewProducts
