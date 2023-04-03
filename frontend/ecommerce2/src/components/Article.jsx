import React from "react";

function Article(props) {
  const { article } = props;

  return (
    <div className="shadow-sm rounded-3xl bg-white mx-4 tablet:my-8 small-phone:my-4 cursor-pointer">
      {/* Thumbnail */}
      <div className="card__zoom big-desktop:h-64 desktop:h-56 laptop:h-48 big-phone:h-64 small-phone:h-56 shadow-2xl m-0 rounded-b-none">
        <div
          alt="banner"
          className="card__zoom--image"
          style={{ backgroundImage: `url(${article.pictures[0]?.url})` }}
        />
      </div>

      <div className="p-4">
        {/* Title */}
        <p className="mb-4 font-bold desktop:text-2xl big-tablet:text-xl small-phone:text-2xl truncate">
          {article.title}
        </p>

        {/* Description */}
        <div
          bg="warning"
          className="my-4 px-4 py-2 text-white desktop:text-base big-tablet:text-sm bg-amber-500 max-w-fit rounded-xl shadow-sm"
        >
          {article.description}
        </div>

        {/* Content */}
        <div className="truncate">{article.content}</div>

        <div className="flex big-desktop:flex-row small-phone:flex-col justify-between laptop:items-center small-phone:items-start">
          {/* Start to End */}
          <span className="my-4 big-tablet:text-base tablet:text-sm">
            Áp dụng từ
          </span>
          <span className="truncate big-tablet:text-base tablet:text-sm">
            {/* Start Date */}
            {article.date
              .slice(0, 10)
              .toString()
              .split("-")
              .reverse()
              .join("-")}{" "}
            đến {/* End Date */}
            {article.expire
              .slice(0, 10)
              .toString()
              .split("-")
              .reverse()
              .join("-")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Article;
