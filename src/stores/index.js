import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from '../stores/alert.module.js';
import { account } from '../stores/account.module.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account
    }
});
