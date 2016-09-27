import ModelMixin from '../mixins/ModelMixin'
import template from './html/model_scope_edit.html'
import Modal from './ui/Modal.vue'
import VuexActions from '../vuex/actions'
import $ from 'jquery'
import ListColumn from './ModelScopeListColumn'
import ListAction from './ModelScopeListAction'
import Vue from 'vue'
import swal from 'sweetalert2'

export default {

  name: 'ModelScopeEdit',
  template,
  mixins: [ModelMixin],
  components: {
    Modal,
    ListColumn,
    ListAction
  },
  data () {
    return {
      scopeKey: '',
      edit: false,
      scope: {},
      newSortField: '',
      newSortDir: 'asc',
      newScope: {
        title: '',
        form: '',
        multiselect: true,
//                    list:[],
//                    list_actions:[],
        buttons: {
          add_new: true,
          single_edit: true,
          single_delete: true,
          mass_delete: true,
          customize_columns: false
        }
      },

      sortableColOptions: {
        handle: '.drag_cols',
        onUpdate: (evt) => {
          this.scope.list.move(evt.oldIndex, evt.newIndex);
        }
      }
    }
  },

  events: {
    // FIXME remove event
    'list_action::delete' (key) {
      this.deleteListAction(key)
    }
  },
  beforeDestroy: function () {
    this.eventHub.$off('scope::edit', this.editScope)
    this.eventHub.$off('scope::new', this.addScope)
    this.eventHub.$off('scope::delete_list_col', this.deleteListColumn)
  },
  created () {
    this.initEmptyScope()
    this.eventHub.$on('scope::edit', this.editScope)
    this.eventHub.$on('scope::new', this.addScope)
    this.eventHub.$on('scope::delete_list_col', this.deleteListColumn)
  },
  methods: {

    addScope (scope) {
      this.initEmptyScope(scope)
      this.$refs.popup.show()
    },

    editScope (key) {
      this.edit = true
      this.scopeKey = key
      this.$refs.popup.show()
      this.initEditScope(key)
    },

    addAction () {
      if (typeof this.scope.list_actions === 'undefined') {
        this.$set('scope.list_actions', [])
      }

      this.scope.list_actions.push({title: 'New action'})
    },

    addColumn () {
      if (typeof this.scope.list === 'undefined') {
        this.$set('scope.list', [])
      }

      this.scope.list.push({data: '', format: ''});
    },
    addSortOption () {
      if (this.newSortField === '') {
        swal('Choose column', '', 'warning')
        return false
      }
      if (typeof this.scope.sort === 'undefined') {
        this.$set('scope.sort', {})
      }
      Vue.set(this.scope.sort, this.newSortField, this.newSortDir)
      this.newSortField = ''
      this.newSortDir = 'asc'
    },

    removeSortOption (f) {
      swal(
        {
          title: 'Are you sure?',
          text: '',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(() => {
          Vue.delete(this.scope.sort, f)
        }, () => {
        })
    },
    deleteListAction (key) {
      swal(
        {
          title: 'Are you sure?',
          text: 'You will not be able to recover this action!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(() => {
          this.scope.list_actions.splice(key, 1)
        }, () => {
        })

    },
    deleteListColumn (key) {
      alert(key);
      swal(
        {
          title: 'Are you sure?',
          text: 'You will not be able to recover this column!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(() => {
          this.scope.list.splice(key, 1)
        }, () => {
        })

    },
    initEditScope (key) {
      this.$set('scope', JSON.parse(JSON.stringify(this.model.scopes[key])))
    },
    initEmptyScope (alias) {
      if (alias) {
        this.$set('scopeKey', alias);
      }
      this.$set('scope', this.newScope);
    },
    hide () {
      this.$refs.popup.hide()
    },
    save () {
      VuexActions.validateForm($('form#scope_form'), () => {
        if (!Object.keys(this.model.scopes).length) {
          let scopes = {};
          scopes[this.scopeKey] = JSON.parse(JSON.stringify(this.scope));
          alert('fixme 0');
          this.$set('model.scopes', scopes);
        } else {
          alert('fixme');
          //Vue.set(this.model.scopes, this.scopeKey, JSON.parse(JSON.stringify(this.scope)));
        }
        this.hide()
      })
    }
  }
}
