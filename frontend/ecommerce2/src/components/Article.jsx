import React from 'react'
import { Link } from 'react-router-dom'

function Article(props) {
  const { article } = props
  return (
    <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full min-h-xl">
      <img
        variant="top"
        className="shadow-sm rounded-lg max-h-84 mb-4 w-full"
        src={article.pictures[0]?.url}
        alt="product-pic"
      />
      <h1 className="font-bold truncate">{article.title}</h1>
      <div bg="warning" text="dark">
        {article.description}
      </div>
      <div>{article.content}</div>
      <div>
        {article.date} - {article.expire}
      </div>
    </div>
  )
}

export default Article
