'use strict';

import AppDispatcher from '../dispatcher/app-dispatcher';
import WebAPI from '../util/web-api';

import {
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR
} from '../constants/app-constants';

export default {
  getItems() {
    WebAPI.getItems()
    .then((items) => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_SUCCESS,
        items: items
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_ERROR
      });
    });
  }
};
