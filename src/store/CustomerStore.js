import Customer           from '@/models/Customer';
import CustomerCollection from '@/collections/CustomersCollection';
import http                from '@/services/http';
import router from '@/routes/index';

export default {
    state: {
        customer:   new Customer(),
        customers:  new CustomerCollection()
    },
    mutations: {
        set_customers(state, customers) {      
            state.customers = customers;
          },
          set_customer(state, customer) {
            state.customer = customer;
          },  
    },
    actions: {
        loadCustomers({ commit, getters }) {
            http.get(`/professional/${getters.getUser.id}/customers`).then(res => commit('set_customers', res.data));
          },
          loadCustomer({ commit, getters }, id) {
            commit('start_api');
            http.get(`/customers/${id}`).then(res => {
              commit('set_customer', res.data);
              commit('api_loaded');
            });
          },
          async authorizeProfessional({commit}, professional) {
            commit('start_api');
            http.post(`customers/professionals/${professional.id}/authorize`).then(res => {        
              commit('api_loaded');
            });
          },
          async blockProfessional({commit}, professional) {
            commit('start_api');
            http.post(`customers/professionals/${professional.id}/block`).then(res => {
              commit('api_loaded');
              router.push('/customer');
              commit('set_message', 'Profissional bloqueado');
              commit('show_message');
              return;
            });
          },          
    },
    getters: {
        allCustomers: state => state.customers.consulted.concat(state.custemers.interested),
    consultedCustomers: state => state.customers.consulted,
    interestedCustomers: state => state.customers.interested,    
    
    hasCustomer: state => typeof state.customer === 'object' && Object.keys(state.customer).length > 0,
    getCustomer: state => state.customer,
    hasPrivateAccessToCustomer: state => state.customer.has_private_access && typeof state.customer.private === 'object' && Object.keys(state.customer.private).length > 0,
    hasConsultedWithProfessional: state => state.customer.has_consulted_with_professional && typeof state.customer.consultings === 'object' && Object.keys(state.customer.consultings).length > 0,
    getCustomerConsultings: state => state.customer.consultings,
    }
}