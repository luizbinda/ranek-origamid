<template>
  <section>
    <transition mode="out-in">
      <div v-if="vendas">
        <h2>Vendas</h2>
        <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
          <ProdutoItem v-if="venda.produto" :produto="venda.produto">
            <p class="vendedor">
              <span>Comprador:</span>
              {{venda.comprador_id}}
            </p>
          </ProdutoItem>
          <div class="entrega">
            <h3>Entrega:</h3>
            <ul v-if="venda.endereco">
              <li v-for="(value, key) in venda.endereco" :key="key">{{key}}: {{value}}</li>
            </ul>
          </div>
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
      vendas: null,
      produtosPorPagina: 3,
      produtosTotal: 0,
    };
  },
  computed: {
    ...mapState(['usuario', 'login']),
    url() {
      const query = serialize(this.$route.query);
      return `/transacao?vendedor_id=${this.usuario.id}&_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    getVendas() {
      this.vendas = null;
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers['x-total-count']);
        this.vendas = response.data;
      });
    },
  },
  watch: {
    login() {
      this.getVendas();
    },
    url() {
      this.getVendas();
    },
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
  },
};
</script>

<style scoped>
.produtos-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}
</style>
