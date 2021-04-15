import { DataFetcher } from './scripts/utils/DataFetcher';
import { HomePageBuilder } from './scripts/factory/HomePageBuilder';
import { PhotographerPageBuilder } from './scripts/factory/PhotographerPageBuilder';
//var json = require('./src/FishEyeDataFR.json'); 

const dataFetcher = new DataFetcher('./static/FishEyeDataFR.json');

const jsonPromise = dataFetcher.fetchSource()
// const homePageBuilder = new HomePageBuilder(jsonPromise)
// homePageBuilder.render();

const photographerPageBuilder = new PhotographerPageBuilder(jsonPromise, 82)
photographerPageBuilder.render();





