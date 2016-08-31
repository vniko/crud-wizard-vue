<template>
<span class="label {{labelVariant}} {{labelType}}">
	<slot></slot>
</span>
</template>
<style>
</style>
<script>

  export default {
    replace: true,
    computed: {
      labelVariant() {
        return !this.variant || this.variant === `default` ? `label-default` : `label-${this.variant}`
      },
      labelType() {
        return !this.type ? `` : `label-${this.type}`
      }
    },
    props: {
      variant: {
        type: String,
        default: 'default'
      },
      type: {
        type: String,
        default: ''
      }
    }
  }

</script>
