import TextField from './Text.vue'
import SelectField from './Select.vue'
import SwitchField from './Switch.vue'
import CheckboxField from './Checkbox.vue'
import VButton from './Button.vue'

export const components = {
  TextField,
  SelectField,
  SwitchField,
  CheckboxField,
  VButton
}

export default {
  install (Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name])
    })
  }
}

export {
  TextField,
  SwitchField,
  CheckboxField,
  VButton
}
