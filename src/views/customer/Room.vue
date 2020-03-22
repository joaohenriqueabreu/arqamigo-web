<template>
  <div class="vertical">
      <form v-if="hasRoom" @submit.prevent="update">
        <div class="group text-left bg-white">
          <label for="title">Title</label>
          <input type="title" v-model="getRoom.title" name="title">
        </div>   
        <submit-button ref="submit">Atualizar</submit-button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async created() {
    await this.loadRoom(this.$route.params.id);
  },
  methods: {
    ...mapActions(['loadRoom']),
    update() {
      this.$swal("updating room");
      this.$refs.submit.disable();
    }
  },
  computed: {
    ...mapGetters(['hasRoom', 'getRoom'])
  }
}
</script>

<style>

</style>