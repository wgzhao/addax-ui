import { createVuetify } from "vuetify";
import "vuetify/styles";
import theme from "./theme";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
    // directives,
    theme,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    defaults: {
        VTextField: {
            variant: "outlined",
        },
    },
});

export default vuetify;
