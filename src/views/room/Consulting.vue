<template>
  <div>        
      <div class="row m-0">
        <div class="col-sm-3 p-0" v-if="isCustomer && hasRoom">          
            <div class="pro-consultings pt-2">
              <other-consultings :room="room"></other-consultings>
            </div>          
        </div>
        <div class="p-0 position-relative" v-bind:class="isCustomer ? 'col-sm-9' : 'col-sm-12'">          
          <div v-if="hasConsulting">
            <perfect-scrollbar>
              <div class="mx-3 mb-5">
                <div class="vertical center">
                  <h2 class="mb-3">{{ consulting.room.title }}</h2>                           
                  <div v-if="isCustomer" class="horizontal middle center full-width">
                    <customer-actions :consulting="consulting"></customer-actions>
                  </div>                    
                </div>        
                <hr class="mb-2">                  
                <div v-if="isProfessional && consulting.room.customer.has_private_access"> 
                  <private-access-alert :customer="consulting.room.customer"></private-access-alert>
                </div>  
                <div class="mb-4"></div>
                <consulting-comment :comment="genConsultingAsComment" class="position-relative">          
                  <font-awesome-icon icon="home" class="icon mr-1"></font-awesome-icon> {{ consulting.room.category.name }} <br> 
                  <font-awesome-icon icon="ruler" class="icon mr-1"></font-awesome-icon> <b>{{ consulting.room.width }}{{ $config.UNIT_OF_MEASURE }} x {{ consulting.room.length }}{{ $config.UNIT_OF_MEASURE }}</b><br>           
                  <font-awesome-icon icon="map-marker-alt" class="icon mr-2"></font-awesome-icon> {{ consulting.room.location }}
                </consulting-comment>
                <div class="v-space-20"></div>
                <consulting-comment :comment="genConsultingAsComment">
                  {{ consulting.room.description }}           
                </consulting-comment>
                <div class="v-space-20"></div>
                <div v-for="(comment, index) in consultingComments" :key="index">
                  <consulting-comment :comment="comment">
                    {{ comment.content }}           
                  </consulting-comment>
                </div>                
              </div>                
            </perfect-scrollbar>                         
            <div class="reply-area">
              <comment-reply></comment-reply>
            </div>
          </div>           
        </div>        
      </div>      
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ConsultingComment  from '@/components/consulting/Comment';
import CommentReply       from '@/components/consulting/Reply';
import CustomerActions    from '@/components/rooms/CustomerActions';
import PrivateAccessAlert from '@/components/professional/PrivateAccessBanner';
import Comment            from '@/models/Comment';

import OtherConsultings   from '@/views/customer/consulting/OtherConsultings';

export default {
  components: {
    'consulting-comment':   ConsultingComment,
    'comment-reply':        CommentReply,
    'private-access-alert': PrivateAccessAlert,
    'other-consultings':    OtherConsultings,
    'customer-actions':     CustomerActions
  },  
  created() {        
    // No id means, we are starting a new consulting
    if (this.$route.params.id !== undefined) {
      this.loadConsulting(this.$route.params.id);
    } else {
      this.newConsulting();
    }           
  },
  methods: {
    ...mapActions('layout', ['setPageSubtitle']),    
    ...mapActions('consulting', ['loadConsulting', 'newConsulting'])
  },  
  computed: {
    ...mapState({ consulting: state => state.consulting.consulting, room: state => state.room.room }),
    ...mapGetters('auth', ['isCustomer', 'isProfessional']),
    ...mapGetters('room', ['hasRoom']),
    ...mapGetters('consulting', ['hasConsulting', 'otherConsultings']),
    genConsultingAsComment() {
      return new Comment({        
        sender: {
          id:     this.consulting.room.customer.id,
          name:   this.consulting.room.customer.name,
          photo:  this.consulting.room.customer.photo,
          date:   this.consulting.room.created_at,
          type:   this.$config.SENDER_CUSTOMER
        }
      })
    },
    consultingComments() {
      return this.consulting.comments;
    }
  },  
}
</script>

<style lang="scss" scoped>
  .reply {
    position:   fixed;
    bottom:     0;   
    left:       0;
    width:      100%;
  }

  .reply-area {
    position: absolute;
    width: 100%;
    bottom: 0;
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