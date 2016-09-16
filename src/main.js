import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Vuex from 'vuex'
import Sortable from 'vue-sortable'
import './helpers'

import App from './components/App.vue'
import General from './components/ModelGeneral'
import Relations from './components/ModelRelations'
import Fields from './components/ModelFields'
import Forms from './components/Forms.vue'
import Scopes from './components/Scopes.vue'
import Index from './components/Index'
import store from './vuex/store'

Vue.config.devtools = true
Vue.use(Resource)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(Sortable)

export var router = new Router()

router.map({

  '/index': {
    name: 'model_index',
    component: Index

  },

  '/general/:table': {
    name: 'model_general',
    component: General
  },

  '/relations/:table': {
    name: 'model_relations',
    component: Relations
  },

  '/fields/:table': {
    name: 'model_fields',
    component: Fields
  },

  '/forms/:table': {
    name: 'model_forms',
    component: Forms
  },

  '/scopes/:table': {
    name: 'model_scopes',
    component: Scopes
  }

})

router.redirect({
  '*': '/index'
})

// router.beforeEach(function (transition) {
//
//     // var form = $('form.validate').first();
//     // if (form.length) {
//     //     var bootstrapValidator = form.data('bootstrapValidator');
//     //     if (bootstrapValidator ) {
//     //         bootstrapValidator.validate();
//     //         if (!bootstrapValidator.isValid()) {
//     //             return false;
//     //         }
//     //     }
//     //
//     // }
//      transition.next()
// });

// router.afterEach(function (transition) {
//
//     // $('.nav-pills').find('li').removeClass('active');
//     // $('.nav-pills').find('a[href="#!'+transition.to.path+'"]').parent().addClass('active');
//
// });

router.start({
  store,
  components: {App}
}, '#app')

