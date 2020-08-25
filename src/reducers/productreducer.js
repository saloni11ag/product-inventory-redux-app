import axios from 'axios';

const productreducer = function getProduct(state = null, action) {
  var products = [
    // {
    //   "id": 1,
    //   "category": "Electronics",
    //   "name": "MI HD TV",
    //   "price": "220",
    //   "quantity": "9",
    //   "instock": "YES"
    // },
    // {
    //   "id": 2,
    //   "category": "Electronics",
    //   "name": "OnePlus QLED TV",
    //   "price": "230",
    //   "quantity": "9",
    //   "instock": "NO"
    // },
    // {
    //   "id": 3,
    //   "category": "Electronics",
    //   "name": "Micromax UHD LED",
    //   "price": "120",
    //   "quantity": "4",
    //   "instock": "YES"
    // },
    // {
    //   "id": 4,
    //   "category": "Accessories",
    //   "name": "Fostelo Catlin HandBag",
    //   "price": "150",
    //   "quantity": "4",
    //   "instock": "NO"
    // },
    // {
    //   "id": 5,
    //   "category": "Accessories",
    //   "name": "Typify Leather Bag",
    //   "price": "165",
    //   "quantity": "3",
    //   "instock": "YES"
    // },
  ];
  // console.log(action);
  switch (action.type) {
    case "SEND_PRODUCT":
      // console.log("Action with payload received in reducer with case send_product!")
      // console.log(action.payload);
      return action.payload

    case "NEW_PRODUCT":
      // console.log("Action with payload received in reducer with case new_product!")
      // console.log(action.payload);
      let tempProd = action.payload
      tempProd.id = state.length + 1
      axios.post('http://localhost:3000/products', tempProd)
        .then(
          response => {
            // console.log(response);
            // this.props.history.push('/')
          }, error => {
            console.error(error);
          }
        )
      let newProduct = [...state, tempProd]
      return newProduct

    case "EDIT_PRODUCT":
      // console.log("Action with payload received in reducer with case edit_product!")
      // console.log(action.payload);
      // let temp = action.payload
      // axios.patch('http://localhost:3000/products/' + action.payload.id, action.payload)
      //   .then(
      //     response => {
      //       console.log(response);
      //     }, error => {
      //       console.error(error);
      //     }
      //   )
      var editProduct = state.map(obj => {
        if (obj.id === action.payload.id) {
          // console.log("before", obj)
          obj = action.payload
          // console.log("after", obj)
        }
        return obj
      })
      return editProduct

    case "DELETE_PRODUCT":
      // console.log("Action with payload received in reducer with case delet_product!")
      // console.log(action.payload);
      // let temp = action.payload
      axios.delete('http://localhost:3000/products/' + action.payload)
        .then(response => {
          // console.log(response)
        }, error => {
          console.error(error)
        })
      let filteredProducts = state.filter(prod => {
        return prod.id !== action.payload
      })
      // console.log(filteredProducts)
      return filteredProducts


    default:
      break;
  }

  return products

}

export default productreducer