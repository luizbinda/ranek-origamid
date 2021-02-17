<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click.prevent="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
          <button  class="btn btn-form" @click.prevent="enviar">
            Criar Usuário
          </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';

export default {
  name: 'LoginCriar',
  data() {
    return { criar: false };
  },
  components: { UsuarioForm },
  methods: {
    async enviar() {
      this.$children[0].enviar();
      await this.$store.dispatch('criarUsuario', this.$store.state.usuario);
      await this.$router.push({ name: 'usuario' });
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
