import ScopeEdit from './ModelScopeEdit'
import AddScopeBtn from './AddScopeBtn.vue'
import template from './html/model_scopes.html'
import ModelMixin from '../mixins/ModelMixin'
import ModelEdit from './ModelEdit'
import swal from 'sweetalert2'

export default {
  name: 'ModelScopes',
  components: {
    ScopeEdit,
    AddScopeBtn,
    ModelEdit
  },
  mixins: [
    ModelMixin
  ],
  template,
  data () {
    return {
      new_scope_alias: ''
    }
  },
  methods: {

    addScope (scope) {
      this.eventHub.$emit('scope::new', scope)
    },

    editScope (alias) {
      this.eventHub.$emit('scope::edit', alias)
    },
    deleteScope (key) {
      swal(
        {
          title: 'Are you sure?',
          text: 'You will not be able to recover this scope!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(() => {

          //Vue.delete(this.model.scopes, key);
          swal(
            'Deleted!',
            'The scope has been deleted.',
            'success'
          )
        }, () => {
        })
    },
    getListCols (list) {
      if (Array.isArray(list)) {
        return list.map((item) => {
          return item.data;
        })
      }

      return []
    }

  }
}
