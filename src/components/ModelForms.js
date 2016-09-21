import FormEdit from './ModelFormEdit'
import template from './html/model_forms.html'
import ModelMixin from '../mixins/ModelMixin'
import ModelEdit from './ModelEdit'
import AddFormBtn from './AddFormBtn.vue'

export default {
  name: 'ModelForms',
  components: {
    FormEdit,
    AddFormBtn,
    ModelEdit
  },
  mixins: [
    ModelMixin
  ],
  template,
  data () {
    return {}
  },
  methods: {
    addForm () {
      this.$refs.form.addForm()
    },

    editForm (key) {
      this.$refs.form.editForm(key)
    },

    cloneForm (key) {
      this.$refs.form.cloneForm(key)
    },

    deleteForm (key) {
      swal(
        {
          title: 'Are you sure?',
          text: 'You will not be able to recover this form!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(() => {
          Vue.delete(this.model.forms, key)
          swal(
            'Deleted!',
            'The form has been deleted.',
            'success'
          )
        }, () => {
        })
    },
    getFormType (form) {
      if (Array.isArray(form)) {
        return 'simple'
      } else if (Object.keys(form).length) {
        return 'tabbed'
      }
    },
    getFormFields (form) {
      if (this.getFormType(form) === 'tabbed') {
        var ret = []
        for (let i in form) {
          if (typeof form[i]['fields'] !== 'undefined') {
            ret = ret.concat(form[i]['fields'])
          }
        }

        return ret
      }
      return form
    }
  }
}
