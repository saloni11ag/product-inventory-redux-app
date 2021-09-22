import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import editProductBroadcast from '../../actions/editProductBroadcast';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            categoryname: 'Electronics',
            productname: '',
            productquantity: '',
            productprice: '',
            instock: 'YES',
            errors: {}
        }
    }

    componentWillMount() {
        // console.log(this.props.history.location.state);
        let tempState = this.props.history.location.state
        this.setState({
            id: tempState.id,
            categoryname: tempState.category,
            productname: tempState.name,
            productquantity: tempState.quantity,
            productprice: tempState.price,
            instock: tempState.instock
        })
    }

    changeHandler = (event) => {
        // console.log(event.target.name)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        // console.log(this.state)
        // this.handleValidation();
    }

    handleValidation() {
        let productname = this.state.productname;
        let productquantity = this.state.productquantity
        let productprice = this.state.productprice
        let errors = {};
        let formIsValid = true;
        // console.log(productname);
        //Name
        if (productname.length < 3) {
            formIsValid = false;
            errors["productname"] = "Cannot be less than length 3";
        }

        if (typeof productname !== "undefined") {
            if (!productname.match(/^[a-zA-Z\s]*$/)) {
                formIsValid = false;
                errors["productname"] = "Only letters";
            }
        }

        //productquantity
        if (!productquantity) {
            formIsValid = false;
            errors["productquantity"] = "Cannot be empty";
        }

        if (productquantity === "0") {
            formIsValid = false;
            errors["productquantity"] = "Should be more than 0";
        }

        if (typeof productquantity !== "undefined") {
            if (productquantity.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["productquantity"] = "Only Numbers";
            }
        }
        //productprice
        if (!productprice) {
            formIsValid = false;
            errors["productprice"] = "Cannot be empty";
        }

        if (typeof productprice !== "undefined") {
            if (productprice.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["productprice"] = "Only numbers";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    submitForm =(event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            // console.log("Form submitted");
            this.contactSubmit();
        } else {
            console.log("Form has errors.");
        }
    }

    contactSubmit = (event) => {
        // event.preventDefault();
        let newProduct = {
            "id": this.state.id,
            "category": this.state.categoryname,
            "name": this.state.productname,
            "price": this.state.productprice,
            "quantity": this.state.productquantity,
            "instock": this.state.instock
        }

        // console.log(newProduct);
        this.props.editProduct(newProduct)
        this.props.history.push('/')
    }

    render() {

        return (
            <div>
                <div className="container">
                    <header id="addProduct-header">EDIT PRODUCT</header>
                    <form onSubmit={this.submitForm}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="categoryname">Category Name:</label>
                            </div>
                            <div className="col-75">
                                <select name="categoryname" className="input-select" onChange={this.changeHandler} value={this.state.categoryname}>
                                    <option >Electronics</option>
                                    <option>Accessories</option>
                                    <option>Clothing</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Product Name:</label>
                            </div>
                            <div className="col-75">
                                <input type="text" className="input-text" id="productname" name="productname" autoComplete="off" value={this.state.productname}
                                    placeholder="Enter Product Name.." onChange={this.changeHandler} title="Name should consists of letters and greater than length 3" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productname"]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label >Quantity</label>
                            </div>
                            <div className="col-75">
                                <input type="number" className="input-text" id="productquantity" name="productquantity" autoComplete="off" value={this.state.productquantity}
                                    placeholder="Enter Product Quantity.." onChange={this.changeHandler} title="Quantity should be a number" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productquantity"]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label >Price</label>
                            </div>
                            <div className="col-75">
                                <input type="number" className="input-text" id="productprice" name="productprice" autoComplete="off" value={this.state.productprice}
                                    placeholder="Enter Product Price.." onChange={this.changeHandler} title="Price should be a number" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productprice"]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="instock">In Stock:</label>
                            </div>
                            <div className="col-75">
                                <select name="instock" className="input-select" onChange={this.changeHandler} value={this.state.instock}>
                                    <option >YES</option>
                                    <option>NO</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                    {/* <div className="product-deleted">
                    <span className="closebtn" onClick="this.parentElement.style.display='none';">&times;</span>
                    <strong>Product Deleted</strong>
                </div> */}
                </div>
            </div>
        );
    }
}

function convertPropToEventAndBroadcast(dispatch) {
    return bindActionCreators({
        editProduct: editProductBroadcast
    }, dispatch)
}

export default connect(null, convertPropToEventAndBroadcast)(EditProduct);