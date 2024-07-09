import React, { useState,useEffect } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


// export class News extends Component { // replace all this.props with props ---- also make this.xyz to xyz
const News = ({ country = 'in', category = 'business', pageSize = 9, setProgress }) => {
    const [articles,setArticles] = useState ([]);
    const [loading,setLoading] = useState (false);
    const [page,setPages] = useState (1);
    const [totalResults,setTotalResults] = useState (1);

    const firstUp = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1
    //     }
    //     document.title = `${this.firstUp(this.props.category)} - My Times`;
    // }

    //async tellme() {
    const tellme = async () => {
        setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=c6f9db0a784c44f88a126b8f1e6101f9&page=${page}&pageSize=${pageSize}`
        setProgress(60);

        // this.setState({ loading: true });
        setLoading(true);

        let data = await fetch(url);
        let parseData = await data.json();
        setProgress(80);

        //this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);

        setProgress(100);
    }

    // async componentDidMount() {
    //     this.tellme();
    // }
    useEffect(() => {
        document.title = `${firstUp(category)} - My Times`;
        tellme();
    },[]);    

    const fetchMoreData = async () => {
        // this.setState((prevState) => ({ page: prevState.page + 1 }), async () => {
        //     const { country, category, pageSize } = props;
        //     const { page } = this.state;
        //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=c6f9db0a784c44f88a126b8f1e6101f9&page=${page}&pageSize=${pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         articles: this.state.articles.concat(parsedData.articles),
        //         totalResults: parsedData.totalResults,
        //     });
        // });

        //                                                 -----or-----

        // this.setState({page: this.state.page + 1})
        // const url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6f9db0a784c44f88a126b8f1e6101f9&page=${this.state.page}&pageSize=${this.props.pageSize};
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults
        // })
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=c6f9db0a784c44f88a126b8f1e6101f9&page=${page + 1}&pageSize=${pageSize}`;
        setPages(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);

    };


    // handleNextpg = async () => {
    //     if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize) )){
    //         this.setState({ page: this.state.page + 1,})}
    //         this.tellme();
    //     }
    // handlePrevpg = async () => {
    //     this.setState({ page: this.state.page - 1,})
    //     this.tellme();
    // }

    // render() {
        return (
            <>
                <h1 className="text-center" style={{marginTop: "60px", textDecoration: "underline", textUnderlineOffset: "10%", textDecorationColor: "red"}}>Today's {firstUp(category)} Headlines </h1>
                {/* {this.state.loading && <Loading />} */}
                

                <InfiniteScroll
                    
                    // dataLength={this.state.articles.length} //This is important field to render the next data
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults} 
                    loader={loading && <Loading/>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    <div className="container">
                    <div className='row'>
                        {articles.map((element) => {
                            return <div className='col-md-4' key={element.url} >
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} src={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                    
                </InfiniteScroll>

                {/* <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <=1}  type="button" className="btn btn-dark btn-lg" onClick={this.handlePrevpg}>&larr; Prev</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark btn-lg" onClick={this.handleNextpg}>Next &rarr;</button>
                </div> */}
            </>
        )
//  }


}

// static defaultProps = {
//     country: 'in',
//     category: "business",
//     pageSize: 9,

// }
// //News.defaultProps = {
// //    country: 'in',
// //    category: "business",
// //    pageSize: 9,
// //}

// static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
// }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
