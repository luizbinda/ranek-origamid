<template>
  <section>
    <transition mode="out-in">
      <div v-if="compras">
        <h2>Compras</h2>
        <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
          <ProdutoItem v-if="compra.produto" :produto="compra.produto">
            <p class="vendedor">
              <span>Vendedor:</span>
              {{compra.vendedor_id}}
            </p>
          </ProdutoItem>
        </div>
        <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
      </div>
      <PaginaCarregando v-else/>
    </transition>
  </section>
</template>

<script>
import ProdutoItem from '@/components/ProdutoItem.vue';
import api from '@/api';
import { mapState } from 'vuex';
import ProdutosPaginar from '@/components/ProdutosPaginar.vue';
import serialize from '@/helpers';

export default {
  components: {
    ProdutosPaginar,
    ProdutoItem,
  },
  data() {
    return {
      compras: null,
      produtosPorPagina: 3,
      produtosTotal: 0,
    };
  },
  computed: {
    ...mapState(['usuario', 'login']),
    url() {
      const query = serialize(this.$route.query);
      return `/transacao?comprador_id=${this.usuario.id}&_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    getCompras() {
      this.compras = null;
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers['x-total-count']);
        this.compras = response.data;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
    url() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
