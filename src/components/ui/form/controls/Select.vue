<template>
  <fieldset class="form-group {{inputState}}">
    <label for="{{id}}" v-if="label" class="control-label">{{label}}</label>
    <!-- single select -->
    <select class="form-control {{inputSize}}" id="{{id}}" v-model="model" options="allOptions" v-if="!multiple">
      <option v-for="(k,v) in allOptions" v-bind:value="k">{{option.text}}</option>
    </select>
    <small class="text-muted" v-if="description" v-html="description"></small>
  </fieldset>

</template>

<script>
  // import dependencies
  import {makeid} from '../../../../helpers'

  // export component object
  export default {
    replace: true,
    computed: {
      allOptions(){
        var defOp = {}
        if
        if (this.defaultOption.text && this.defaultOption.value) {
          return [this.defaultOption].concat()
        }
        return this.options
      },
      inputState() {
        return !this.state || this.state === `default` ? `` : `has-${this.state}`
      },
      inputSize() {
        return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
      },
    },
    props: {
      model: {
        twoWay: true,
        required: true
      },
      options: {
        type: Array,
        default: [],
        required: true,
      },
      id: {
        type: String,
        default: makeid
      },
      label: {
        type: String,
        default: false
      },
      defaultOption: {
        type: String
      },
      defaultOptionValue: {
        type: String
      },
      description: {
        type: String,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      state: {
        type: String,
        default: ''
      },
    },
    watch: {
      model(val, oldVal) {
        if (val === oldVal) return
        // Dispatch an event from the current vm that propagates all the way up to it's $root
        this.$dispatch('selected::option', val)
      }
    }
  }

</script>
