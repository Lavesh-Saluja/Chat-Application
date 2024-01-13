// A message structure 
const message = (message,sender,receiver,timestamp) => {
    return(
    {
             message,
             sender,
             receiver,
            timestamp,
    })
}
module.exports = message;