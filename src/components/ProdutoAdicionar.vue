<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome">
    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos">
    <label for="Descricao">Descrição</label>
    <textarea id="Descricao" name="preco" v-model="produto.descricao"></textarea>
    <input
      class="btn"
      type="button"
      value="Adicionar Produto"
      @click.prevent="adicionarProduto"
      v-if="!loginRequest"
    >
    <PaginaCarregando class="carregando"  v-else />
    </form>
</template>

<script>
import api from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'ProdutoAdicionar',
  data() {
    return {
      produto: {
        nome: '',
        preco: '',
        descricao: '',
        fotos: null,
      },
    };
  },
  methods: {
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
    adicionarProduto() {
      this.$store.commit('SET_STATE', { stateName: 'loginRequest', data: true });
      this.formatarProduto();
      api.post('/produto', this.produto).then(() => {
        this.$store.dispatch('getUsuarioProdutos');
      });
    },
  },
  computed: {
    ...mapState(['loginRequest']),
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}

.carregando {
  grid-column: 2;
}
</style>
