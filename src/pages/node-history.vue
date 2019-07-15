<template>
  <f7-page>
    <f7-navbar large title="Historial" title-large="Historial" back-link="atrás"></f7-navbar>
    <f7-block-title>Nodo {{selectedNode.nodeID}}</f7-block-title>
    <f7-swiper pagination scrollbar>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempA"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'tempA')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.humidA"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'humidA')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.alcohol"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'alcohol')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, f7Button, f7Swiper, f7SwiperSlide } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon,
      f7Button, 
      f7Swiper, 
      f7SwiperSlide,
      testChart
    },
    data () {
      return {
        selectedNode: {},
        datacollection: {
            tempA: null,
            tempB: null,
            tempC: null,
            humidA: null,
            humidB: null,
            humidC: null,
            alcohol: null,
        },
        testData: [],
        responseData: ''
      }
    },
    beforeMount () {

    },
    mounted () {
      this.selectedNode = getSelectedNode();
      console.log("Node history mounted");
    },
    created () {
      console.log("Node history created");
    },
    breforeDestroy () {
      console.log("Node history destroyed");
    },
    computed: {

    },
    methods: {
      getDataHistory: function (node, variable) {
        const self = this;
        var chartOptions = {
          labels: [],
          datasets: [
            {
              label: 'Temperatura',
              backgroundColor: '#61df19',
              data: []
            }
          ]
        };
        var source = "nodes/" + String(node) + "/history/" + variable;
        self.$f7.dialog.preloader('Recopilando Data');
        get(
          source, 
          response => {
            var i = 0;
            var inData = response.data;
            this.responseData = JSON.stringify(response.data);
            for (i=0; i<inData.length; i++) {
              chartOptions.labels.push(String(i));
              chartOptions.datasets[0].data.push(inData[i][variable]);
              this.testData.push(inData[i][variable]);
            }
            self.$f7.dialog.close();
            this.datacollection[variable] = chartOptions;
          },
          error => {
            self.$f7.dialog.close();
            console.log("Error al hacer http request: ", error);
          }
        )
      }
    }
  };
</script>