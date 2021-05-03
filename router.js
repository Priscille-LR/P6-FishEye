import { PageFactory, PageFactoryEnum } from './scripts/factory/PageFactory';
import { DataFetcher } from './scripts/utils/DataFetcher';

const dataFetcher = new DataFetcher('/static/FishEyeDataFR.json');
const json =  dataFetcher.fetchSource()
const pageFactory = new PageFactory();

//possible routes
const routes = [
    {
        regex: /\/{1}$/gm,
        component: pageFactory.getPage(PageFactoryEnum.HOME, json)
    },
    {
        regex: /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/, 
        component: pageFactory.getPage(PageFactoryEnum.PHOTOGRAPHER, json)
    },
];

export const router = () => {
    const idPhotographer = location.pathname.split('/')[2];
    routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer)
};