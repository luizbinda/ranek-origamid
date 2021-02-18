<template>
  <section>
    <transition mode="out-in">
      <UsuarioForm >
        <button
          v-if="!loginRequest"
          class="btn"
          @click.prevent="atualizarUsuario"
        >Atualizar Usuário</button>
        <PaginaCarregando v-else/>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import api from '@/api';
import { mapState } from 'vuex';
import { setState } from '@/helpers';

export default {
  components: { UsuarioForm },
  methods: {
    atualizarUsuario() {
      this.$children[0].enviar();
      setState(this.$store, 'loginRequest', true);
      api.put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch('getUsuario');
          setState(this.$store, 'loginRequest', false);
          this.$router.push({ name: 'usuario-produtos' });
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
