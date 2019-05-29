<template>
  <f7-page>
    <f7-navbar large title="Estados de Nodos" title-large="Estados de Nodos" back-link="Framework7"></f7-navbar>
    <f7-block-title>Estados de Nodos</f7-block-title>
    
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
    },
    data () {
      return {
        
      }
    },
    beforeMount () {

    },
    mounted () {
      console.log("HomePage mounted");
    },
    created () {
      console.log("HomePage created");
    },
    breforeDestroy () {
      console.log("HomePage destroyed");
    },
    computed: {

    },
    methods: {
      
    }
  };
</script>