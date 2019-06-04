import Home from './pages/home.vue';
import AboutPage from './pages/about.vue';
import NodesStatus from './pages/nodes-status.vue';
import NodeData from './pages/node-data.vue';


import PanelLeftPage from './pages/panel-left.vue';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/nodes/',
    component: NodesStatus
  },
  {
    path: '/nodes/node',
    component: NodeData
  }
];
