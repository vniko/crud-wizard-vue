import store from '../vuex/store'
import VuexActions from '../vuex/actions'
import {getModel, getModelConfig, getCommonConfig, getTable, configLoaded} from '../vuex/getters'
import swal from 'sweetalert2'

export default {
  store,
  components: {
  },
  vuex: {
    getters: {
      model: getModel,
      table: getTable,
      modelConfig: getModelConfig,
      commonConfig: getCommonConfig,
      configLoaded: configLoaded
    },
    actions: {
      fetchConfig: VuexActions.fetchConfig
    }
  },

  route: {
    data ({to}) {
      if (this.table === to.params.table) {
        return
      }
      this.fetchConfig(to.params.table, !this.configLoaded)
    }
  },
  methods: {

    saveModel () {
      // var form = $('form.validate').first()
      if (form.length) {
        var bootstrapValidator = form.data('bootstrapValidator')
        if (bootstrapValidator) {
          bootstrapValidator.validate()
          if (!bootstrapValidator.isValid()) {
            return false
          }
        }
      }

      swal(
        {
          title: "Are you sure?",
          text: "Please check everything!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, save it!",
          showLoaderOnConfirm: true,

        })
        .then(() => {
          var pageUrl = VuexActions.apiUrl + 'saveModel'
          this.$http.post(pageUrl, {args: [this.table, JSON.stringify(this.model)]}).then ((resp) => {
            var res = resp.json()
            if (res && typeof res.success !== 'undefined' && res.success) {
              if (res.migrations) {
                swal(
                  {
                    title: "Migrations created",
                    text: "Some migrations were created. You can run them right now or review and run `artisan migrate` later",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Run them!",
                    cancelButtonText: "Forget it"
                  })
                  .then(() => {
                    var pageUrl = VuexActions.apiUrl + 'runMigrations'
                    this.$http.post(pageUrl, {}).then((resp) => {
                      var res = resp.json()
                      if (res && typeof res.success !== 'undefined' && res.success) {
                        swal('Ohh yeah', '', 'success')
                      } else {
                        swal('Ohh no', '', 'error')
                      }
                    })
                  }, () => {
                  })
              } else {
                swal('Ohh yeah', '', 'success')
              }
            } else {
              swal('Ohh no', '', 'error')
            }
          })
        }, () => {
        })
    }
  }
}

