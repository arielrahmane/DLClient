<template>
  <f7-page>
    <f7-block-title>Left Panel</f7-block-title>
    
    <f7-block-title>Main View Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/" title="Inicio" panel-close></f7-list-item>
      <f7-list-item link="/about/" title="Información" panel-close></f7-list-item>
      <f7-list-item link="/nodes/" title="Nodos" panel-close></f7-list-item>
      <f7-list-item link="/settings/" title="Configuración" panel-close></f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  import { f7Page, f7Block, f7BlockTitle, f7List, f7ListItem, f7Link } from "framework7-vue";
  export default {
    components: {
      f7Page, 
      f7Block, 
      f7BlockTitle, 
      f7List, 
      f7ListItem,
      f7Link
    }
  };
</script>
