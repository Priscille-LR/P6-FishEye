import { PageFactory, PageFactoryEnum } from './scripts/factory/PageFactory';
import { DataFetcher } from './scripts/utils/DataFetcher';

const dataFetcher = new DataFetcher('/static/FishEyeData-new.json');
const json = dataFetcher.fetchSource();
const pageFactory = new PageFactory();

//possible routes
const routes = [
    {
        regex: /\/{1}$/,
        component: pageFactory.getPage(PageFactoryEnum.HOME, json.then(appModel => appModel.homePageModel)) //data needed on homepage (photographers list + tags list)
    },
    {
        regex: /\/[A-Za-z-]{1,}\/[0-9]{0,3}?$/,
        component: pageFactory.getPage(PageFactoryEnum.PHOTOGRAPHER, json.then(appModel => appModel.photographerPageModel)) //data needed on photographer page (photographers list + media list)
    },
];

/**
 * 
 */
export const router = () => {
    const idPhotographer = location.pathname.split('/')[2];
    routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer)
};