<template>
  <div class="row pull-right text-right" style="width:100%; margin-bottom:15px;">
    <div class="col-lg-6 pull-right text-right">
      <select class="form-control default_select" style="display:inline; width:250px;" v-model="scope">
        <option value="">Choose model scope</option>
        <option v-for="s in $parent.modelConfig.scopes | filterBy notUsedScope" v-bind:value="s.name">
          {{ s.method }} ({{ s.description }})
        </option>
      </select>
      <a href="#" style="margin-top:-3px;" class="btn btn-primary" @click.prevent="addScope(scope)"><i class="fa fa-plus"></i>
        Add scope</a>
    </div>
  </div>
</template>

<script>

  export default{

    data() {
      return {
        scope: ''
      }
    },
    methods: {
      addScope (scope) {
        if (alias === '') {
          swal('Oh no : (', 'Please, choose model scope first.', 'warning');
          return false;
        }

        this.$parent.$parent.addScope(scope);

      },
      notUsedScope (row) {

        if (typeof this.$parent.model.scopes[row.name] == 'undefined') {
          return true
        }

        return false
      }
    }
  }
</script>
