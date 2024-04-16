import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// import * as components from 'vuetify/components'
import theme from './theme.ts'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
    // directives,
    theme,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
    defaults: {
        VTextField: {
          variant: 'outlined',
        },
    }
  })

  export default vuetify