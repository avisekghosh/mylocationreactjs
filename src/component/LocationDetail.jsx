import React, { Component } from "react";
import { storageGetData, storageSetData } from "../helper/Storage";
import "bootstrap/dist/css/bootstrap.css";
import Iframe from "react-iframe";

class IframeHolder extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Helllo</h1>
        {/* {this.props.data} */}
        <div dangerouslySetInnerHTML={this.props.iframeData} />
      </div>
    );
  }
}

class LocationDetail extends Component {
  constructor() {
    super();
    // let categoryData = [{ id: 21312, name: "Work" }, { id: 222, name: "Home" }];
    let locData = storageGetData("location");
    this.state = {
      isLocIndex: false,
      locIndex: null,
      locData: locData,
      locDetail: null
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { locIndex }
      }
    } = this.props;
    if (locIndex !== undefined) {
      this.setState({
        isLocIndex: true,
        locIndex: locIndex,
        locDetail: this.state.locData[locIndex]
      });
    }
  }
  render() {
    if (this.state.locDetail === null) {
      return <h1>No data found</h1>;
    } else {
      console.log(this.state.locDetail);
      // const iframeHolder = d => {
      //   return (
      //     <div>
      //       <div dangerouslySetInnerHTML={d} />
      //     </div>
      //   );
      // };
      const mapLink =
        "https://www.google.com/maps/search/?api=1&query=" +
        this.state.locDetail.lat +
        "," +
        this.state.locDetail.long;

      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <div
                className="jumbotron jumbotron-fluid"
                style={{ textAlign: "left" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <h2>Name</h2>
                      <p>{this.state.locDetail.name}</p>
                      <h2>Address</h2>
                      <p>{this.state.locDetail.address}</p>
                      <h2>Coord</h2>
                      <p>
                        ({this.state.locDetail.lat},{this.state.locDetail.long})
                      </p>
                      <h2>Category</h2>
                      <p>{this.state.locDetail.category}</p>
                    </div>
                    <div className="col-md-6">
                      <div class="btn-group">
                        <a
                          className="btn btn-warning btn-lg"
                          target="_blank"
                          href={mapLink}
                        >
                          <i class="fa fa-thumb-tack" aria-hidden="true" /> See
                          on map
                        </a>

                        <a className="btn btn-danger btn-lg" href="/location">
                          <i class="fa fa-chevron-left" aria-hidden="true" />{" "}
                          Back to location list
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <div className="container">
        //   <div className="row">
        //     <div className="col-md-4">
        //       <div className="card" style={{ width: "400px" }}>
        //         <div className="card-body">
        //           <h4 className="card-title">John Doe</h4>
        //           <p className="card-text">Some example text.</p>
        //           <a href="#" className="btn btn-primary">
        //             See Profile
        //           </a>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="col-md-8">
        //       <Iframe
        //         url={mapLink}
        //         width="450px"
        //         height="450px"
        //         id="myId"
        //         className="myClassname"
        //         display="initial"
        //         position="relative"
        //       />
        //     </div>
        //   </div>
        // </div>
      );
    }
  }
}

export default LocationDetail;
