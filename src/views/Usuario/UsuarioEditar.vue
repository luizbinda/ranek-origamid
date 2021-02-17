<template>
  <section>
    <UsuarioForm >
      <button
        v-if="!loginRequest"
        class="btn"
        @click.prevent="atualizarUsuario"
      >Atualizar Usuário</button>
      <PaginaCarregando v-else/>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import api from '@/api';
import { mapState } from 'vuex';

export default {
  components: { UsuarioForm },
  methods: {
    atualizarUsuario() {
      console.log(this.$children);
      this.$children[0].enviar();
      api.put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch('getUsuario');
          this.$router.push({ name: 'usuario' });
        }).catch((error) => {
          console.log(error.response);
        });
    },
  },
  computed: {
    ...mapState(['loginRequest']),
  },
};
</script>

<style>
</style>
