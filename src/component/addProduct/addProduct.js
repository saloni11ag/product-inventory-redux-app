import React, { Component } from 'react';
import './addProduct.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addProductBroadcast from '../../actions/newProductBroadcast';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryname: 'Electronics',
            productname: '',
            productquantity: '',
            productprice: '',
            instock: 'YES'
        }
    }

    changeHandler = (event) => {
        // console.log(event.target.name)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        // console.log(this.state)
        // this.handleValidation();
    }

    contactSubmit=(event)=>{
        event.preventDefault();
        let newProduct = {
            "category": this.state.categoryname,
            "name": this.state.productname,
            "price": this.state.productprice,
            "quantity": this.state.productquantity,
            "instock": this.state.instock
        }

        console.log(newProduct);
        this.props.sendNewProduct(newProduct)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <div className="container">
                    <header id="addProduct-header">ADD PRODUCT</header>
                    <form onSubmit={this.contactSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="categoryname">Category Name:</label>
                            </div>
                            <div className="col-75">
                                <select name="categoryname" className="input-select" onChange={this.changeHandler} >
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
                                <input type="text" className="input-text" id="productname" name="productname" autoComplete="off"
                                    placeholder="Enter Product Name.." onChange={this.changeHandler} title="Name should consists of letters and greater than length 3" required />
                                {/* <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productname"]}</span> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label >Quantity</label>
                            </div>
                            <div className="col-75">
                                <input type="number" className="input-text" id="productquantity" name="productquantity" autoComplete="off"
                                    placeholder="Enter Product Quantity.." onChange={this.changeHandler} title="Quantity should be a number" required />
                                {/* <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productquantity"]}</span> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label >Price</label>
                            </div>
                            <div className="col-75">
                                <input type="number" className="input-text" id="productprice" name="productprice" autoComplete="off"
                                    placeholder="Enter Product Price.." onChange={this.changeHandler} title="Price should be a number" required />
                                {/* <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productprice"]}</span> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="instock">In Stock:</label>
                            </div>
                            <div className="col-75">
                                <select name="instock" className="input-select" onChange={this.changeHandler} >
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

function convertPropToEventAndBroadcast(dispatch){
    return bindActionCreators({
        sendNewProduct: addProductBroadcast
    }, dispatch)
}

export default connect(null,convertPropToEventAndBroadcast)(AddProduct);