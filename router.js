import { PageFactory, PageFactoryEnum } from './scripts/factory/PageFactory';
import { AppModel } from './scripts/models/AppModel';
import { DataFetcher } from './scripts/utils/DataFetcher';

const dataFetcher = new DataFetcher('/static/FishEyeData-new.json');
const json = dataFetcher.fetchSource()
const pageFactory = new PageFactory();

//possible routes
const routes = [
    {
        regex: /\/{1}$/gm,
        component: pageFactory.getPage(PageFactoryEnum.HOME, json.then(appModel => appModel.homePageModel))
    },
    {
        regex: /\/[A-Za-z\-]{1,}\/[0-9]{0,3}?$/,
        component: pageFactory.getPage(PageFactoryEnum.PHOTOGRAPHER, json.then(appModel => appModel.photographerPageModel))
    },
];

export const router = () => {
    const idPhotographer = location.pathname.split('/')[2];
    routes.find(route => route.regex.test(location.pathname)).component.render(idPhotographer)
};