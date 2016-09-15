<template>
  <div class="row pull-right" style="width:50%">

    <div class="col-lg-1 pull-right" v-if="chooseType" style="padding-top:10px;">
      <a class="text-danger" @click="cancel()" title="Cancel">
        <i class="fa fa-times"></i>
      </a>
    </div>

    <div class="col-lg-6 pull-right"  v-if="chooseType">
      <select class="form-control" v-model="type" >
        <option value="">-- Choose relation type</option>
        <option value="k" v-for="(k,v) in $parent.commonConfig.relation_options" v-bind:value="k" >{{ v }}</option>
      </select>
    </div>

    <div class="col-lg-3 pull-right"  v-if="!chooseType">
      <button class="btn btn-primary"   @click="chooseType=true">
        <i class="fa fa-plus"></i> Add relation
      </button>
    </div>
   </div>
</template>
<script>
  import store from '../vuex/store'

  export default {
    store,
    data () {
      return {
        type: '',
        chooseType: false,
      }
    },
    watch: {
      'type': function (val) {
        if (val) {
          this.addNew()
        }
      }
    },
    methods: {
      addNew () {
        this.$dispatch('relation::add', this.type)
        this.type = ''
        this.chooseType = false
      },
      cancel () {
        this.chooseType = false
        this.type = ''
      }
    }
  }
</script>
