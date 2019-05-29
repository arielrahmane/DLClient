<template>
    <f7-page name="home">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Ariel DL</div>
            <f7-nav-right>
                <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fas fa-search"></f7-link>
            </f7-nav-right>
            <f7-searchbar class="searchbar-components" search-container=".components-list" search-in="a" expandable></f7-searchbar>
        </f7-navbar>
        <f7-block-title>Bienvenido a Data Logger</f7-block-title>
        <f7-block inner>
            <p>Este es un Data Logger.</p>
        </f7-block>
        <f7-block-title class="searchbar-hide-on-search">Prueba de lista</f7-block-title>
        <f7-list class="searchbar-hide-on-search">
            <f7-list-item v-bind:title="title"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon } from 'framework7-vue';
  import {get} from '../helpers/api';
  export default {
    name: "HomePage",
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7NavTitle,
      f7NavTitleLarge,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Link,
      f7Searchbar,
      f7Icon,
      f7Block
    },
    data () {
      return {
        title: "hola",
        description: ""
      }
    },
    beforeMount () {

    },
    mounted () {
      this.getTest();
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
      getTest: function () {
        get(
          "", 
          response => {
            console.log(response.data);
            this.title = response.data.title;
            this.description = response.data.description;
          },
          error => {
            console.log("Error al hacer http request: ", error);
          }
        )
      }
    }
  };
</script>
