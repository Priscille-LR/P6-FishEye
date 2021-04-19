import { PageFactory } from './scripts/factory/PageFactory';
import { DataFetcher } from './scripts/utils/DataFetcher';

const dataFetcher = new DataFetcher('/static/FishEyeDataFR.json');
const jsonPromise = dataFetcher.fetchSource()

const pageFactory = new PageFactory();

//possible routes
const routes = [
    {
        path: "/",
        component: pageFactory.getPage("homePage", {
            json: jsonPromise,
        },
        ),
    },
    {
        path: "/photographers-profile/", 
        component: pageFactory.getPage("photographerPage", {
            json: jsonPromise,
        })
    },
];

//match for photographer page regex
const pathToRegex = /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/;

export const router = () => {

    const potentialMatches = routes.map(route => {
        return {
            component: route.component,
            result: pathToRegex.test(route.path) && pathToRegex.test(location.pathname) //current url
        }
    })
    
    const match = potentialMatches.find(potentialMatch => {
        return potentialMatch.result == true
    })

    if(match != null){ // photographer page match
        const idPhotographer = location.pathname.split('/')[2];
        match.component.render(idPhotographer);
    } else {
        routes.find(route => route.path == "/").component.render(); //return to home page
    }

};