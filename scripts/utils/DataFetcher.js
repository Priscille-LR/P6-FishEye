export class DataFetcher {
    constructor(dataSource) {
        this.dataSource = dataSource; //json file
    }

    fetchSource() {
        return fetch(this.dataSource) // ressource requeste
            .then(function (resp) {
                console.log(resp)
                return resp.json(); 
            });
    }
}