import React from 'react'

function Article(props) {
  const { article } = props
  return (
    <div className="p-4 shadow-sm rounded-lg bg-[#D8E3E7] max-h-max mx-4 my-8 cursor-pointer">
      <img
        variant="top"
        className="shadow-sm rounded-lg big-desktop:max-h-64 desktop:max-h-48 big-tablet:max-h-36 tablet:max-h-24 mb-4 w-full hover:scale-105 ease-in-out duration-300"
        src={article.pictures[0]?.url}
        alt="product-pic"
      />
      <p className="font-bold big-tablet:text-2xl tablet:text-base truncate">
        {article.title}
      </p>
      <div bg="warning" text="dark">
        {article.description}
      </div>
      <div className="truncate">{article.content}</div>
      <p className="big-tablet:text-base tablet:text-sm">Áp dụng từ</p>
      <div className="truncate big-tablet:text-base tablet:text-sm">
        {article.date.slice(0, 10).toString().split("-").reverse().join("-")}{" "}
        đến{" "}
        {article.expire.slice(0, 10).toString().split("-").reverse().join("-")}
      </div>
    </div>
  );
}

export default Article
