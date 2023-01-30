import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../services/appApi'
import axios from '../axios'
import categories from '../categories'

function EditProduct() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [imageToRemove, setImageToRemove] = useState(null)
  const navigate = useNavigate()
  const [
    updateProduct,
    { isError, error, isLoading, isSuccess },
  ] = useUpdateProductMutation()

  useEffect(() => {
    axios
      .get('/products/' + id)
      .then(({ data }) => {
        const product = data.product
        setName(product.name)
        setDescription(product.description)
        setCategory(product.category)
        setImages(product.pictures)
        setPrice(product.price)
      })
      .catch((e) => console.log(e))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !description || !price || !category || !images.length) {
      return alert('Please fill out all the fields')
    }
    updateProduct({ id, name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            alert('cập nhật thành công')
            navigate('/dashboard')
          }, 1500)
        }
      },
    )
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

  return (
    <div className="container">
      <div className="flex flex-row">
        <div>
          <form
            onSubmit={handleSubmit}
            className="form__create--product p-2 w-6/12 "
          >
            <strong className="text-3xl">Cập nhật sản phẩm</strong>
            {isSuccess && <alert variant="success">Cập nhật thành công</alert>}
            {isError && <alert variant="error">Cập nhật thất bại</alert>}
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
              <select className="ml-2 p-2 rounded-md" value={category}>
                <option disabled>Chọn một</option>
                {categories.map((category) => (
                  <option value={category.name}>{category.name}</option>
                ))}
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
