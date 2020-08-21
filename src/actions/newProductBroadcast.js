const addProductBroadcast = function(product){
    console.log("Received new product in action broadcaster....");
    console.log(product);
    return ({
        type:'NEW_PRODUCT',
        payload:product
    })

}

export default addProductBroadcast