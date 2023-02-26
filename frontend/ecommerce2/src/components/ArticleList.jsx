import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteArticleMutation } from "../services/appApi";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Article from "./Article";

function ArticleList() {
  const articles = useSelector((state) => state.articles);
  const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
  const [deleteArticle, { isLoading, isSuccess }] = useDeleteArticleMutation();
  const [page, setPage] = useState(1);

  const handleDeleteArticle = (id) => {
    if (window.confirm("Chắc chắn xóa bài viết này?")) {
      deleteArticle({ article_id: id, user_id: user._id });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  return (
    <>
      <p className="tablet:hidden small-phone:block h-screen">
        Vui lòng sử dụng thiết bị lớn hơn để quản lý
      </p>
      <div className="container mx-auto flex flex-col items-center w-full small-phone:hidden tablet:block ">
        <div className="text-center">
          <button className="bg-[#132C33] button">
            <Link to="/new-article">Tạo bài viết mới</Link>
          </button>
        </div>
        <div className="container mx-auto max-h-max">
          <div className="grid laptop:grid-cols-3 tablet:grid-cols-2">
            {page === 1 ? (
              <>
                {articles.slice(0, 6).map((newArticle) => (
                  <div>
                    <Article
                      {...newArticle}
                      key={newArticle._id}
                      article={newArticle}
                      className="laptop:col-span-1"
                    />
                    <div className="grid grid-cols-2 justify-around mt-6">
                      <button
                        onClick={() =>
                          handleDeleteArticle(newArticle._id, user._id)
                        }
                        disabled={isLoading}
                        className="bg-[#132C33] mx-2 laptop:text-base tablet:text-xs button"
                      >
                        Xóa bài viết
                      </button>
                      <button className="bg-[#132C33] mx-2 laptop:text-base tablet:text-xs button">
                        <Link to={`/article/${newArticle._id}/edit`}>
                          Chỉnh sửa
                        </Link>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {articles.slice(8 * (page - 1), 8 * page).map((newArticle) => (
                  <>
                    <Article
                      {...newArticle}
                      key={newArticle._id}
                      article={newArticle}
                      className="col-span-1"
                    />
                    <div className="flex flex-row">
                      <button
                        onClick={() =>
                          handleDeleteArticle(newArticle._id, user._id)
                        }
                        disabled={isLoading}
                        className="bg-[#132C33] button"
                      >
                        Xóa bài viết
                      </button>
                      <button className="bg-[#132C33] mt-6 button">
                        <Link to={`/articles/${newArticle._id}/edit`}>
                          Chỉnh sửa
                        </Link>
                      </button>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>

        <Stack spacing={2} className="p-1 rounded-lg mt-4">
          <Pagination
            count={Math.round(articles.length / 8)}
            color="primary"
            onChange={(e, value) => setPage(value)}
          />
        </Stack>
      </div>
    </>
  );
}

export default ArticleList;
