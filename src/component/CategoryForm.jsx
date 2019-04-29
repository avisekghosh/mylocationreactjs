import React, { Component } from "react";
import { storageGetData, storageSetData } from "../helper/Storage";
class CategoryForm extends Component {
  constructor(props) {
    super();
    this.state = {
      fields: {},
      errors: {},
      isEdit: false,
      catIndex: null,
      formData: {
        name: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { catIndex }
      }
    } = this.props;
    if (catIndex !== undefined) {
      const categoryData = storageGetData("category");
      //outofbound fix will do later
      const editContent = categoryData[catIndex];

      this.setState({
        isEdit: true,
        formData: editContent,
        fields: editContent,
        catIndex: catIndex
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      console.log(this.state);
      let categoryData = [];
      categoryData = storageGetData("category");
      console.log(categoryData);
      if (this.state.isEdit) {
        categoryData[this.state.catIndex] = this.state.fields;
      } else {
        categoryData.push(this.state.fields);
      }

      categoryData.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      storageSetData("category", categoryData);
      let fields = {};
      this.setState({ fields: fields, formData: { name: "" } });
      alert("categoryAdded");
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "* Please enter category name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/) || fields["name"].length < 3) {
        formIsValid = false;
        errors["name"] =
          "Please enter alphabet characters only with min 3 character";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  handleChange(e) {
    this.validateForm();
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({
      fields: fields,
      formData: formData
    });
  }

  render() {
    return (
      <div className="container" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col mt-5">
            <h2>{this.state.isEdit ? "Edit" : "Add"} Category</h2>
            {Object.values(this.state.errors).map((item, index) => (
              <div class="alert alert-danger">
                <strong>X</strong> {item}
              </div>
            ))}
            <form className="" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="uname">Category Name</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Category Name"
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
              <button type="submit" className="btn btn-primary">
                {this.state.isEdit ? "Edit" : "Add"} Category
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryForm;
