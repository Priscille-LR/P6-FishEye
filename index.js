import { router } from './router';

window.addEventListener('hashchange', router); // identifier of the URL changes
window.addEventListener('load', router); // ressource has loaded