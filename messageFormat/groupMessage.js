const groupMessage =(message,groupId, sender ,timestamp) => {
    return(
        {
            group: true,
            groupCreation:false,
             message,
             groupId,
            sender,
            timestamp,
    })
}
module.exports = groupMessage;