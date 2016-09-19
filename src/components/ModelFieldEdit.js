import ModelMixin from '../mixins/ModelMixin'
import template from './html/model_field_edit.html'
import VuexActions from '../vuex/actions'
import Modal from './ui/Modal.vue'

export default {
  template,
  name: 'ModelFieldEdit',
  mixins: [ModelMixin],
  components: {
    Modal
  },
  data () {
    return {
      field: {
        type: '',
        key: ''
      },
      edit: false,
      clone: false,
      key_new: '',
      fieldConfig: {}

    }
  },

  events: {
    'field::new' ({type, key}) {
      this.initEmptyField(type, key)
      this.initFieldConfig(true)
      this.$refs.popup.show()
    },

    'field::edit' (key) {
      this.edit = true
      this.field = JSON.parse(JSON.stringify(this.model.fields[key]))
      this.field.key = key
      this.initFieldConfig()
      this.$refs.popup.show()
    },

    'field::clone' (key) {
      this.edit = false
      this.clone = true
      this.field = JSON.parse(JSON.stringify(this.model.fields[key]))
      this.field.key = ''
      this.initFieldConfig()
      this.$refs.popup.show()
    }
  },

  methods: {
    initEmptyField (type, key) {
      this.field = {key: key, type: type}
      this.edit = false
    },

    close () {
      this.field.type = '';
      this.$refs.popup.hide()
    },

    save (e) {
      if (e) {
        e.preventDefault()
      }

      if (this.clone && this.key_new !== '') {
        this.field.key = this.key_new
      }

      if (this.field.key === '') {
        swal('Please choose field key', '', 'error')
        $('#clone_key').focus()
        return false
      }

      VuexActions.validateForm($('form#field_form'), () => {
        delete this.field.is_for_virtual
        var key = this.field.key
        delete this.field.key
        if (this.field.find === '') {
          delete this.field.find
        }
        if (this.field.extra === '') {
          delete this.field.extra
        }
        this.$store.dispatch('SET_FIELD', key, Object.assign({}, this.field))
        this.field.type = '';
        this.$refs.popup.hide()
      })
    },

    initFieldConfig (assignDefaults) {
      console.log(this.field);
      this.$set('fieldConfig', this.commonConfig.fields_config[this.field.type])
      if (assignDefaults) {
        Object.assign(this.field, this.fieldConfig.defaults)
      }
    },

    isCustomField () {
      return this.fieldConfig.custom
    },

    showField (fieldName) {
      if (this.field.type == '') {
        return false;
      }
      if (typeof this.fieldConfig['sections'] === 'object' && this.fieldConfig['sections'].indexOf(fieldName) >= 0) {
        return true
      }
      return false
    },

    notUsedField (row) {
      if (typeof this.model.fields[row] === 'undefined') {
        return true
      }
      return false
    }
  },

  watch: {

    'key_new': function (val, oldVal) {
      if (val !== '') {
        this.field.key = ''
      }
    },

    'field.key': function (val, oldVal) {
      if (val !== '') {
        this.key_new = ''
      }
    }
  }
}
