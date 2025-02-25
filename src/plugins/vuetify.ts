import { createVuetify } from "vuetify";
//import "vuetify/styles";
import "@/styles/settings.scss";
import "@/styles/overrides.scss";
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
