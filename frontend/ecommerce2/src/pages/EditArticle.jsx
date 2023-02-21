import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import { useUpdateArticleMutation } from "../services/appApi";
import DatePicker from "react-date-picker";
import { Alert } from "@mui/material";

function EditArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [expire, setExpire] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [updateArticle, { isError, error, isLoading, isSuccess }] =
    useUpdateArticleMutation();

  useEffect(() => {
    axios
      .get("/articles/" + id)
      .then(({ data }) => {
        const article = data.article;
        setTitle(article.title);
        setDescription(article.description);
        setContent(article.content);
        setImages(article.pictures);
        setDate(article.date);
        setExpire(article.expire);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !content || !expire || !images.length) {
      return alert("Vui lòng điền vào form hoặc quay lại");
    }
    updateArticle({
      id,
      title,
      description,
      content,
      images,
      expire,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          alert("cập nhật thành công");
          navigate("/dashboard");
        }, 500);
      }
    });
  };

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzttab71p",
        uploadPreset: "fw0qtksm",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  const handleRemoveImg = (imgObj) => {
    setImageToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
    
    console.log(expire)

    return (
      <>
        <div className="text-center">
          {isSuccess && (
            <Alert
              variant="success"
              className="p-2 text-lg text-emerald-700 bg-emerald-200 border-emerald-700 rounded-lg shadow-sm"
            >
              Cập nhật thành công
            </Alert>
          )}
          {isError && (
            <Alert
              variant="error"
              className="p-2 text-lg text-red-700 bg-red-200 border-red-700 rounded-lg shadow-sm"
            >
              Cập nhật thất bại
            </Alert>
          )}
        </div>
        <div className="container mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="form__create--article p-2 w-full grid grid-cols-5"
              >
                <div className="col-span-2 p-4">
                  <strong className="text-3xl">Chỉnh sửa bài viết</strong>
                  <div>
                    <label>Tiêu đề bài viết</label>
                    <br />
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Nhập tiêu đề"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
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
                    <label>Nội dung</label>
                    <br />
                    <textarea
                      className="w-full h-64"
                      type="text"
                      placeholder="Nhập nội dung"
                      value={content}
                      required
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div md={6}>
                    <label>Ngày đăng</label>
                    <br />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={date}
                      disabled
                      className="w-6/12 bg-white"
                    />
                  </div>
                  <div md={6}>
                    <label>Ngày hết hạn</label>
                    <br />
                    <DatePicker
                      onChange={setExpire}
                      value={
                        typeof expire === "string" ? new Date(expire) : expire
                      }
                    />
                    {date > expire ? <div>Ngày không hợp lệ</div> : null}
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
                      Chọn ảnh thumbnails
                    </button>
                    <div className="p-4 border-spacing-1 border-cyan-700 border-2 grid grid-cols-1 rounded-lg">
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
            </>
          )}
        </div>
      </>
    );
}

export default EditArticle;
