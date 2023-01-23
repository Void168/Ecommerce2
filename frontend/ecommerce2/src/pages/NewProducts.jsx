import React, { useState } from 'react'
import { Alert, Col, Container, Row, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useCreateProductMutation } from '../services/appApi'

function NewProducts() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [imageToRemove, setImageToRemove] = useState(null)
  const navigate = useNavigate()
  const [
    createProduct,
    { isError, error, isLoading, isSuccess },
  ] = useCreateProductMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !description || !price || !category || !images.length) {
      return alert('Please fill out all the fields')
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }
      },
    )
  }

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzttab71p',
        uploadPreset: 'fw0qtksm',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ])
        }
      },
    )
    widget.open()
  }

  const handleRemoveImg = (imgObj) => {
    setImageToRemove(imgObj.public_id)
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null)
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id),
        )
      })
      .catch((e) => console.log(e))
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            className="form__create--product p-2 w-6/12 "
          >
            <strong className="text-3xl">Tạo sản phẩm mới</strong>
            {isSuccess && (
              <Alert variant="sucess">Tạo sản phẩm thành công</Alert>
            )}
            {isError && <Alert variant="error">Tạo sản phẩm thất bại</Alert>}
            <div>
              <label>Tên sản phẩm</label>
              <br />
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
              <br />
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
              <br />
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
              <br />
              <select className="ml-2 p-2 rounded-md">
                <option disabled>Chọn một</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div>
              <button onClick={showWidget} className="bg-[#132C33]">
                Chọn ảnh
              </button>
              <div>
                {images.map((image) => (
                  <div className="p-4 border-spacing-1 border-cyan-700 border-2">
                    <img
                      src={image.url}
                      alt=""
                      className="w-64 h-64 shadow-sm rounded-lg"
                    />
                    {imageToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="bg-[#132C33]"
            >
              Xác nhận
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewProducts
