import { AppModel } from "../models/AppModel";

export class DataFetcher {
    constructor(dataSource) {
        this.dataSource = dataSource; //json file
    }

    /**
     * fetch data from json
     * @returns {Promise<>} 
     */
    fetchSource() {
        const result = fetch(this.dataSource) // ressource request
            .then(resp => resp.json())
        return result;
    }

}


