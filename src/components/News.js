import React, { Component } from 'react';
import NewsItem from './newsitem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 18,  // Set the page size to 18
    };
  }

  async componentDidMount(){
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ed706b8b7a9848b1b7db1e3802eacb32&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.componentDidMount);
    }
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, this.componentDidMount);
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsPortal - Top Headlines</h1>
        {this.state.loading && <p>Loading...</p>}
        <div className="row">
          {this.state.articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem 
                key={article.url} 
                title={article.title ? article.title : ""} 
                description={article.description ? article.description : ""} 
                imageUrl={article.urlToImage} 
                newsUrl={article.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button 
            disabled={this.state.page <= 1} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
