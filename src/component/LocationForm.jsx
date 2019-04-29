import React, { Component } from "react";
import { storageGetData, storageSetData } from "../helper/Storage";
class LocationForm extends Component {
  constructor(props) {
    super();
    this.state = {
      fields: {},
      errors: {},
      isEdit: false,
      locIndex: null,
      formData: {
        name: ""
      },
      category: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const categoryData = storageGetData("category");
    this.setState({ category: categoryData });

    const {
      match: {
        params: { locIndex }
      }
    } = this.props;
    if (locIndex !== undefined) {
      const locData = storageGetData("location");
      //outofbound fix will do later
      const editContent = locData[locIndex];
      this.setState({
        isEdit: true,
        formData: editContent,
        fields : editContent,
        locIndex: locIndex
      });
      // this.validateForm();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let blankFormData = {
        name: "",
        address: "",
        lat: "",
        long: "",
        category: ""
      };
      let locData = [];
      locData = storageGetData("location");
      if (this.state.isEdit) {
        locData[this.state.locIndex] = this.state.fields;
      } else {
        locData.push(this.state.fields);
      }

      locData.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      storageSetData("location", locData);
      let fields = {};
      this.setState({ fields: fields, formData: blankFormData });
      alert("location added");
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let regCoord = new RegExp("^-?([1-8]?[1-9]|[1-9]0).{1}d{1,6}");

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Please enter location name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (
        !fields["name"].match(/^[a-zA-Z0-9 ]*$/) ||
        fields["name"].length < 3
      ) {
        formIsValid = false;
        errors["name"] = "Name must be min 3 character";
      }
    }

    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "Please enter address.";
    }

    if (typeof fields["address"] !== "undefined") {
      if (fields["address"].length < 5) {
        formIsValid = false;
        errors["address"] = "Address must be min 5 character";
      }
    }

    if (!fields["lat"]) {
      formIsValid = false;
      errors["lat"] = "Please enter latitude.";
    }

    if (typeof fields["lat"] !== "undefined") {
      if (!this.isLatitude(parseFloat(fields["lat"]))) {
        formIsValid = false;
        errors["lat"] = "Please enter valid latitude";
      }
    }

    if (!fields["long"]) {
      formIsValid = false;
      errors["long"] = "Please enter longitude.";
    }

    if (typeof fields["long"] !== "undefined") {
      if (!this.isLongitude(parseFloat(fields["long"]))) {
        formIsValid = false;
        errors["long"] = "Please enter valid longitude";
      }
    }

    if (!fields["category"]) {
      formIsValid = false;
      errors["category"] = "Please select category.";
    }

    if (typeof fields["category"] !== "undefined") {
      if (fields["category"] === "") {
        formIsValid = false;
        errors["category"] = "Please select category.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    let formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({
      fields: fields,
      formData: formData
    });
    this.validateForm();
  }

  isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }

  isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 180;
  }

  render() {
    console.log(Object.values(this.state.errors), this.state.errors);
    return (
      <div className="container" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col mt-5" style={{ marginBottom: "80px" }}>
            <h2>{this.state.isEdit ? "Edit" : "Add"} Location</h2>

            {Object.values(this.state.errors).map((item, index) => (
              <div class="alert alert-danger">
                <strong>X</strong> {item}
              </div>
            ))}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Location Name</label>
                <input
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Location Name"
                  name="name"
                  required
                  minLength="3"
                  value={this.state.formData.name}
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Address</label>
                <input
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter Location address"
                  name="address"
                  required
                  minLength="3"
                  value={this.state.formData.address}
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Coordinates (lat)</label>
                <input
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                  type="number"
                  className="form-control"
                  id="lat"
                  placeholder="Enter latitude"
                  name="lat"
                  required
                  step="any"
                  minLength="3"
                  value={this.state.formData.lat}
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Coordinates (long)</label>
                <input
                  onChange={this.handleChange}
                  onKeyUp={this.handleChange}
                  type="number"
                  className="form-control"
                  id="long"
                  placeholder="Enter longitude"
                  name="long"
                  required
                  step="any"
                  minLength="3"
                  value={this.state.formData.long}
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Select Category</label>
                <select
                  onChange={this.handleChange}
                  className="form-control"
                  id="category"
                  name="category"
                  required
                  value={this.state.formData.category}
                >
                  <option value="">Select Category</option>
                  {this.state.category.length > 0
                    ? this.state.category.map((item, itemIndex) => (
                        <option key={itemIndex}>{item.name}</option>
                      ))
                    : ""}
                </select>
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please select a category.
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                {this.state.isEdit ? "Edit" : "Add"} Location
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationForm;
