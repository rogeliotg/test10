const size = (obj) => {

    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
const saveErrorServer= (str) => {
    fetch('https://myserver.com/log?err='+str)
    .then(response => response.json())
    .then();
}

export { saveErrorServer, size };