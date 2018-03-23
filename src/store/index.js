// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { getTopics, getTopic } from '@/api/cnode'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      topics: [],
      topic: {},
      loading: false
    },
    actions: {
      getTopics({ commit }, params = {}) {
        // `store.dispatch()` 会返回 Promise,
        // 以便我们能够知道数据在合适更新
        commit('setLoading', { loading: true })
        return getTopics(params)
          .then(topics => {
            commit('setTopics', { topics: topics.data })
            commit('setLoading', { loading: false })
          })
          .catch(() => {
            commit('setLoading', { loading: false })
          })
      },
      getTopic({ commit }, id) {
        commit('setLoading', { loading: true })
        return getTopic(id)
          .then(topic => {
            commit('setTopic', { id, topic })
            commit('setLoading', { loading: false })
          })
          .catch(() => {
            commit('setLoading', { loading: false })
          })
      }
    },
    mutations: {
      setTopics(state, { topics }) {
        // state.topics = topics
        state.topics.push(...topics)
      },
      setTopic(state, { id, topic }) {
        state.topic = topic
      },
      setLoading(state, { loading }) {
        state.loading = loading
      }
    }
  })
}
