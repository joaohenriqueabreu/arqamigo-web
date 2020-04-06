<template>
    <div>
        <input ref="placesElement" type="text" @input="handleDeparture"/>
        <input ref="formElement" name="location" type="hidden"/>
    </div>
</template>

<script>
    const MIN_PLACES_TRIGGER_LENGTH = 3
    const PLACES_OPTIONS = {
        types: ['(cities)'],
        fields: ['address_component', 'geometry'],
        componentRestrictions: {country: "br"}
    }
    export default {
        mounted () {            
            this.autocomplete = new window.google.maps.places.Autocomplete(
                this.$refs.placesElement,
                PLACES_OPTIONS
            )
        },
        props: {
            placeChangedCallback: Function
        },
        data: function () {
            return {
                autocomplete: {},
                autocompleteStatus: true,
                selectedPlace: String,
                google: Object
            }
        },
        methods: {
            handleDeparture(evt) {                
                if (this.$refs.placesElement.value.length > MIN_PLACES_TRIGGER_LENGTH && this.autocompleteStatus) {
                    this.disableAutocomplete()
                    this.autocomplete.addListener('place_changed', this.placeChanged)
                }
            },            
            placeChanged() {                 
                this.selectedPlace = JSON.stringify(this.autocomplete.getPlace())
                this.placeChangedCallback(this.selectedPlace)               
            },
            resetPlace() {
                this.selectedPlace = null
            },
            disableAutocomplete() {
                this.autocompleteStatus = false
            },
        },
        watch: {
            selectedPlace: function (place) {
                this.$refs.formElement.value = place        
            }
        }
    }
</script>

<style>

</style>