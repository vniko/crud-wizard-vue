import Vue from 'vue'

const apiUrl = 'http://admin.mk5.app/crud_setup/wizard/'

export default {
  apiUrl,
  fetchConfig ({dispatch}, table, loadCommon = true) {
    dispatch('SET_TABLE', table)
    var pageUrl = apiUrl + 'getWizardConfig'
    Vue.http.get(pageUrl, {params: {args: [table, +loadCommon]}})
      .then((response) => dispatch('SET_CONFIG', response.json()))
      .catch((error) => Promise.reject(error))
  },
  fetchModels ({dispatch}) {
    var pageUrl = apiUrl + 'getWizardModelsConfig'
    Vue.http.get(pageUrl)
      .then((response) => dispatch('SET_MODELS', response.json()))
      .catch((error) => Promise.reject(error))
  },
  resetModel ({dispatch}) {
    dispatch('RESET_TABLE')
  },

  validateForm ($form, callback) {
    var wasError = false
    $form.find('input[required], select[required]').each(function () {
      if (!$(this).val()) {
        wasError = true
        return false
      }
    })
    if (wasError) {
      swal('Please, fill all the required fields', '', 'warning')
      return false
    }

    return callback()
  }
}


