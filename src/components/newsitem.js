import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  return (
    <div className="card news-card">
      <img
        src={
          imageUrl || "https://placehold.co/500x300/2c2c2c/a0a0a0?text=No+Image"
        }
        className="card-img-top news-card-image"
        alt="news"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm read-more-btn mt-auto"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
