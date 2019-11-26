import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import ReactLoading from 'react-loading';

function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 500); // it takes 2 seconds to make coffee
  });
}

export default class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo_business: props.location.state["query_result"][1],
      businesses: props.location.state["query_result"][0],
      isLoad: true,
    }
  }

  componentDidMount() {
    document.title = 'YelpImageSearch';
  }

  // Fetches our GET route from the Express server.
  render() {
    const imagePath = process.env.PUBLIC_URL;
    if (!this.state.isLoad) {
      return <div> </div>
    } else {
      return (
        <div className="Result">
          <header className="Result-header">
          <h1 className="Result-title">Here are your Restaurant!</h1>
          </header>
          <div>

          <div className="row">
                 <div className="col-12 mt-3">
                     <div className="card">
                         <div className="card-horizontal">
                             <div className="img-square-wrapper">
                                 <img src={`${imagePath}\/input_image\/input_file.png`} alt="input" height='300' weight='500'/>
                             </div>
                             <div className="card-body">
                                 <h4 className="card-title">Input Image</h4>
                                 <p className="card-text">Label: Food</p>
                                 <p className="card-text">State: NV</p>
                                 <p className="card-text">City: Las Vegas</p>
                             </div>
                         </div>
                         <div className="card-footer">
                             <small className="text-muted"></small>
                         </div>
                     </div>
                 </div>
             </div>

             {this.state.businesses.map((business, index) => {
               var photo = this.state.photo_business.filter((obj) => { return obj.business_id === business.business_id})[0];
               return(
               <div className="row" key={business.business_id}>
                      <div className="col-12 mt-3">
                          <div className="card">
                              <div className="card-horizontal">
                                  <div className="img-square-wrapper">
                                      <img src={`${imagePath}\/images\/` + `${photo.photo_name}`} alt="input" height='300' weight='500'/>
                                  </div>
                                  <div className="card-body">
                                      <h4 className="card-title">Restaurant: {business.name}</h4>
                                      <p className="card-text">Stars: {business.stars}</p>
                                      <p className="card-text">Address: {business.address}</p>
                                      <p className="card-text">Categories: {business.categories}</p>
                                      <a href={`https://www.yelp.com/search?find_desc=${business.name}&find_loc=NV`} target="_blank">Search in Yelp</a>
                                  </div>
                              </div>
                              <div className="card-footer">
                                  <small className="text-muted"></small>
                              </div>
                          </div>
                      </div>
                  </div>);

             })}
          </div>
      </div>
    );
  }
}
}
