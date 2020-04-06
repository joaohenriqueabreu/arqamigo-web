<template>
  <div>        
      <div class="row m-0">
        <div class="col-sm-3 p-0" v-if="isCustomer && hasRoom">          
            <div class="pro-consultings pt-2">
              <other-consultings :consultings="getRoom.consultings"></other-consultings>
            </div>          
        </div>
        <div class="p-0 position-relative" v-bind:class="isCustomer ? 'col-sm-9' : 'col-sm-12'">          
          <div v-if="hasConsulting">
            <perfect-scrollbar>
              <div class="mx-3 mb-5">
                <div class="vertical center">
                  <h2 class="mb-3">{{ getConsulting.room.title }}</h2>                           
                  <div v-if="isCustomer" class="horizontal middle center full-width">
                    <customer-actions :consulting="getConsulting"></customer-actions>
                  </div>                    
                </div>        
                <hr class="mb-2">                  
                <div v-if="isProfessional && getConsulting.room.customer.has_private_access"> 
                  <private-access-alert :customer="getConsulting.room.customer"></private-access-alert>
                </div>  
                <div class="mb-4"></div>
                <consulting-comment :comment="genConsultingAsComment" class="position-relative">          
                  <font-awesome-icon icon="home" class="icon mr-1"></font-awesome-icon> {{ getConsulting.room.category.name }} <br> 
                  <font-awesome-icon icon="ruler" class="icon mr-1"></font-awesome-icon> <b>{{ getConsulting.room.width }}{{ $config.UNIT_OF_MEASURE }} x {{ getConsulting.room.length }}{{ $config.UNIT_OF_MEASURE }}</b><br>           
                  <font-awesome-icon icon="map-marker-alt" class="icon mr-2"></font-awesome-icon> {{ getConsulting.room.location }}
                </consulting-comment>
                <div class="v-space-20"></div>
                <consulting-comment :comment="genConsultingAsComment">
                  {{ getConsulting.room.description }}           
                </consulting-comment>
                <div class="v-space-20"></div>
                <consulting-comment v-for="comment in getConsulting.comments" :key="comment.id" :comment="comment">
                  {{ comment.content }}           
                </consulting-comment>
              </div>                
            </perfect-scrollbar>             
            <!-- <div class="reply"> -->
            <div style="position: absolute width: 100% bottom: 0">
              <comment-reply></comment-reply>
            </div>
          </div>           
        </div>        
      </div>      
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConsultingComment  from '@/components/consulting/Comment'
import CommentReply       from '@/components/consulting/Reply'
import OtherConsultings   from '@/components/rooms/OtherConsultings'
import CustomerActions    from '@/components/rooms/CustomerActions'
import PrivateAccessAlert from '@/components/professional/PrivateAccessBanner'

export default {
  components: {
    'consulting-comment':   ConsultingComment,
    'comment-reply':        CommentReply,
    'private-access-alert': PrivateAccessAlert,
    'other-consultings':    OtherConsultings,
    'customer-actions':     CustomerActions
  },  
  mounted() {      
    this.loadConsulting(this.$route.params.id)
    this.newComment()           
  },
  methods: {
    ...mapActions(['setPageSubtitle', 'loadRoom', 'loadConsulting', 'newComment'])
  },  
  computed: {
    ...mapGetters(['isCustomer', 'isProfessional', 'hasConsulting', 'getConsulting', 'hasRoom', 'getRoom']),
    genConsultingAsComment() {
      return {
        id: 0,
        sender: {
          id:     this.getConsulting.room.customer.id,
          name:   this.getConsulting.room.customer.name,
          photo:  this.getConsulting.room.customer.photo,
          date:   this.getConsulting.room.created_at,
          type:   this.$config.SENDER_CUSTOMER
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reply {
    position:   fixed;
    bottom:     0;   
    left:       0;
    width:      100%;
  }

  .row {
    padding:  0;
    width:    100%;
  }

  .pro-consultings {
    @extend .bg-white, .shadow, .full-height, .full-width;
    position: absolute;    
    
    // TODO fix this!
    top:      -4vh;

    // 100vh -15vh (menu-padding) + (-4vh top^)
    height:   89vh;
  }
</style>