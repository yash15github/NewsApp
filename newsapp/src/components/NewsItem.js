import React from 'react'
import "./Navitem.css"

// export class NewsItem extends Component {
const  NewsItem = (props) => {

    //render() {
        let { title, description, imageUrl, newsUrl, author, date, src } = props//this.props;
        return (
            <div>
                <div className="card my-3 " >
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '5px', top: '5px'}}>
                        <span className="badge rounded-pill bg-dark"> {src?src:"Unknown"} </span>
                    </div>

                    <img src={!imageUrl ? "https://cdn.vectorstock.com/i/500p/83/82/no-data-found-concept-for-websites-landing-pages-vector-48108382.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-newtext"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toTimeString}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btm-sm btn-danger">Read More</a>
                    </div>
                </div>

            </div>
        )
    //}
}

export default NewsItem
