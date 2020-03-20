<template>
    <div>
        <div class="full-width room-reply-container" :class="getDirection">
            <div class="mr-3" v-if="sentFromCustomer">
                <router-link v-if="showLink" :to="getUserUrl">
                    <hover-overlay :rounded="true" icon="user">
                        <avatar :username="name" :src="photo"></avatar>
                    </hover-overlay>                    
                </router-link>                
            </div>
            <div class="arrow-box vertical shadow p-2 pt-3 pl-4" :class="getDirection">
                <p class="mb-2 small d-flex justify-content-between">
                    <router-link v-if="showLink" :to="getUserUrl">
                        <span class="name">{{ name }}</span>
                    </router-link>                    
                    <span class="date mr-1">{{ date }}</span>
                </p>
                <p class="color-black special">
                    <slot></slot>
                </p>                
                <!-- TODO reply functionality -->        
                <!-- TODO Lazy load -->
                <div v-if="medias && medias.length > 0">
                    <carousel class="full-width row" :perPage="3" paginationColor="white" paginationActiveColor="pink" :loop="true">
                        <slide v-for="media in medias" :key="media.id" class="col-sm-4 room-gallery-media">
                                <img v-if="media.type === 'image'" :src="media.url" class="fill"/>
                                <video v-if="media.type === 'video'" width="100%" height="100%" class="fill" controls :src="media.url" type="video/mp4">
                                    <!--<source :src="media.url" :type="'video/'+media.format">-->
                                    <!--<source :src="media.url">-->
                                </video>
                        </slide>
                    </carousel>                    
                </div>
            </div>
            <div class="ml-3" v-if="sentFromProfessional">
                <avatar :username="name" :src="photo"></avatar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        props: {
            special:    { type: Boolean, default: false },
            userId:     String,
            photo:      String,            
            name:       String,
            date:       String,
            sender:     String,
            viewer:     String,            
            medias:     Array,
        },
        methods: { },
        computed: {
            ...mapGetters(['isCustomer', 'isProfessional']),
            sentFromCustomer:       function () { return this.sender === this.$config.SENDER_CUSTOMER; },
            sentFromProfessional:   function () { return this.sender === this.$config.SENDER_PROFESSIONAL; },
            getDirection:           function () { return this.sentFromCustomer ? 'left' : 'right'; },
            getUserUrl:             function () { return `/${this.viewer}/${this.sender}s/${this.userId}`; },
            showLink:               function () { return (this.isCustomer && ! this.sentFromCustomer) || (this.isProfessional && ! this.sentFromProfessional); }
        },
    }
</script>

<style lang="scss" scoped>
    .special {
        font-size: 13px;
    }
    
    .room-reply-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }

    .room-reply-media-container {
        display: flex;
        flex-direction: row;
    }

    .room-reply-container.left {
        justify-content: flex-start;
    }

    .room-reply-container.right {
        justify-content: flex-end;
    }

    .arrow-box {
        position: relative;
        min-width: 300px;
        border-radius: 2rem;
        background: $white;

        .name {
            color: $pink;
            font-weight: $bold;
        }

        .date {
            font-size: 11px;
            color: $lighterGray;
        }

        &:after, &:before {
            right: 100%;
            top: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        &.right:after, &.right:before {
            left: 100%;
        }

        &.left:after, &.left:before {
            right: 100%;
        }

        &:after {
            border-width: 10px;
            margin-top: -10px;
        }

        &.left:after {
            border-right-color: white;
        }

        &.right:after {
            border-left-color: white;
        }

        &.left:before {
            border-right-color:white;
        }

        &.right:before {
            border-left-color: white;
        }
    }

    .room-gallery-media {
        max-height: 200px !important;
    }
</style>