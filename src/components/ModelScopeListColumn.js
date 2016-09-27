import ModelMixin from '../mixins/ModelMixin'
import template from './html/model_scope_list_column.html'
import VuexActions from '../vuex/actions'

export default {
  template,
  name: 'ModelScopeListColumn',
  data () {
    return {
      data_type: 'prop',
      relation: '',
      relation_prop: '',
      relation_attrs: [],
      data_fields: [],
    }
  },
  mixins: [ModelMixin],
  props: [
    'column',
    'key'
  ],
  ready () {
    if (this.column.data.indexOf('::') >= 0) {
      this.data_type = 'rel'
      this.relation = this.column.data.split('::')[0];
      this.relation_prop = this.column.data.split('::')[1];
    }
    this.data_fields = this.modelConfig.attrs.uniqueMerge(Object.keys(this.model.fields)).sort();
  },
  watch: {
    'relation': function (val, prev) {
      if (prev) {
        this.relation_prop = ''
      }
      if (val) {
        var model = this.model.fields[val].model
        if (typeof model !== 'undefined') {
          var pageUrl = VuexActions.apiUrl + 'getModelAttributes'
          this.$http.get(pageUrl, {params: {args: [model]}}).then((resp) => {
            this.$set('relation_attrs', resp.json())
          })
        }
        this.column.data = val + '::' + this.relation_prop
      }
    },
    'relation_prop': function (val, prev) {
      this.column.data = this.relation + '::' + this.relation_prop
    }
  },

  methods: {
    deleteListCol (key) {
      this.eventHub.$emit('scope::delete_list_col', key)
    }
  }
}
