const editProductBroadcast = function(product){
    console.log("Received edit product in action broadcaster....");
    console.log(product);
    return ({
        type:'EDIT_PRODUCT',
        payload:product
    })

}

export default editProductBroadcast