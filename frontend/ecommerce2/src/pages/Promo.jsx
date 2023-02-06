import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import Article from '../components/Article'
import { updateArticles } from '../features/articleSlice'
import Loading from '../components/Loading'

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
    <>
      {articles.slice(0, 8).map((newArticle) => (
        <Article {...newArticle} key={newArticle._id} article={newArticle} />
      ))}
    </>
  )
}

export default Promo
