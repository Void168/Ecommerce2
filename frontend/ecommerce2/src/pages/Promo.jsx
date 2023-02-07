import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import Article from '../components/Article'
import { updateArticles } from '../features/articleSlice'
import Loading from '../components/Loading'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

function Promo() {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('/articles').then(({ data }) => dispatch(updateArticles(data)))
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  console.log(articles)
  return (
    <div className="container mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3">
          {page === 1 ? (
            <>
              {articles.slice(0, 6).map((newArticle) => (
                <Article
                  {...newArticle}
                  key={newArticle._id}
                  article={newArticle}
                  className="col-span-1"
                />
              ))}
            </>
          ) : (
            <>
              {articles.slice(6 * (page - 1), 6 * page).map((newArticle) => (
                <Article
                  {...newArticle}
                  key={newArticle._id}
                  article={newArticle}
                  className="col-span-1"
                />
              ))}
            </>
          )}
        </div>
      )}
      <Stack spacing={2} className="p-1 rounded-lg mt-4">
        <Pagination
          count={Math.round(articles.length / 6)}
          color="primary"
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </div>
  )
}

export default Promo
