<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <DoughSelector
          :items="doughItems"
          v-model="pizza.dough"
        />
        <DiameterSelector
          :items="sizeItems"
          v-model="pizza.size"
        />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
              <SauceSelector
                :items="sauceItems"
                v-model="pizza.sauce"
              />
             <IngredientsSelector
                :items="ingredientItems"
                :values="pizza.ingredients"
                @update="updateIngredientAmount"
             />
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
          </label>
          <PizzaConstructor
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredients="pizza.ingredients"
            @drop="addIngredient"
          />
          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>
<script setup>
import DoughSelector from '@/modules/constructor/DoughSelector.vue';

import doughJSON from '@/mocks/dough.json';
import saucesJSON  from '@/mocks/sauces.json';
import ingredientsJSON  from '@/mocks/ingredients.json';
import sizesJSON  from '@/mocks/sizes.json';

import {normalizeDough, normalizeSauces, normalizeIngredients, normalizeSize} from "@/common/helpers/normalize";
import DiameterSelector from '@/modules/constructor/DiameterSelector.vue';
import SauceSelector from '@/modules/constructor/SauceSelector.vue';
import IngredientsSelector from '@/modules/constructor/IngredientsSelector.vue';
import PizzaConstructor from '@/modules/constructor/PizzaConstructor.vue';
import { computed, reactive } from 'vue';

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSize);

const pizza = reactive({
  name: '',
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  ingredients: ingredientItems.reduce((acc, item) => {
    acc[item.value] = 0;
    return acc;
  }, {}),
});

const price = computed(() => {
  const { dough, size, sauce, ingredients } = pizza;

  const sizeMultiplier =
    sizeItems.find((item) => item.value === size)?.multiplier ?? 1;

  const doughPrice =
    doughItems.find((item) => item.value === dough)?.price ?? 0;

  const saucePrice =
    sauceItems.find((item) => item.value === sauce)?.price ?? 0;

  const ingredientsPrice = ingredientItems
    .map((item) => ingredients[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
  return pizza.name.length === 0 || price.value === 0;
});

const addIngredient = (ingredient) => {
  pizza.ingredients[ingredient]++;
};

const updateIngredientAmount = (ingredient, count) => {
  pizza.ingredients[ingredient] = count;
};

const getImage = (image) => new URL(`@/assets/img/${image}`, import.meta.url).href;

</script>
<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
