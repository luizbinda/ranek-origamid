<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UsuarioForm>
      <button v-if="loadUserInfo" class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
      <PaginaCarregando v-else/>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import { mapState } from 'vuex';
import api from '@/api';
import { setState } from '@/helpers';

export default {
  name: 'FinalizarCompra',
  components: {
    UsuarioForm,
  },
  props: ['produto'],
  computed: {
    ...mapState(['usuario', 'loginRequest']),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
    loadUserInfo() {
      return !this.loginRequest;
    },
  },
  methods: {
    criarTransacao() {
      return api.post('/transacao', this.compra).then(() => {
        this.$router.push({ name: 'compras' });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch('criarUsuario', this.$store.state.usuario);
        await this.$store.dispatch(
          'getUsuario',
          this.$store.state.usuario.email,
        );
        await this.criarTransacao();
      } catch (error) {
        console.log(error);
      }
    },
    async finalizarCompra() {
      setState(this.$store, 'loginRequest', true);
      if (this.$store.state.login) {
        await this.criarTransacao();
      } else {
        await this.criarUsuario();
      }
      setState(this.$store, 'loginRequest', false);
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
