import { createVuetify } from "vuetify";
import "vuetify/styles";
import customTheme from "./theme";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: customTheme,
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
  defaults: {
    VTextField: {
      variant: "outlined"
    }
  }
});
