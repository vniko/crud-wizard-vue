<template>
 <span class="btn {{btnVariant}} {{btnSize}} {{btnBlock}} {{inactive ? 'btn-inactive' : ''}} {{btnDisabled}}">
	<slot></slot>
</span>
</template>
<style>

</style>
<script>
  export default {
    replace: true,
    computed: {
      btnBlock() {
        return this.block ? `btn-block` : ``
      },
      btnVariant() {
        return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`
      },
      btnSize() {
        return !this.size || this.size === `default` ? `` : `btn-${this.size}`
      },
      btnDisabled() {
        return this.disabled ? 'disabled' : ''
      }
    },
    props: {
      block: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inactive: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'md'
      },
      variant: {
        type: String,
        default: 'default'
      },
    }
  }

</script>
