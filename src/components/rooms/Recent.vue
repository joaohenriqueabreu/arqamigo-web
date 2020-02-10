<template>
    <div class="recent-rooms-container horizontal middle">
        <div v-show="! ready" class="horizontal-fill">Loading...</div>
        <carousel v-show="ready" class="horizontal-fill" :perPageCustom="[[768, 3], [1024, 6]]" 
            :paginationEnabled="false" ref="carousel">
            <slide v-for="(room, id) in recentRooms" :key="room.id" class="clickable" @slideclick="openFeed(id)">
                <div class="vertical middle center">
                    <hover-overlay icon="fas fa-search-location">
                        <v-avatar :src="room.photo" :username="room.customer.public_name" :size="100"></v-avatar>
                    </hover-overlay>
                    <div class="slide-subtitle vertical middle center">
                        <span>{{ room.category.description }}</span>
                        <span class="sub">{{ room.customer.location }}</span>
                    </div>
                </div>
            </slide>
            <slide class="vertical top center">
                <div class="vertical middle center rounded-circle shadow" style="height:100px;width:100px">
                    <a class="vertical middle center no-decor fill clickable" href="/professional/rooms">
                        <i class="arq icon text huge invert after fas fa-home margin-bottom"></i>
                        <span class="text medium color-pink super-bold">Ver mais</span>
                    </a>
                </div>
            </slide>
        </carousel>

        <modal name="feed" :adaptive="true" :clickToClose="true" @opened="slideToCurrent" @closed="closeModal" height="400">
            <carousel :adjustableHeight="false" :autoplayHoverPause="true" :loop="true"
                      :perPage="1" paginationColor="white" paginationActiveColor="#f63088"
                      :paginationPosition="'bottom-overlay'" :speed="1000" :autoplayTimeout="7000"
                      :autoplay="true" ref="feed">
                <slide v-for="(room, id) in recentRooms" :key="id" style="height: 400px;" @slideclick="navigateToRoom(room.url)">
                    <div class="fill position-relative clickable">
                        <div class="position-absolute top-left vertical-center align-left bg-white shadow rounded-pill padding-20 margin-20 max-width-50">
                            <small class="color-pink super-bold">
                                {{ room.category.description }} em {{ room.customer.location }}
                            </small>
                            <small class="white-space-initial font-italic">
                                {{ room.title }}
                            </small>
                        </div>
                        <img :src="room.photo" class="fill"/>
                    </div>
                </slide>
            </carousel>
        </modal>
    </div>
</template>

<style>
    .recent-rooms-container {
        overflow: hidden;
        padding: 20px;
        white-space: nowrap;
        max-width: 100vw;
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

    /*Overriding modal css*/
    .v--modal-overlay[data-modal="feed"] {
        background: rgba(255, 255, 255, 0.98);
    }
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

    export default {
        data: function () {
            return {
                room:           {},                
                currentSlide:   0,
                ready:          false,
            }
        },        
        methods: {
            ...mapActions(['loadRooms']),
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
        },
        created: function () {                        
          this.loadRooms().then(() => {            
            this.$refs.carousel.goToPage(0);
            this.$refs.carousel.dragging = true;
            this.ready = true;
          })            
        },
        computed: {            
            ...mapGetters(['recentRooms'])
        },
    }
</script>