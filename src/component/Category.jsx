import React, { Component } from "react";
import { storageGetData, storageSetData } from "../helper/Storage";

class Category extends Component {
  constructor() {
    super();
    // let categoryData = [{ id: 21312, name: "Work" }, { id: 222, name: "Home" }];
    let categoryData = [];
    this.state = {
      categoryData: categoryData
    };
  }

  componentDidMount() {
    // need to fix

    this.setState({ categoryData: storageGetData() });
  }

  handleRemove(itemIndex) {
    let categoryData = this.state.categoryData;
    const catName = categoryData[itemIndex];
    const updatedCategoryData = categoryData.filter(
      (item, index) => index !== itemIndex
    );
    let locData = storageGetData("location");
    const updateLocationData = locData.filter(
      (item, index) => item.category !== catName.name
    );
    storageSetData("category", updatedCategoryData);
    storageSetData("location", updateLocationData);
    this.setState({ categoryData: updatedCategoryData });
  }

  render() {
    return (
      <div className="container mt-5" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col" style={{ marginBottom: "50px" }}>
            <h1>
              Category List <i className="fa fa-list-alt" aria-hidden="true" />
            </h1>
            <table className="table mt-3">
              <thead className="thead-dark">
                <tr>
                  <th colSpan="2">Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categoryData.length > 0 ? (
                  this.state.categoryData.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td style={{ textAlign: "right" }}>
                        <div class="btn-group">
                          <a
                            href={"/view-category-location/" + item.name}
                            class="btn btn-success"
                          >
                            <i className="fa fa-eye" aria-hidden="true" /> View
                            location
                          </a>
                          <a
                            href={"/edit-category/" + itemIndex}
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
                      No category added{" "}
                      <a
                        href="/add-category"
                        className="btn btn-sm btn-success"
                      >
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                        Category
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

export default Category;
