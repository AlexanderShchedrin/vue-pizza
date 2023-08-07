<template>
  <div class="modal">
    <div class="modal__wrapper">
      <div class="sign-form">
        <a
          href="#"
          class="close close--white"
          tabindex="0"
          ref="dialog"
          @click.self="closeDialog"
          @keydown.esc="closeDialog"
        >
          <span class="visually-hidden">Закрыть форму авторизации</span>
        </a>
        <div class="sign-form__body">
          <div class="sign-form__title">
            <h1 class="title title--small">Авторизуйтесь на сайте</h1>
          </div>
          <form action="test.html" method="post">
            <div class="sign-form__input">
              <label class="input">
                <span>E-mail</span>
                <input type="email" name="email" placeholder="example@mail.ru">
              </label>
            </div>

            <div class="sign-form__input">
              <label class="input">
                <span>Пароль</span>
                <input type="password" name="pass" placeholder="***********">
              </label>
            </div>
            <button type="submit" class="button">Авторизоваться</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

const router = useRouter()
const route = useRoute()

const dialog = ref(null)

onMounted(() => {
  // Фокусируем на диалоговом окне чтобы сработала клавиша esc без дополнительного клика на окне
  dialog.value.focus()
})

const closeDialog = function () {
  router.push('/')
}

</script>
<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
@import "@/assets/scss/modal";

.content {
  padding-top: 20px;
}

.sign-form {
  display: block;
  box-sizing: border-box;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  background-size: 100%;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__body {
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

</style>
