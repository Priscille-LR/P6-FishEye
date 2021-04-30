import { PageFactory, PagesFactoryEnum } from './scripts/factory/PageFactory';
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
        regex: /\/{1}$/gm,
        component: pageFactory.getPage(PagesFactoryEnum.HOME, props)
    },
    {
        regex: /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/, 
        component: pageFactory.getPage(PagesFactoryEnum.PHOTOGRAPHER, props)
    },
];

export const router = () => {
    const idPhotographer = location.pathname.split('/')[2];
    routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer)
};