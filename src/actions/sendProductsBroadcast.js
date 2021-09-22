const sendProductsBroadcast = function(product){
    // console.log("Received all products in action broadcaster....");
    // console.log(product);
    return ({
        type:'SEND_PRODUCT',
        payload:product
    })

}

export default sendProductsBroadcast