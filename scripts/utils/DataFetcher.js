export class DataFetcher {
    constructor(dataSource) {
        this.dataSource = dataSource; //json file
    }

    async fetchSource() {
        const resp = await fetch(this.dataSource); // ressource request
        //console.log(resp);
        return await resp.json();
    }
}