import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: "business",
        pageSize: 9,
        
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42f6309c6d2488ca4d2e72f9a2f5883&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    }

    handleNextpg = async () => {
        if (this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize) ){
        }else{
            let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42f6309c6d2488ca4d2e72f9a2f5883&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
            this.setState({loading: true});
            let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
        }
    }
    handlePrevpg = async () => {
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b42f6309c6d2488ca4d2e72f9a2f5883&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
        
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">Today's News Headlines</h1>
                {this.state.loading && <Loading/>}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col md-4' key={element.url} >
                            <NewsItem title={element.title? element.title: ""} description={element.description? element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <=1}  type="button" className="btn btn-dark btn-lg" onClick={this.handlePrevpg}>&larr; Prev</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark btn-lg" onClick={this.handleNextpg}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
