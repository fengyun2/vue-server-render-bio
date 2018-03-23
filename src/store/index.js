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
      tab: '',
      loading: false,
      pageInfo: {
        page: 1,
        limit: 12
      }
    },
    actions: {
      getTopics({ commit, state }, params = {}) {
        // `store.dispatch()` 会返回 Promise,
        // 以便我们能够知道数据在合适更新
        const { tab = '' } = params
        console.log('params: ', params)
        console.log('tab: ', tab)
        let clear = false
        commit('setLoading', { loading: true })

        const searchParams = { ...state.pageInfo, ...{ tab } }
        if (
          (state.tab === tab && tab === '' && state.pageInfo.page > 2) ||
          (state.tab === tab && tab !== '' && state.pageInfo.page > 1)
        ) {
          // 拉取更多
          console.log('拉取更多')
          commit('setPageInfo', { page: state.pageInfo.page + 1 })
        } else {
          // eslint-disable-next-line
          if (state.tab === tab && tab === '' && state.pageInfo.page === 2) {
            // 预加载后的客户端的第一次拉取数据
            searchParams.page = 2
            commit('setPageInfo', { page: 3 })
          } else {
            // 切换tab
            // console.log('tab切换');
            clear = true
            searchParams.page = 1
            commit('setTab', { tab })
            commit('setPageInfo', { page: 2 })
          }
        }

        return getTopics(searchParams)
          .then(topics => {
            commit('setTopics', { topics: topics.data, clear })
            commit('setLoading', { loading: false })
          })
          .catch(() => {
            if (state.tab === tab) {
              // 拉取更多失败
              commit('setPageInfo', { page: state.pageInfo.page })
            }
            // commit('setTab', { tab: state.tab });
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
      },
      setTab({ commit }, tab = '') {
        commit('setTab', { tab })
      }
    },
    mutations: {
      setTopics(state, { topics, clear }) {
        if (clear) {
          state.topics = topics
        } else {
          state.topics.push(...topics)
        }
      },
      setTopic(state, { id, topic }) {
        state.topic = topic
      },
      setLoading(state, { loading }) {
        state.loading = loading
      },
      setTab(state, { tab }) {
        state.tab = tab
      },
      setPageInfo(state, params = {}) {
        console.log('setInfo: ', { ...state.pageInfo, ...params })
        state.pageInfo = { ...state.pageInfo, ...params }
      }
    }
  })
}
