import template from './html/model_general.html'
import ModelMixin from '../mixins/ModelMixin'
import ModelEdit from './ModelEdit'

export default {
  template,
  name: 'General',
  data () {
    return {
    }
  },
  mixins: [
    ModelMixin
  ],
  components: {
    ModelEdit
  }
}

