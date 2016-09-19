import FieldEdit from './ModelFieldEdit'
import AddFieldBtn from './AddFieldBtn.vue'
import template from './html/model_fields.html'
import ModelMixin from '../mixins/ModelMixin'
import ModelEdit from './ModelEdit'

export default{
  name: 'ModelFields',
  components: {
    AddFieldBtn,
    FieldEdit,
    ModelEdit
  },
  mixins: [
    ModelMixin
  ],
  template,
  data () {
    return {
      new_field_type: '',
      new_field_key: '',
      new_field_key_new: ''
    }
  },
  methods: {

    addField () {
      if (this.new_field_key === '' && this.new_field_key_new === '') {
        swal('Oh, no :(', 'Please, choose an existing table field or enter a new one', 'warning');
        return false
      }

      if (this.new_field_type === '') {
        swal('Oh no : (', 'Please, choose a field type', 'warning');
        return false
      }

      if (this.new_field_key_new === '' && this.commonConfig.fields_config[this.new_field_type]['is_for_virtual']) {
        swal('Oh no : (', 'This field type can be used only with a virtual property. Please enter a new property.', 'warning')
        return false
      }

      this.$broadcast('field::new', {type: this.new_field_type, key: (this.new_field_key || this.new_field_key_new)})
      this.new_field_type = ''
      this.new_field_key = ''
      this.new_field_key_new = ''

      return true
    },

    cloneField (key) {
      this.$broadcast('field::clone', key)
    },

    editField (key) {
      this.$broadcast('field::edit', key)
      this.$broadcast('show::modal', 'field_modal')
    },

    isField (row) {
      if (!row.$value.relation) {
        return row
      }
    }
  },

  watch: {
    'new_field_key': function (val, oldVal) {
      if (val !== '') {
        this.new_field_key_new = ''
      }
    },

    'new_field_key_new': function (val, oldVal) {
      if (val !== '') {
        this.new_field_key = ''
      }
    }
  }
}
