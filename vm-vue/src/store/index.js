import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [
      { id: 1, type: 'Chips', price: 2.45, quantity: 5, name: 'Lays Classic' },
      { id: 2, type: 'Chips', price: 2.45, quantity: 5, name: 'Doritos' },
      { id: 3, type: 'Chips', price: 2.45, quantity: 5, name: 'Cheetos' },
      { id: 4, type: 'Chips', price: 2.75, quantity: 5, name: 'Cracker Jack' },
      { id: 5, type: 'Candy', price: 1.85, quantity: 5, name: 'Snickers' },
      { id: 6, type: 'Candy', price: 1.85, quantity: 5, name: 'Peanut Butter Cups' },
      { id: 7, type: 'Candy', price: 1.50, quantity: 5, name: 'Laffy Taffy' },
      { id: 8, type: 'Candy', price: 2.25, quantity: 5, name: 'Wonka Bar' },
      { id: 9, type: 'Drink', price: 1.50, quantity: 5, name: 'Coca Cola' },
      { id: 10, type: 'Drink', price: 1.50, quantity: 5, name: 'Mountain Dew' },
      { id: 11, type: 'Drink', price: 2.35, quantity: 5, name: 'Vitamin Water' },
      { id: 12, type: 'Drink', price: 3.00, quantity: 5, name: 'Monster Energy' },
      { id: 13, type: 'Gum', price: 0.75, quantity: 5, name: 'Juicy Fruit' },
      { id: 14, type: 'Gum', price: 0.75, quantity: 5, name: 'Big Red' },
      { id: 15, type: 'Gum', price: 1.75, quantity: 5, name: 'Little League Chew' },
      { id: 16, type: 'Gum', price: 1.25, quantity: 5, name: 'Hubba Bubba' }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
