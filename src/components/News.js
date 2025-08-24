import React, { useState, useEffect } from "react";
import NewsItem from "./newsitem";

const categories = [
  "Top Stories",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Technology");

  const apiKey = "ed706b8b7a9848b1b7db1e3802eacb32";

  const fetchNews = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory.toLowerCase()}&apiKey=${apiKey}&page=${page}&pageSize=18`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, page]);

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset page to 1 when changing category
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="container mt-4">
      {/* Category Tabs */}
      <div className="newshub-category-tabs mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn nav-link ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Post Section */}
      {featuredArticle && (
        <div className="featured-section mb-5">
          <img
            className="featured-image"
            src={
              featuredArticle.urlToImage ||
              "https://placehold.co/1200x600/f0f2f5/6c757d?text=No+Image"
            }
            alt={featuredArticle.title}
          />
          <div className="featured-overlay">
            <div className="featured-content">
              <span className="featured-tag">FEATURED</span>
              <h1 className="featured-title">{featuredArticle.title}</h1>
              <p className="featured-description">
                {featuredArticle.description}
              </p>
              <div className="featured-metadata">
                <span>{featuredArticle.source.name}</span>
                <span className="mx-2">|</span>
                <span>
                  {new Date(featuredArticle.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other News Articles Grid */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="fs-4">{selectedCategory} News</h2>
        <button className="btn refresh-btn" onClick={fetchNews}>
          Refresh
        </button>
      </div>

      <div className="row news-grid-container">
        {otherArticles.map((article, index) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              newsUrl={article.url}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mb-5">
        <button
          disabled={page <= 1}
          type="button"
          className="btn page-btn"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn page-btn"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default News;
