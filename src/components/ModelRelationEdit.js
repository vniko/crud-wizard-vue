import ModelMixin from '../mixins/ModelMixin'
import template from './html/model_relation_edit.html'
import VuexActions from '../vuex/actions'
import Modal from './ui/Modal.vue'

export default {
  template,
  name: 'ModelRelationEdit',
  mixins: [ModelMixin],
  components: {
    Modal
  },
  data () {
    return {
      empty_relation: {
        title: '',
        relation: '',
        model: '',
        on_delete: '',
        field: '',
        editable: false,
        type: '',
        find: '',
        pivot: 0,
        pivot_table: '',
        pivot_self_key: '',
        pivot_foreign_key: '',
        required: false
      },
      relationModel: {
        columns: [],
        find_methods: []
      },
      relation: {},
      editTypes: {},
      pivot_columns: [],
      edit: false
    }
  },

  events: {

    'relation::new' (type) {
      this.initEmptyRelation()
      this.relation.relation = type
      this.$refs.popup.show()
    },

    'relation::edit' (key) {
      this.edit = true
      this.relation = Object.assign({}, this.empty_relation, JSON.parse(JSON.stringify(this.model.fields[key])))
      this.relation.key = key
      this.$refs.popup.show()
    }
  },

  beforeCompile () {
    this.initEmptyRelation()
  },

  methods: {
    initEmptyRelation () {
      this.relation = Object.assign({}, this.empty_relation)
      this.edit = false
    },

    close () {
      this.$refs.popup.hide()
      this.initEmptyRelation()
    },

    save () {


      // if (this.$refs.form.validate()) {
      //
      // }

      VuexActions.validateForm($('form#relation_form'), () => {
        let relation = Object.assign({}, this.relation)
        if (relation.find === '') {
          delete relation.find
        }
        if (relation.on_delete === '') {
          delete relation.on_delete
        }
        if (relation.relation !== 'belongsToMany') {
          delete relation.pivot
          delete relation.pivot_foreign_key
          delete relation.pivot_self_key
          delete relation.pivot_table
        }

        this.$store.dispatch('SET_FIELD',relation.key, relation)

        this.$refs.popup.hide()

        if (!this.edit) {
          swal(
            'Well done!',
            'You\'ve just added a new relation',
            'success'
          )
        }
      })
    }

  },

  watch: {

    'addRelation': function (value) {

      alert('1111');
      alert(value);
    },

    'relation.relation': function (value) {
      if (value) {
        var pageUrl = VuexActions.apiUrl + 'getAvailableRelationFieldTypes'
        this.$http.get(pageUrl, {params: {args: [value]}}).then((resp)=> {
          this.$set('editTypes', resp.json())
        })
      }
    },
    'relation.model': function (value) {
      if (value) {
        var pageUrl = VuexActions.apiUrl + 'getRelationModelData'
        this.$http.get(pageUrl, {params: {args: [value]}}).then((resp)=> {
          this.$set('relationModel', resp.json())
        })
      }
    },
    'relation.pivot_table': function (value) {
      if (value) {
        var pageUrl = VuexActions.apiUrl + 'getWizardTableColumns'
        this.$http.get(pageUrl, {params: {args: [value]}}).then((resp)=> {
          this.$set('pivot_columns', resp.json())
        })
      }
    }
  }

}

