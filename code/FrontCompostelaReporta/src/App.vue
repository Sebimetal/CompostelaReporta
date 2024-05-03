<script>
import Header from './components/subcomponents/Header.vue';
import BotonEngadir from './components/subcomponents/BotonEngadir.vue';
import Mainpage from './components/fullpage/Mainpage.vue';
import CreateIssue from './components/fullpage/CreateIssue.vue';
export default {
  data() {
    return {
      selectedComponent: 'Mainpage',
    };
  },
  components: {
    Mainpage,
    Header,
    CreateIssue,
    BotonEngadir,
  },
  methods: {
    changeComponent(component) {
      this.selectedComponent = component;
    },
  },
};
</script>

<template>
  <Header @componentChange="changeComponent" class="mb-4"></Header>
  <component :is="this.selectedComponent"></component>
  <BotonEngadir
    v-if="this.selectedComponent != 'CreateIssue'"
    @componentChange="changeComponent"
  ></BotonEngadir>
</template>

<style></style>
