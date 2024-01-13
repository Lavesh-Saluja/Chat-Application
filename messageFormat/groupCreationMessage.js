const groupCreationMessage =(message,groupId, admin ,timestamp) => {
    return(
        {
            group: true,
            groupCreation:true,
             message,
             groupId,
            admin,
            timestamp,
    })
}
module.exports = groupCreationMessage;
