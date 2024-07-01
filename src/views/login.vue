<template>
  <v-sheet class="bg-deep-dark pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="login">
        <v-text-field
          v-model="auth.username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Username/Email"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="auth.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

import { authService } from "@/service/auth.service";

const form = ref(false);
const auth = ref({
  username: "admin",
  password: "389f89beb8d7",
});

const loading = ref<boolean>(false);
const sessionExpired = ref<boolean>(false);

function onSubmit() {
  if (!form.value) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}
function required(v: string): boolean | string {
  return !!v || "Field is required";
}

function login() {
  // reset the error message
  // clearMessages();
  authService.login(auth.value).then((res) => {
    if (res.data.accessToken == null) {
      alert("登录失败");
    } else {
      let data = {
        token: res.data.accessToken,
        username: auth.value.username,
        role: "",
      };
      localStorage.setItem("userinfo", JSON.stringify(data));
      // // update the authorization header
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.accessToken}`;
    }
    router.push({ path: "/" });
  });

  // extract the user role from the token
  // const userRole = extractUserRoleFromToken(accessToken);

  // call the stores login method this will update the stores state
  // authStore.login(userRole);

  // redirect to the home page
  // await router.push("/");
}
</script>
