import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}

// store
export default new Vuex.Store<IRootState>({})
