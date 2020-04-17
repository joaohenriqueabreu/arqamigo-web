<template>
  <div>
    <div class="card shadow full-height">
      <div class="card-header horizontal justify-content-between">
        <div class="horizontal">
          <router-link v-if="isProfessional" :to="`/professional/customers/${room.customer.id}`">
            <hover-overlay :rounded="true" icon="user">
              <avatar :src="room.customer.photo" :username="room.customer.name"></avatar>
            </hover-overlay>              
          </router-link>              
          <div class="h-space-10"></div>
          <div class="vertical center middle">
            <h6>{{ room.category.name }}</h6>
            <h6 v-if="isProfessional">{{ room.location }}</h6>
          </div>
        </div>
        <div class="horizontal middle center color-brand bold">
          <font-awesome-icon icon="coffee" class="icon mr-2"></font-awesome-icon>
          <span title="Número de dicas recebidas">{{ room.num_consultings }}</span>
        </div>                
      </div>
      <router-link :to="{ name: `${isCustomer ? 'customer.rooms.edit' : 'professional.room' }`, params: { id: room.id }}">
        <img class="card-img-top" :src="room.photo">              
        <div class="card-subtitle">
          {{ room.title }}
        </div>
      </router-link>
      <div class="card-body">
        <blockquote class="blockquote">
          <footer class="blockquote-footer">
            {{ room.description }} {{ room.description }} {{ room.description }} 
          </footer>                
        </blockquote>              
      </div>
    </div>                         
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    room: Object
  },
  computed: {
    ...mapGetters('auth', ['isCustomer', 'isProfessional'])
  }

}
</script>

<style lang="scss" scoped>
  .card-header {
    background: $white;

    h6 {
      font-weight: $bold;
      font-size: 13px;
      color: $gray;
    }
  }  

  .card {
    width: 350px;
  }

  .card-subtitle {
    background: $brand;
    color: $white;
    font-weight: $bold;
    padding: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-img-top {
    height: 350px;
    width: 350px;
    object-fit: contain;
  }

  footer {
    // Bootstrap card requires footer, but our footer has position absolute (for landing pages)
    position: relative;
  }

  .blockquote-footer {
    font-size:  12px;
    height:     100%;
  }
</style>