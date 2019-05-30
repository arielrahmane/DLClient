<template>
  <f7-page>
    <f7-navbar large title="Estados de Nodos" title-large="Estados de Nodos" back-link="Framework7"></f7-navbar>
    <f7-block-title>Estados de Nodos</f7-block-title>
    <f7-block strong>
      <f7-block-title>Links</f7-block-title>
        <f7-list>
          <f7-list-item v-for="node in nodes[0]" link="#" :title="print('Nodo ', node.nodeID)" :after="isActive(node.active)"></f7-list-item>
        </f7-list>
    </f7-block>
    
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon } from 'framework7-vue';
  import {get} from '../helpers/api';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon
    },
    data () {
      return {
        nodes: []
      }
    },
    beforeMount () {

    },
    mounted () {
      this.getActiveNodes();
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
      getActiveNodes: function () {
        get(
          "nodes", 
          response => {
            this.nodes.push(response.data);
            /*
            [ [ { "id": 8, "nodeID": 7, "active": true, "createdAt": "2019-05-30T20:19:08.000Z", "updatedAt": "2019-05-30T20:19:16.000Z" }, { "id": 13, "nodeID": 12, "active": true, "createdAt": "2019-05-30T20:19:08.000Z", "updatedAt": "2019-05-30T20:19:21.000Z" } ] ]
            */
          },
          error => {
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      print: function(text, value) {
        return text + String(value);
      },
      isActive: function(value) {
        if (value) return "Activo";
        else return "Inactivo";
      }
    }
  };
</script>