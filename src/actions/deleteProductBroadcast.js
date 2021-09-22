const deleteProductBroadcast = function(productId){
    // console.log("Received delete product in action broadcaster....");
    // console.log(productId);
    return ({
        type:'DELETE_PRODUCT',
        payload:productId
    })

}

/////only dev-test

export default deleteProductBroadcast