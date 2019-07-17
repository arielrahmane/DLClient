<template>
  <f7-page>

    <f7-navbar large title="Historial" title-large="Historial" back-link="atrás"></f7-navbar>
    <f7-block-title>Nodo {{selectedNode.nodeID}}</f7-block-title>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button @click="slidePrev()">
            <f7-icon f7="chevron_left"></f7-icon>Anterior
          </f7-button>
        </f7-col>
        <f7-col>
          <f7-button sheet-open=".demo-sheet-swipe-to-close">Opciones</f7-button>
        </f7-col>
        <f7-col>
          <f7-button @click="slideNext()">
            Siguiente<f7-icon f7="chevron_right"></f7-icon>
          </f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      backdrop
    >
      <f7-page-content>
        <f7-button @click="closeSheet()">
            <f7-icon f7="chevron_down"></f7-icon>
          </f7-button>
        <f7-block>
          <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab...</p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <f7-swiper pagination scrollbar>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempA"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'tempA')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempB"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'tempB')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempC"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'tempC')">Actualizar</f7-button>
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
                <test-chart :chart-data="datacollection.humidB"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'humidB')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.humidC"></test-chart>
                <f7-button @click="getDataHistory(selectedNode.nodeID, 'humidC')">Actualizar</f7-button>
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
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, f7Button, f7Swiper, 
          f7SwiperSlide, f7Col, f7Row, f7Sheet, f7PageContent } from 'framework7-vue';
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
      f7Col, 
      f7Row, 
      f7Sheet, 
      f7PageContent,
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
      this.initCharts();
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
        var options = this.getSensorTypeOpt(variable);
        var chartOptions = {
          labels: [],
          datasets: [
            {
              label: options.label,
              backgroundColor: options.backgroundColor,
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
      },
      slideNext: function() {
        this.$f7.swiper.get('.swiper-container').slideNext();
      },
      slidePrev: function() {
        this.$f7.swiper.get('.swiper-container').slidePrev();
      },
      getSensorTypeOpt: function(type) {
        switch (type) {
          case "tempA":
            return {label: "Temperatura Sensor A", backgroundColor: '#DF0101'};
            break;
          case "tempB":
            return {label: "Temperatura Sensor B", backgroundColor: '#DF0101'};
            break;
          case "tempC":
            return {label: "Temperatura Sensor C", backgroundColor: '#DF0101'};
            break;
          case "humidA":
            return {label: "Humedad Sensor A", backgroundColor: '#0431B4'};
            break;
          case "humidB":
            return {label: "Humedad Sensor B", backgroundColor: '#0431B4'};
            break;
          case "humidC":
            return {label: "Humedad Sensor C", backgroundColor: '#0431B4'};
            break;
          case "alcohol":
            return {label: "Concentración de Alcohol", backgroundColor: '#31B404'};
            break;
          default:
            return {label: "Indefinido", backgroundColor: '#31B404'};
            break;
        }
      },
      initCharts: function() {
        var variables = [
          "tempA",
          "tempB",
          "tempC",
          "humidA",
          "humidB",
          "humidC",
          "alcohol"
        ];
        for (var i = 0; i < 7; i++) {
          var options = this.getSensorTypeOpt(variables[i]);
          var chartOptions = {
            labels: [],
            datasets: [
              {
                label: options.label,
                backgroundColor: options.backgroundColor,
                data: []
              }
            ]
          };
          this.datacollection[variables[i]] = chartOptions
        }
      },
      closeSheet: function() {
        this.$f7.sheet.close();
      }
    }
  };
</script>