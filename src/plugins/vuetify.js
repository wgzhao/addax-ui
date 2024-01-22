import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import theme from './theme.js'
const vuetify = createVuetify({
    components,
    // directives,
    theme,
    icons: {
      defaultSet: 'mdi',
    },
    defaults: {
        VTextField: {
          variant: 'outlined',
        },
    }
  })

  export default vuetify