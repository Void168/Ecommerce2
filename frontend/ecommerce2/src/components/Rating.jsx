import React from "react";

function Rating(props) {
  const { rating } = props;
  return (
    <>
      <div className="text-[#51C4D3] laptop:text-base big-tablet:text-xs tablet:text-base big-phone:text-xs small-phone:text-sm">
        {rating <= 0 && (
          <>
            <span>
              <i className="fa-regular fa-star" />
            </span>
            <span>
              <i className="fa-regular fa-star" />
            </span>
            <span>
              <i className="fa-regular fa-star" />
            </span>
            <span>
              <i className="fa-regular fa-star" />
            </span>
            <span>
              <i className="fa-regular fa-star" />
            </span>
          </>
        )}

        <span>
          <i
            className={
              rating >= 1
                ? "fas fa-star"
                : rating >= 0.1
                ? "fas fa-star-half-alt"
                : "fa fa-star-o"
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? "fas fa-star"
                : rating >= 1.1
                ? "fas fa-star-half-alt"
                : "fa fa-star-o"
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? "fas fa-star"
                : rating >= 2.1
                ? "fas fa-star-half-alt"
                : "fa fa-star-o"
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? "fas fa-star"
                : rating >= 3.1
                ? "fas fa-star-half-alt"
                : "fa fa-star-o"
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? "fas fa-star"
                : rating >= 4.1
                ? "fas fa-star-half-alt"
                : "fa fa-star-o"
            }
          />
        </span>
        <br />
      </div>
    </>
  );
}

export default Rating;
