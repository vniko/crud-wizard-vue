import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'

Vue.use(Vuex)

const defaultModel = {
  acl: '',
  tree: false,
  title_field: '',
  track_history: '',
  forms: {},
  fields: {},
  scopes: {}
}

const state = {
  table: '',
  model: defaultModel,
  models: {},
  commonConfig: {
    'acls': {},
    'field_section_config': {}
  },
  modelConfig: {},
  configLoaded: false,
  modelsLoaded: false,
  addRelation: ''

}

const mutations = {
  SET_CONFIG (state, modelReceived) {
    state.model = Object.assign({}, defaultModel, modelReceived['model'])
    state.modelConfig = modelReceived['model_config']
    if ('common_config' in modelReceived) {
      state.commonConfig = modelReceived['common_config']
    }
    state.configLoaded = true
  },
  SET_TABLE (state, table) {
    state.table = table
  },
  RESET_TABLE (state, table) {
    state.table = ''
    state.configLoaded = false
    state.model = {}
    state.modelConfig = {}
  },
  SET_MODELS (state, models) {
    state.models = models
    state.modelsLoaded = true
  },
  DELETE_FIELD (state, key) {
    swal(
      {
        title: "Are you sure?",
        text: "You will not be able to recover this field!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!"

      })
      .then(() => {
        Vue.delete(state.model.fields, key)
        swal(
          'Deleted!',
          'The field has been deleted.',
          'success'
        )
      }, () => {})
  },

  SET_FIELD (state, key, field) {
    Vue.set(state.model.fields, key, field)
  },

  SET_FORM (state, key, form) {
    Vue.set(state.model.forms, key, form)
  }

}

export default new Vuex.Store({
  state,
  mutations
})
