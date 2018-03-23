// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { getTopics, getTopic } from '@/api/cnode'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      topics: [],
      topic: {}
    },
    actions: {
      getTopics({ commit }) {
        // `store.dispatch()` 会返回 Promise,
        // 以便我们能够知道数据在合适更新
        return getTopics().then(topics => {
          commit('setTopics', { topics: topics.data })
        })
      },
      getTopic({ commit }, id) {
        return getTopic(id).then(topic => {
          commit('setTopic', { id, topic })
        })
      }
    },
    mutations: {
      setTopics(state, { topics }) {
        state.topics = topics
      },
      setTopic(state, { id, topic }) {
        state.topic = topic
      }
    }
  })
}
