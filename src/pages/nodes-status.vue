<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">Nodos</div>
    </f7-navbar>
    <f7-block-title>Estados de Nodos</f7-block-title>
    <f7-block strong>
      <f7-block-title>Lista de Nodos Activos</f7-block-title>
        <f7-list>
          <f7-list-item v-for="node in nodes[0]" v-bind:key="node.id" @click="nodeSelected(node)" :title="print('Nodo ', node.nodeID)">
            <f7-badge v-if="node.active" color="white"><f7-icon f7="check" color="green"></f7-icon></f7-badge>
            <f7-badge v-else color="white"><f7-icon f7="close" color="red"></f7-icon></f7-badge>
          </f7-list-item>
        </f7-list>
    </f7-block>
    
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, f7NavLeft, f7Link, f7Badge } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {updateSelectedNode} from '../helpers/globalVar';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon, 
      f7NavLeft, 
      f7Link,
      f7Badge
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
        var self = this;
        self.$f7.dialog.preloader('Cargando Nodos');
        get(
          "nodes", 
          response => {
            self.$f7.dialog.close();
            this.nodes.push(response.data);
            /*
            [ [ { "id": 8, "nodeID": 7, "active": true, "createdAt": "2019-05-30T20:19:08.000Z", "updatedAt": "2019-05-30T20:19:16.000Z" }, { "id": 13, "nodeID": 12, "active": true, "createdAt": "2019-05-30T20:19:08.000Z", "updatedAt": "2019-05-30T20:19:21.000Z" } ] ]
            */
          },
          error => {
            self.$f7.dialog.close();
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
      },
      nodeSelected: function(node) {
        const self = this;
        updateSelectedNode(node, () => {
          self.$f7router.navigate('/nodes/node');
        });
      }
    }
  };
</script>