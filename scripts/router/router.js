import { PageFactory, PageFactoryEnum } from '../factory/PageFactory';
import { DataFetcher } from '../utils/DataFetcher';
import { AppPageWrapper } from "../utils/AppPageWrapper";

const dataFetcher = new DataFetcher('/static/FishEyeData-new.json');
const json = dataFetcher.fetchSource(); //promise returned, with a json file
const appPageWrapper = new AppPageWrapper(json); 
const pageFactory = new PageFactory();

//possible routes
const routes = [
    {
        regex: /\/{1}$/,
        component: pageFactory.getPage(PageFactoryEnum.HOME, appPageWrapper.appModel.then(appModel => appModel.homePageModel)) //only data needed on homepage is used (photographers list + tags list)
    },
    {
        regex: /\/[A-Za-z-]{1,}\/[0-9]{0,3}?$/,
        component: pageFactory.getPage(PageFactoryEnum.PHOTOGRAPHER, appPageWrapper.appModel.then(appModel => appModel.photographerPageModel)) //only data needed on photographer page is used (photographers list + media list)
    },
];

/**
 * retrieves photographer id + tests URL address and renders a page
 * id can be undefined in the case of home page 
 */
export const router = () => {
    const idPhotographer = location.pathname.split('/')[2];
    routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer)
};