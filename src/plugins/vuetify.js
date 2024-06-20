import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// import theme from "./theme.js";
const vuetify = createVuetify({
    // directives,
    theme: {
        defaultTheme: "dark",
    },
    icons: {
        defaultSet: "mdi",
    },
    defaults: {
        VTextField: {
            variant: "outlined",
        },
    },
});

export default vuetify;
