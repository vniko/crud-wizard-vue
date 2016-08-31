import Badge from './controls/Badge.vue'
import Tabs from './controls/Tabs.vue'
import Tab from './controls/Tab.vue'


export const components = {
  Badge,
  Tabs,
  Tab
}

export default {
  install (Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name])
    })
  }
}

export {
  Badge,
  Tabs,
  Tab
}
