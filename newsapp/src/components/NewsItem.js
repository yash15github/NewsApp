import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div>
                <div className= "card my-3" style={{width: "18rem"}}>
                    <img src={!imageUrl ? "https://cdn.vectorstock.com/i/500p/83/82/no-data-found-concept-for-websites-landing-pages-vector-48108382.jpg" : imageUrl} className= "card-img-top" alt="..."/>
                        <div className= "card-body">
                            <h5 className= "card-title">{title}...</h5>
                            <p className= "card-text">{description}...</p>
                            <a href={newsUrl} target="_blank" className= "btn btm-sm btn-primary">Read More</a>
                        </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
