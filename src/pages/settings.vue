<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link="atrás"></f7-nav-left>
      <div class="title">Configuración</div>
    </f7-navbar>
    

  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7NavLeft, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, 
          f7Button, f7Gauge, f7Row, f7Col, f7Swiper, f7SwiperSlide } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon,
      f7Button,
      f7Gauge,
      f7Row, 
      f7Col,
      f7Swiper, 
      f7SwiperSlide,
      testChart
    },
    data () {
      return {

      }
    },
    beforeMount () {

    },
    mounted () {
        
    },
    created () {
      console.log("Settings created");
    },
    breforeDestroy () {
      console.log("Settings destroyed");
    },
    computed: {

    },
    methods: {

    }
  };
</script>