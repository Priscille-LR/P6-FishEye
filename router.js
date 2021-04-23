import { PageFactory } from './scripts/factory/PageFactory';
import { DataFetcher } from './scripts/utils/DataFetcher';

const dataFetcher = new DataFetcher('/static/FishEyeDataFR.json');
const jsonPromise = dataFetcher.fetchSource()

const pageFactory = new PageFactory();

const props = {
    json: jsonPromise,
};
//possible routes
const routes = [
    {
        path: "/",
        component: pageFactory.getPage("homePage", props)
    },
    {
        path: "/photographers-profile/", 
        component: pageFactory.getPage("photographerPage", props)
    },
];

//match for photographer page regex
const photographerURLRegex = /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/;

export const router = () => {

    //for each route, return component (page)
    // check if requested page corresponds to a photographer page (with regex)
    const potentialMatches = routes.map(route => {
        return {
            component: route.component,
            result: photographerURLRegex.test(route.path) && photographerURLRegex.test(location.pathname) //current url
        }
    })
    
    const matchedPage = potentialMatches.find(potentialMatch => potentialMatch.result == true)

    if(matchedPage != null){ // photographer page match
        const idPhotographer = location.pathname.split('/')[2];
        matchedPage.component.render(idPhotographer);
    } else {
        routes.find(route => route.path == "/").component.render(); //return to home page
    }

};