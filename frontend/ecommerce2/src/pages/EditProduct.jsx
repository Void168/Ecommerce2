import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation } from '../services/appApi'
import axios from '../axios'
import categories from '../categories'
import Loading from '../components/Loading'

function EditProduct() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [imageToRemove, setImageToRemove] = useState(null)
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="container mx-auto">
      {
        error && <Loading />
      }
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row">
            <form
              onSubmit={handleSubmit}
              className="form__create--product p-2 w-full grid grid-cols-5"
            >
              <div className="col-span-2 p-4">
                <strong className="text-3xl">Tạo sản phẩm mới</strong>
                {isSuccess && (
                  <alert variant="success">Tạo sản phẩm thành công</alert>
                )}
                {isError && (
                  <alert variant="error">Tạo sản phẩm thất bại</alert>
                )}
                <div>
                  <label>Tên sản phẩm</label>
                  <br />
                  <input
                    className="w-full"
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
                    className="w-full"
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
                    className="w-full"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
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
                    {categories.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="bg-[#132C33] mx-2 my-4 text-xl"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
              <div className="col-span-3 p-4">
                <div className="text-center">
                  <button onClick={showWidget} className="bg-[#132C33]">
                    Chọn ảnh
                  </button>
                  <div className="p-4 border-spacing-1 border-cyan-700 border-2 grid grid-cols-3 rounded-lg">
                    {images.map((image) => (
                      <div>
                        <img
                          src={image.url}
                          alt=""
                          className="w-64 h-64 shadow-sm rounded-lg mx-4"
                        />
                        {imageToRemove !== image.public_id && (
                          <span>
                            <i
                              className="fa fa-times-circle"
                              onClick={() => handleRemoveImg(image)}
                            ></i>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default EditProduct
