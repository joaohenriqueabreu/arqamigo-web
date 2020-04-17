import Room             from '@/models/Room';
import RoomsCollection  from '@/collections/RoomsCollection';
import config           from '@/assets/js/config';
// TODO create an interceptor for axios and move startApi and closeApi there
import http             from '@/services/http';
import router           from '@/routes/index';


export default {
  namespaced: true,
    state: {
        room:           new Room(),
        rooms:          [],    
        currentStep:    config.MAIN_STEP, 
        roomSteps:      [
            {step: config.MAIN_STEP, completed: true}, 
            {step: config.CATEGORIES_STEP, completed: false}, 
            {step: config.AREA_STEP, completed: false}, 
            {step: config.MEDIAS_STEP, completed: false}, 
            {step: config.DETAILS_STEP, completed: false}, 
            {step: config.READY_STEP, completed: false}, 
          ],       
    },
    mutations: {
        new_room(state) {
            state.room              = {}
            state.room.medias       = []
            state.room.category     = {}
            state.room.area         = {}
            state.medias            = []
            state.withProfessional  = {}
        },
        set_rooms(state, roomsData) {          
          state.rooms = [];
          roomsData.forEach((roomData) => {            
            state.rooms.push(new Room(roomData));
          });
        },
        set_room(state, roomData) {
            state.room = new Room(roomData); 
        },
        prepare_room_for_saving(state) {
            state.room.medias = state.medias;      
            if (state.withProfessional) {
              state.room.consultings = [];
              state.room.consultings.push({
                professional: state.withProfessional
              })
            }      
        },
        room_created(state) {

        },
        set_room_location(state, location) {
          state.room.location = location;
        },
        next_step(state) {
            const nextStep = config.ROOM_STEPS.indexOf(state.currentStep) + 1;
            state.currentStep = config.ROOM_STEPS[nextStep];
        },
        prev_step(state) {
            const prevStep = config.ROOM_STEPS.indexOf(state.currentStep) - 1;
            state.currentStep = config.ROOM_STEPS[prevStep];
        },
        go_to_step(state, step) {      
            state.currentStep = step;
        },
        complete_step(state, step) {
            const stepIndex = config.ROOM_STEPS.indexOf(step);
            if (stepIndex > -1) {
              state.roomSteps[stepIndex].completed = true;
            }      
        },
        revert_step(state, step) {
            const stepIndex = config.ROOM_STEPS.indexOf(step);
            if (stepIndex > -1) {
              state.roomSteps[stepIndex].completed = false;
            }      
        },
    },
    actions: {
        newRoom({commit}) {
            commit('new_room');
          },
          async loadRooms({ commit }) {             
            const response = await http.get('/rooms');
            commit('set_rooms', response.data);          
          },
          async loadRoom({ commit }, id) {               
            const response = await http.get(`/rooms/${id}`);
            commit('set_room', response.data);            

            this.dispatch('media/setMedias', response.data.medias);
            this.dispatch('consulting/setConsultings', response.data.consultings);                    
          },
          async loadRoomConsultings({commit}, id) {
            const response = await http.get(`/rooms/${id}`);
            commit('set_room', response.data);            
            this.dispatch('consulting/setConsultings', response.data.consultings);   
          },
          async saveRoom({commit, state}) {            
            http.put(`/rooms/${state.room.id}`, state.room);            
          },
          createRoom({commit, state}) {               
            commit('prepare_room_for_saving');
            http.post('rooms', { room: state.room }).then(res => {        
              commit('new_room');              
              router.push('/customer/rooms/created');
            });
          }, 
          newRoomWithProfessional({commit}, professional) {
            commit('set_with_professional', professional)
            router.push({ name: 'customer.professionals.consultings.create', params: { id: professional.id }})
          },
          setRoom({commit}, room) {
            commit('set_room', room);
          },
          setRoomLocation({commit}, payload) {
            // TODO only grab necessary google places data
            commit('set_room_location', payload);
          },
          navigateToRoom({ commit, getters }, id) {
            const roomRouteName = getters.isCustomer 
              ? 'customer.rooms.edit'
              : 'professional.rooms.consulting';
              
            router.push({ name: roomRouteName, params: { id: id }});
          },
          nextStep({ commit }) {
            commit('next_step');       
          },
          prevStep({commit}) {
            commit('prev_step');      
          },
          goToStep({commit}, step) {
            commit('go_to_step', step);      
          },   
          completeStep({commit}, payload) {
            commit('complete_step', payload.step);
      
            if (payload.proceed) {
              commit('next_step');
            }      
          }, 
          revertStep({commit}, step) {
            commit('revert_step', step);
          },
    },
    getters: {
      allRooms: state => state.rooms,
      // recentRooms: state => state.rooms.filter(room => {
      //   let roomDt  = new Date(room.created_dt);
      //   let now     = new Date();
      //   let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
      //   return diff <= ROOMS_DAYS_THRESHOLD;
      // }),
      recentRooms: state => state.rooms.slice(0, 5),
      // otherRooms: state => state.rooms.filter(room => {
      //   let roomDt  = new Date(room.created_dt);
      //   let now     = new Date();
      //   let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
      //   return diff > ROOMS_DAYS_THRESHOLD;
      // }),
      otherRooms: state => state.rooms.slice(5, state.rooms.length),

      hasRoom: state => state.room.id !== null,      

      // Room creation steps
      getCreateStep: state => state.currentStep,    
      getCreateStepIndex: state => config.ROOM_STEPS.indexOf(state.currentStep),

      // Need to do one-by-one to trigger bindings
      isMainStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.MAIN_STEP)].completed,    
      isCategoriesStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.CATEGORIES_STEP)].completed,
      isAreaStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.AREA_STEP)].completed,
      isMediasStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.MEDIAS_STEP)].completed,
      isDetailsStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.DETAILS_STEP)].completed,
      isReadyStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.READY_STEP)].completed,    
      isCurrentStepComplete: (state, getters) => state.roomSteps[getters.getCreateStepIndex].completed,
    }
}