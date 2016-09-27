  import template from './html/model_scope_list_action.html'
  import ModelMixin from '../mixins/ModelMixin'

  export default{
    template,
    name: 'ModelScopeListAction',
    mixins: [ModelMixin],
    data () {
      return {
        action_type: 'method'
      }
    },
    ready () {
      if (typeof this.action.event !== 'undefined' && this.action.event !== '') {
        this.action_type = 'event'
      }

      if (typeof this.action.popup !== 'undefined' && this.action.popup !== '') {
        this.action_type = 'modal'
      }

      if (typeof this.action.ifcolumn === 'undefined') {
        this.action.ifcolumn = ''
      }
    },
    props: [
      'action',
      'scope',
      'key'
    ]
  }
