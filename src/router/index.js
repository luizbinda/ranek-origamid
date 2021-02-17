import Vue from 'vue';
import VueRouter from 'vue-router';
import Produto from '@/views/Produto.vue';
import { numeroPreco } from '@/helpers';
import Login from '@/views/Login.vue';
import Usuario from '@/views/Usuario/Usuario.vue';
import UsuarioProdutos from '@/views/Usuario/UsuarioProdutos.vue';
import UsuarioCompras from '@/views/Usuario/UsuarioCompras.vue';
import UsuarioVendas from '@/views/Usuario/UsuarioVendas.vue';
import UsuarioEditar from '@/views/Usuario/UsuarioEditar.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.filter('numeroPreco', numeroPreco);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: Usuario,
    children: [
      {
        path: '',
        name: 'usuario',
        component: UsuarioProdutos,
      },
      {
        path: 'compras',
        name: 'compras',
        component: UsuarioCompras,
      },
      {
        path: 'vendas',
        name: 'vendas',
        component: UsuarioVendas,
      },
      {
        path: 'editar',
        name: 'usuario-editar',
        component: UsuarioEditar,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
