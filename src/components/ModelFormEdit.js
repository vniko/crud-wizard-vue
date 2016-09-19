import ModelMixin from '../mixins/ModelMixin'
import template from './html/model_form_edit.html'
import Modal from './ui/Modal.vue'

export default {

  name: 'ModelFormEdit',
  template,
  mixins: [ModelMixin],
  components: {
    Modal
  },
  data () {
    return {
      tabs: [],
      fields: [],
      availableFields: [],
      usedFields: [],
      form: {fields: [], tabs: {}},
      formKey: '',
      edit: false,
      newTabTitle: '',
      fieldsContainer: null,
      fieldsStackContainer: null,
      sortableStackOptions: {
        group: {name: 'cols', pull: true, put: false},
        sort: false

      },

      sortableDestOptions: {
        group: {name: 'cols', pull: false, put: true},
        sort: true,
        onAdd: (evt) => {
          var itemEl = evt.item
          var newField = {key: $(itemEl).data('rel')}
          this.fields.splice(evt.newIndex, 0, newField)
          this.availableFields.$remove($(itemEl).data('rel'))
        },
        onUpdate: (evt) => {
          this.fields.move(evt.oldIndex, evt.newIndex)
        }
      }
    }
  },

  methods: {

    addForm () {
      this.initEmptyForm()
      this.$refs.popup.show()
      this.initFields()
    },

    cloneForm (key) {
      this.edit = true
      this.formKey = key
      this.$refs.popup.show()
      this.initFields(this.model.forms[key])
    },

    editForm (key) {
      this.edit = true
      this.formKey = key
      this.$refs.popup.show()
      this.initFields(this.model.forms[key])
    },
    addTab () {
      if (this.newTabTitle === '') {
        swal('Oh no : (', 'Please, enter the tab title', 'warning')
        return
      }

      var tab = {tab: true, alias: 'tab_' + this.tabs.length, title: this.newTabTitle}
      if (this.tabs.length == 0) {
        this.fields.splice(0, 0, tab)
      } else {
        this.fields.push(tab)
      }

      this.tabs.push(tab)
      this.newTabTitle = ''

    },


    deleteField(key, rel) {
      this.fields.splice(key, 1)
      if (rel) {
        this.availableFields.push(rel)
        this.availableFields.sort()
      }
    },

    initFields(form) {

      this.$set('tabs', [])

      if (!this.edit) {
        this.$set('fields', [])
        this.$set('availableFields', Object.keys(this.model.fields).sort())

      } else {

        var fields = []
        var availFields = Object.keys(this.model.fields)
        availFields.sort()

        if (this.$parent.getFormType(form) == 'simple') {
          form.forEach(function (f) {
            fields.push({key: f})
          })
        } else if (this.$parent.getFormType(form) == 'tabbed') {

          for (var tabid in form) {

            let tab = JSON.parse(JSON.stringify(form[tabid]))
            tab.alias = tabid
            tab.tab = true
            fields.push(tab)
            this.tabs.push(tab)
            if (tab.fields) {

              tab.fields.forEach(function (f) {
                fields.push({key: f})
                availFields.$remove(f)
              })
              delete tab.fields
            }
          }
        }

        this.$set('fields', fields)
        this.$set('availableFields', availFields)
      }
    },

    initEmptyForm() {

      this.form = {fields: [], tabs: {}}

      if (typeof  this.model.forms == 'undefined' || !Object.keys(this.model.forms).length) {
        this.formKey = "default"
      } else {
        this.formKey = "form_" + (Object.keys(this.model.forms).length + 1)
      }

      this.edit = false


    },


    hide() {

      this.$broadcast('hide::modal', 'form_modal')
    },

    save() {

      Actions.validateForm($('form#form_form'), () => {


        if (this.tabs.length <= 0) {
          var form_arr = []
          this.fields.forEach(function (f, i) {
            form_arr.push(f.key)
          })

          if (!Object.keys(this.model.forms).length) {
            let forms = {}
            forms[this.formKey] = form_arr
            this.$set('model.forms', forms)
          } else {
            Vue.set(this.model.forms, this.formKey, form_arr)
          }

          //Vue.set(this.model.forms,this.formKey,form_arr)
        } else {


          var first_tab_ind = 0
          this.fields.every((f, i) => {
            if (f.tab) {
              first_tab_ind = i
              return false
            }
            return true
          })

          if (first_tab_ind > 0) {
            this.fields.move(first_tab_ind, 0)
          }

          var form_obj = {}
          var current_alias = ''
          this.fields.forEach((f, i) => {
            if (f.tab) {
              delete f.tab
              current_alias = f.alias
              delete f.alias
              form_obj[current_alias] = f
              form_obj[current_alias].fields = []
            } else {
              form_obj[current_alias].fields.push(f.key)
            }
          })

          if (!Object.keys(this.model.forms).length) {
            let forms = {}
            forms[this.formKey] = form_obj
            this.$set('model.forms', forms)
          } else {
            Vue.set(this.model.forms, this.formKey, form_obj)
          }
          //console.log(form_obj)
        }
        
        this.hide()
      })

    }
  }
}

