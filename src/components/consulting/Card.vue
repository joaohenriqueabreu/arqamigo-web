<template>
  <div>
      <div class="card full-width shadow">
        <div class="card-body ">
          <div class="d-flex justify-content-between">
            <div class="horizontal">
                <div class="position-relative">
                  <router-link :to="{ name: getRoomRouteName, params: {id: consulting.room.id }}">
                    <hover-overlay :rounded="true" icon="home">
                      <avatar :src="otherUser.photo" :username="'abc'"></avatar>
                    </hover-overlay>              
                  </router-link>
                </div>                          
              <div class="h-space-20"></div>
              <div class="vertical consulting-info">                
                <div v-if="! noTitle" class="mb-2">                    
                  <router-link :to="{ name: getRoomRouteName, params: {id: consulting.room.id }}">
                    <font-awesome-icon icon="home" class="icon"></font-awesome-icon>
                    <small class="bold single-line">{{ consulting.room.title }}</small>
                  </router-link>
                </div>
                <div v-if="isProfessional">
                  <div class="horizontal middle" v-if="! noTitle">
                    <h5 class="mb-1 mr-2">{{ user.name }}</h5>
                  </div>
                  <small class="mb-2 color-light-gray bold">
                    <font-awesome-icon icon="bars" class="icon"></font-awesome-icon><span class="mr-4">{{ consulting.room.category.name }}</span>
                    <font-awesome-icon icon="map-marker-alt" class="icon"></font-awesome-icon>{{ consulting.room.location }}
                  </small>                                                  
                </div>
                <div v-else class="horizontal middle">
                  <professional-info :professional="otherUser" class="mb-1 mr-2"></professional-info>                                     
                </div>
                <div class="row">
                  <div class="col-sm-8 single-line">
                    <font-awesome-icon :icon="['far', 'comment']" class="mr-2"></font-awesome-icon>
                    <small class="">{{ consulting.last_comment_content }}</small>                                                  
                  </div>                                
                </div>                
              </div>
            </div>
            <div>
              <router-link :to="{ name: `${isCustomer ? 'customer' : 'professional'}.rooms.consulting`, params: { id: consulting.room.id }}">
              <hover-overlay :rounded="true" icon="coffee">
                <div class="rounded-circle vertical center middle shadow p-3">{{ consulting.num_comments }}</div>
              </hover-overlay>              
              </router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfessionalInfo from '@/components/professional/Info'
export default {    
    components: {
      'professional-info': ProfessionalInfo
    },
    props: {      
      consulting: Object,
      noTitle: { type: Boolean, default: false }
    },        
    methods: {        
        openFeed: function (index) {
            this.currentSlide = index
            this.slideToCurrent()
            this.$modal.show('feed')
        },
        slideToCurrent: function () {
            setTimeout(()=> {
                // carousel known bug - workaround
                this.$refs.feed.goToPage(this.currentSlide)
                this.$refs.feed.dragging = true
            }, 100)

            // $("#on-modal-open-heading").removeClass('hide')
        },
        closeModal: function () {
            // $("#on-modal-open-heading").addClass('hide')
        },
        navigateToRoom: function (url) {
            window.location.href = url
        }
    },
    computed: {
      ...mapGetters(['isProfessional', 'isCustomer']),
      user()              { return this.isCustomer ? this.consulting.room.customer : this.consulting.professional },
      otherUser()         { return this.isProfessional ? this.consulting.room.customer : this.consulting.professional },
      getRoomRouteName()  { return this.isCustomer ? 'customer.rooms.edit' : 'professional.room' }
    }    
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 20px;
    .card-body {
      padding-bottom: 10px;
    }
  }

  .rounded-circle {    
    font-weight: $bold;
    color: $brand;
    width: 50px;
    height: 50px;
  }

  h5 { font-size: 15px; }
  h6, p { font-size: 13px; }  

  .location-icon {
    color: $brand;
    margin-right: 5px;
  }

  [data-icon] {
    opacity: 0.5;
  }
</style>