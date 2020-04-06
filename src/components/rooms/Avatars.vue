<template>
    <div class="recent-rooms horizontal middle">        
        <carousel class="full-width" :perPageCustom="[[768, 3], [1024, 6]]" 
            :paginationEnabled="false" ref="carousel">
            <slide v-for="(room, id) in rooms" :key="room.id" class="clickable" @slideclick="openFeed(id)">
                <div class="vertical middle center">
                    <hover-overlay :rounded="true" icon="search">
                        <avatar :src="room.photo" :username="room.customer.public_name" :size="100"></avatar>
                    </hover-overlay>
                    <div class="slide-subtitle vertical middle center">
                        <span>{{ room.category.name }}</span>
                        <span class="sub">{{ room.customer.location }}</span>
                    </div>
                </div>
            </slide>
            <slide class="vertical top center">
                <div class="vertical middle center rounded-circle shadow" style="height:100pxwidth:100px">
                    <router-link to="/professional/rooms">Ver mais</router-link>
                </div>
            </slide>
        </carousel>

        <modal name="feed" @opened="slideToCurrent" @closed="closeModal">
            <carousel :adjustableHeight="false" :autoplayHoverPause="true" :loop="true"
                      :perPage="1" paginationColor="white" paginationActiveColor="#f63088"
                      :paginationPosition="'top-overlay'" :speed="1000" :autoplayTimeout="7000"
                      :autoplay="true" ref="feed">
                <!-- Using @slideclick to enable dragging slides (otherwise mousedown for draggin would trigger redirect) -->
                <slide v-for="room in rooms" :key="room.id" style="height: 400px" @slideclick="navigateToRoom(room.id)">                                    
                    <div class="fill position-relative clickable">                        
                        <div class="story-pill p-3 m-2">                            
                            <small class="color-brand bold">{{ room.category.name }}</small>                            
                            <small class="color-light-gray bold">{{ room.customer.location }}</small>                                                                                    
                            <small>{{ room.title }}</small>
                        </div>
                        <img :src="room.photo" class="fill"/>
                    </div>                    
                </slide>
            </carousel>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        props: {
            rooms: Array            
        },
        data: function () {
            return {                
                currentSlide:   0,
                ready:          true, // TODO Create loadings
            }
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
            navigateToRoom: function (roomId) {    
                // Need to use special slider function otherwise dragging will trigger redirect when router-link            
                this.$router.push({ name: 'professional.room', params: { id: roomId }})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .recent-rooms-container {
        overflow: hidden;
        padding: 20px;
        white-space: nowrap;
        max-width: 100vw;
    }

    .story-pill {
        @extend .vertical, .shadow;
        max-width:  50%;
        position:   absolute;
        bottom:     5px;
        left:       5px;
        background: transparentize($white, 0.8);
        border-radius: 10px;

        small {
            @extend .single-line;
        }
    }

    .slide-subtitle {
        font-size: 10px;
        font-weight: 1000;
        max-width: 75%;
        text-align: center;
        white-space: initial;
        margin-top: 10px;
    }

    .slide-subtitle .sub {
        font-weight: 500;
        font-size: 8px;
    }

    .VueCarousel-slide {
        img { 
            height: 400px ;
            max-width: 100%;
        }    
    }

    .VueCarousel-dot-container {
        max-width: 20px;
    }
</style>