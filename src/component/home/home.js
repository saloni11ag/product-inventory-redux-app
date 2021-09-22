import React, { Component } from 'react';
import './home.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import deleteProductBroadcast from '../../actions/deleteProductBroadcast';
import NotificationBar from '../notificationBar/notificationBar';
import sendProductsBroadcast from '../../actions/sendProductsBroadcast';

class Home extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
        if (this.props.allproducts.length === 0) {
            this.getAllProducts()
        }
        this.setState({ productList: this.props.allproducts })
    }

    getAllProducts = () => {
        axios.get('http://localhost:3000/products')
            .then(res => {
                // console.log(res.data);
                this.props.sendProducts(res.data)
                this.setState({ productList: this.props.allproducts })
            }, err => {
                console.log(err);
            })
    }

    updateProduct = (product) => {
        // console.log(this.props)
        // console.log("update clicked!!")
        this.props.history.push({
            pathname: '/editProduct',
            state: product,
        }
        )
    }

    deleteProduct = (id) => {
        // console.log(id)
        var temArr = this.state.productList.filter(obj => {
            return obj.id !== id
        })
        this.setState({ productList: temArr })
        this.props.deleteProduct(id)
    }

    addProductClick = () => {
        this.props.history.push('/addProduct')
    }

    handleChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;

        if (val === '') {
            this.setState({ productList: this.props.allproducts })
        }

        this.setState({ [name]: val });
        let filteredProducts = this.props.allproducts.filter(prod => {
            return prod.name.toLowerCase().match(val.toLowerCase())
        })
        // console.log("searched product"+filteredProducts);
        this.setState({ productList: filteredProducts })
    }

    selectChange = (event) => {
        // let name = event.target.name;
        let val = event.target.value;
        // console.log(val)
        if (val === "all") {
            this.setState({ productList: this.props.allproducts })
        } else {
            let filteredProducts = this.props.allproducts.filter(prod => {
                return prod.category === val
            })
            // if (filteredProducts.length === 0) {
            //     this.setState({ message: true })
            // } else {
            //     this.setState({ productList: filteredProducts })
            // }
            this.setState({ productList: filteredProducts })
        }
    }

    sortChange = (event) => {
        let val = event.target.value;
        if (val === "all-product") {
            this.setState({ productList: this.props.allproducts })
        } else if (val === "product-asc") {
            var prods_list = [].concat(this.props.allproducts)
                .sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                })
            this.setState({ productList: prods_list })
            // console.log(prods_list);
        } else if (val === "product-desc") {
            var prods_list = [].concat(this.props.allproducts)
                .sort((a, b) => {
                    if (a.name > b.name) { return -1; }
                })
            this.setState({ productList: prods_list })
            // console.log(prods_list);
        } else if (val === "price-asc") {
            var prods_list = [].concat(this.props.allproducts)
                .sort((a, b) => {
                    if (a.price < b.price) { return -1; }
                })
            this.setState({ productList: prods_list })
            // console.log(prods_list);
        } else if (val === "price-desc") {
            var prods_list = [].concat(this.props.allproducts)
                .sort((a, b) => {
                    if (a.price > b.price) { return -1; }
                })
            this.setState({ productList: prods_list })
            // console.log(prods_list);
        } else if (val === "in-stock") {
            let filteredProducts = this.props.allproducts.filter(prod => {
                return prod.instock === "YES"
            })
            this.setState({ productList: filteredProducts })
            // console.log(prods_list);
        } else if (val === "out-of-stock") {
            let filteredProducts = this.props.allproducts.filter(prod => {
                return prod.instock === "NO"
            })
            this.setState({ productList: filteredProducts })
            // console.log(prods_list);
        }
    }

    displayProducts = () => {
        // console.log(this.props.allproducts)
        if (this.state.productList !== undefined) {
            return this.state.productList.map(product => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.instock}</td>
                        <td><button className="button button1" onClick={() => this.updateProduct(product)}>Edit</button></td>
                        <td><button className="button button2" onClick={() => this.deleteProduct(product.id)}>Delete</button></td>
                    </tr>
                )

            })
        }
    }
    render() {
        return (
            <div>
                <NotificationBar total={this.props.allproducts.length}></NotificationBar>
                <button className="addbutton button1" onClick={this.addProductClick}>Add Product</button>
                <div className="select-category">
                    <span>Filter By Category  </span>
                    <select name="categoryname" className="input-category" onChange={this.selectChange} >
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Clothing">Clothing</option>
                        <option value="in-stock">InStock</option>
                        <option value="out-of-stock">Out Of Stock</option>
                    </select>
                </div>
                <div className="sort-by">
                    <span>Sort By: </span>
                    <select name="sort" className="input-sort-product" onChange={this.sortChange} >
                        <option value="all-product">---  sort by  ---</option>
                        <option value="product-asc">Ascending A to Z</option>
                        <option value="product-desc">Descending Z to A</option>
                        <option value="price-asc">Price Low To High</option>
                        <option value="price-desc">Price High To Low</option>
                    </select>
                </div>
                <div className="search-container">
                    <form>
                        <input type="text" placeholder="Search.." name="search"
                            value={this.state.search} onChange={this.handleChange} />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <table id="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>InStock</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayProducts()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function convertStoreToProps(store) {
    // console.log('Received complete store....in home container');
    // console.log(store);
    return {
        allproducts: store.getProduct
    }
}

function convertPropToEventAndBroadcast(dispatch) {
    return bindActionCreators({
        deleteProduct: deleteProductBroadcast,
        sendProducts: sendProductsBroadcast
    }, dispatch)
}


export default connect(convertStoreToProps, convertPropToEventAndBroadcast)(Home);