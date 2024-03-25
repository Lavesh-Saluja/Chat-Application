// A message structure 

const message = (id,message, sender, receiver, timestamp) => {
    return(
        {
             id,
             message,
             sender,
             receiver,
            timestamp,
    })
}
module.exports = message;