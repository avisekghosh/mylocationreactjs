import React, { Component } from "react";
import { storageGetData, storageSetData } from "../helper/Storage";

class Location extends Component {
  constructor() {
    super();
    // let locData = [
    //   {
    //     name: "SaltLake",
    //     address: "424/1 bidhan pally",
    //     lat: "62.6",
    //     long: "72.5",
    //     category: "Home"
    //   }
    // ];
    let locData = [];
    this.state = { locData: locData, isCatLocation: false, categoryName: null };
  }

  componentDidMount() {
    let locData = storageGetData("location");
    const {
      match: {
        params: { categoryName }
      }
    } = this.props;
    if (categoryName !== undefined) {
      this.setState({
        isCatLocation: true,
        categoryName: categoryName
      });
      const filterLocData = locData.filter(
        (item, index) => item.category === categoryName
      );
      this.setState({ locData: filterLocData });
    } else {
      this.setState({ locData: locData });
    }
  }

  handleRemove(itemIndex) {
    let locData = this.state.locData;
    const updatedLocData = locData.filter((item, index) => index !== itemIndex);
    storageSetData("location", updatedLocData);
    this.setState({ locData: updatedLocData });
  }

  render() {
    return (
      <div className="container mt-5" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col">
            <h1>
              Location List {this.state.isCatLocation && "for "}
              <strong style={{ color: "red" }}>
                {" "}
                {this.state.categoryName}{" "}
              </strong>
              <i className="fa fa-map-marker" aria-hidden="true" />
            </h1>
            <table className="table mt-3">
              <thead className="thead-dark">
                <tr>
                  <th colSpan="2">Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.locData.length > 0 ? (
                  this.state.locData.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>
                        {item.name}{" "}
                        <a
                          target="_blank"
                          href={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            item.lat +
                            "," +
                            item.long
                          }
                        >
                          Link to map
                        </a>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div class="btn-group">
                          <a
                            href={"/location-detail/" + itemIndex}
                            class="btn btn-success"
                          >
                            <i className="fa fa-eye" aria-hidden="true" />{" "}
                            Location Detail
                          </a>
                          <a
                            href={"/edit-location/" + itemIndex}
                            class="btn btn-primary"
                          >
                            <i className="fa fa-edit" aria-hidden="true" /> Edit
                          </a>
                          <a
                            href="#"
                            class="btn btn-danger"
                            onClick={() => this.handleRemove(itemIndex)}
                          >
                            <i className="fa fa-minus" aria-hidden="true" />{" "}
                            Remove
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No location added{" "}
                      <a
                        href="/add-location"
                        className="btn btn-sm btn-success"
                      >
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                        location
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
