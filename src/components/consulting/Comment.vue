<template>
    <div>
        <div class="full-width room-reply-container" :class="getDirection">
            <div class="mr-3" v-if="sentFromCustomer">
                <router-link :to="getUserUrl">
                    <hover-overlay :rounded="true" icon="user">
                        <avatar :username="comment.sender.name" :src="comment.sender.photo"></avatar>
                    </hover-overlay>                    
                </router-link>                
            </div>
            <div class="arrow-box vertical shadow p-2 pt-3 pl-4" :class="getDirection">
                <p class="mb-2 small d-flex justify-content-between">
                    <router-link :to="getUserUrl">
                        <span class="name">{{ comment.sender.name }}</span>
                    </router-link>                    
                    <span class="date mr-1">{{ comment.sender.date }}</span>
                </p>
                <p class="color-black special">
                    <slot></slot>
                </p>                
                <!-- TODO reply functionality -->        
                <!-- TODO Lazy load -->
                <div v-if="comment.medias && comment.medias.length > 0" class="mb-3">
                    <carousel class="full-width row" :perPage="99" paginationColor="white" paginationActiveColor="pink" :loop="true">
                        <slide v-for="media in comment.medias" :key="media.id" class="col-sm-4 room-gallery-media">
                            <img v-if="media.type === $config.IMAGE_TYPE" :src="media.url" class="fill"/>
                            <video v-if="media.type === $config.VIDEO_TYPE" width="100%" height="100%" class="fill" controls :src="media.url" type="video/mp4">
                                <!--<source :src="media.url" :type="'video/'+media.format">-->
                                <!--<source :src="media.url">-->
                            </video>
                        </slide>
                    </carousel>                    
                </div>
            </div>
            <div class="ml-3" v-if="sentFromProfessional">
                <avatar :username="comment.sender.name" :src="comment.sender.photo"></avatar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        props: {    
            comment: Object,
        },
        methods: {

         },
        computed: {
            ...mapGetters(['isCustomer', 'isProfessional']),
            sentFromCustomer()      { return this.comment.sender.type === this.$config.SENDER_CUSTOMER; },
            sentFromProfessional()  { return this.comment.sender.type === this.$config.SENDER_PROFESSIONAL; },
            getOtherUserType()      { return this.sentFromCustomer ? this.$config.SENDER_PROFESSIONAL : this.$config.SENDER_CUSTOMER },
            getDirection()          { return this.sentFromCustomer ? 'left' : 'right'; },
            getUserUrl()            { return `/${this.getOtherUserType}/${this.comment.sender.type}s/${this.comment.sender.id}`; },
            showLink()              { return (this.isCustomer && ! this.sentFromCustomer) || (this.isProfessional && ! this.sentFromProfessional); }
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