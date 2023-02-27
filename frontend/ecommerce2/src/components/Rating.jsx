import React from "react";

function Rating(props) {
  const { rating } = props;
  return (
    <>
      <div className="text-cyan-600">
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
                : rating >= 0.5
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
                : rating >= 1.5
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
                : rating >= 2.5
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
                : rating >= 3.5
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
                : rating >= 4.5
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
