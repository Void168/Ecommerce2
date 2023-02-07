import React from 'react'
import { Link } from 'react-router-dom'

function Article(props) {
  const { article } = props
  return (
    <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] min-h-xl mx-4 my-8 cursor-pointer">
      <img
        variant="top"
        className="shadow-sm rounded-lg max-h-64 mb-4 w-full hover:scale-105 ease-in-out duration-300"
        src={article.pictures[0]?.url}
        alt="product-pic"
      />
      <p className="font-bold text-2xl">{article.title}</p>
      <div bg="warning" text="dark">
        {article.description}
      </div>
      <div className="truncate">{article.content}</div>
      <p>Áp dụng từ</p>
      <div>
        {article.date.slice(0, 10).toString().split('-').reverse().join('-')}{' '}
        đến{' '}
        {article.expire.slice(0, 10).toString().split('-').reverse().join('-')}
      </div>
    </div>
  )
}

export default Article
