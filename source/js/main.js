import './card-advert.js';
import  './map.js';
import {onDataSuccess} from './filter.js';
import {validateForm} from './form.js';
import {getData} from './server.js';
import {showErrorMessageGet} from './popup-message.js';

getData(onDataSuccess, showErrorMessageGet)

validateForm();
