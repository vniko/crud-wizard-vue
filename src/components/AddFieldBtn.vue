<template>

  <div class="row pull-right" style="width:100%">

    <div class="col-lg-3 pull-right text-right" v-if="!show_block">
      <a href="#" class="btn btn-primary" @click.prevent="show_block = true"><i class="fa fa-plus"></i>
        Add field</a>
    </div>

    <div class="col-lg-12 text-right" v-else>

        <select class="form-control default_select" style="display:inline; width:250px;"
                v-model="$parent.$parent.new_field_key">
          <option value="">Choose existing database table field</option>
          <option v-for="f in $parent.modelConfig.table_columns | filterBy notUsedField" v-bind:value="f">
            {{ f }}
          </option>
        </select>
      or add a new one <input type="text" style="display:inline; width:150px;" class="form-control"
                              v-model="$parent.$parent.new_field_key_new"/>

        <select class="form-control default_select" id="rtype" v-model.sync="$parent.$parent.new_field_type"
                style="display:inline; width:250px;">
          <option value="">Choose field type</option>

          <option v-for="(val, text) in $parent.$parent.commonConfig.field_options" v-bind:value="val">
            {{ text }}
          </option>

        </select>




      <button class="btn btn-primary" @click.prevent="add()" style="margin-top:-3px;">Add</button>
        <a class="text-danger" @click="cancel()" title="Cancel" style="margin-left:20px;">
          <i class="fa fa-times"></i>
        </a>
    </div>
  </div>
</template>

<script>
  export default{

    data(){
      return {
        show_block: false
      }
    },

    methods: {
      add () {
        this.$parent.$parent.addField()
        this.cancel()
      },
      notUsedField (row) {

        if (typeof this.$parent.model.fields[row] == 'undefined') {
          return true;
        }

        return false;
      },
      cancel () {
        this.show_block = false
      }
    }
  }
</script>
