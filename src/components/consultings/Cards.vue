<template>
  <div>
      <div class="card full-width shadow" v-for="consulting in consultings" :key="consulting.id">
        <div class="card-body ">
          <div class="horizontal d-flex justify-content-between">
            <div class="horizontal">
                <div class="position-relative">
                  <hover-overlay :rounded="true" icon="home">
                    <avatar :src="consulting.room.photo" :username="consulting.room.customer.name"></avatar>
                  </hover-overlay>              
                </div>                          
              <div class="h-space-20"></div>
              <div class="vertical consulting-info">
                <h5>{{ consulting.room.category.name }}</h5>
                <h6>{{ consulting.room.description }}</h6>
                <p>
                  <font-awesome-icon class="location-icon" icon="map-marker-alt"></font-awesome-icon> {{ consulting.room.location }}
                </p>
              </div>
            </div>
            <div>
              <router-link :to="{ name: 'professional.room', params: { id: consulting.room.id }}">
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
export default {    
    props: {
      mode: {
        name: 'mode',
        type: String,
        default: 'all'
      },
      consultings: {
        name: 'consultings',
        type: Array
      }
    },    
    methods: {        
        openFeed: function (index) {
            this.currentSlide = index;
            this.slideToCurrent();
            this.$modal.show('feed');
        },
        slideToCurrent: function () {
            setTimeout(()=> {
                // carousel known bug - workaround
                this.$refs.feed.goToPage(this.currentSlide);
                this.$refs.feed.dragging = true;
            }, 100);

            // $("#on-modal-open-heading").removeClass('hide');
        },
        closeModal: function () {
            // $("#on-modal-open-heading").addClass('hide');
        },
        navigateToRoom: function (url) {
            window.location.href = url;
        }
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
    color: $pink;
    width: 50px;
    height: 50px;
  }

  h5 { font-size: 15px; }
  h6, p { font-size: 13px; }  

  .location-icon {
    color: $pink;
    margin-right: 5px;
  }
</style>