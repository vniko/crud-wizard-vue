import template from './html/index.html'
import store from '../vuex/store'
import VuexActions from '../vuex/actions'

import { getModels, modelsLoaded } from '../vuex/getters'

export default{
  data () {
    return {

    }
  },

  template: template,
  store,
  vuex: {
    getters: {
      models: getModels,
      modelsLoaded: modelsLoaded
    },
    actions: {
      fetchModels: VuexActions.fetchModels,
      resetModel: VuexActions.resetModel
    }

  },

  route: {
    data ({to}) {
      if (!this.modelsLoaded) {
        this.fetchModels()
      }
      this.resetModel()
    }
  }
}

