import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import * as VueWindow from '@hscmap/vue-window'
Vue.use(VueLodash, { name: '$_', lodash })
Vue.use(require('vue-cookies'))
Vue.use(VueWindow)