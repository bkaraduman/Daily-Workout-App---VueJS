import service from '../services/service';
import { router } from "../router/router"

const state = {
    token: "",
    status: {},
    workouts: [],
    workoutTypes: [],
    errorMessage: ""
};

const getters = {
    isAuthenticated(state) {
        console.log("token: ", state.token);
        return state.token !== ""
    }
};

const mutations = {
    setErrorMessage(state, message) {
        state.errorMessage = message;
    },
    setWorkouts(state, workouts) {
        state.workouts = workouts;
    },
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = ""
    },
    setWorkoutTypes(state, workoutTypes) {
        state.workoutTypes = workoutTypes
    },
    loginFailure(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    },
};

const actions = {
    initAuth({ commit, dispatch }) {
        let token = localStorage.getItem("token")
        console.log("storage-token: ", token);
        if (token) {

            // let expirationDate = localStorage.getItem("expirationDate")
            // let time = new Date().getTime()
            commit("setToken", token);
            // if (time >= +expirationDate) {
            //     console.log("token süresi geçmiş...")
            //     dispatch("logout")
            // } else {
            //     commit("setToken", token)
            //     let timerSecond = +expirationDate - time
            //     console.log(timerSecond)
            //     dispatch("setTimeoutTimer", timerSecond)
            //     // router.push("/")
            // }

        } else {
            // router.push("/auth")
            return false
        }
    },
    logout({ commit }) {
        commit("clearToken")
        localStorage.removeItem("token")
        router.replace("/")
    },
    saveWorkout({ commit, dispatch, state }, data) {
        let token = localStorage.getItem("token")
        service.saveWorkout(data.workout, data.workoutType, data.workoutRate, token).then((res) => {
            if (res[0].ErrorMessage == null) {
                dispatch('alert/success', "Antrenman başarıyla eklendi!", { root: true });
                router.push("/");
            }
            else {
                dispatch('alert/error', res[0].ErrorMessage, { root: true });
            }
        });
    },
    login({ commit, dispatch, state }, data) {
        console.log(data);
        service.login(data.email, data.password).then(
            user => {
                console.log(user[0]);
                if (user[0].ErrorMessage == null) {
                    commit("setToken", user[0].Token)
                    localStorage.setItem("token", user[0].Token)
                    router.push('/');
                }
                else {
                    localStorage.removeItem("token");
                    commit('loginFailure', user[0].ErrorMessage);
                    dispatch('alert/error', user[0].ErrorMessage, { root: true });
                }
            },
            error => {
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    register({ commit, dispatch, state }, data) {
        console.log(data);
        service.register(data.email, data.password, data.username).then(
            res => {
                if (res[0].ErrorMessage == null) {
                    dispatch('alert/success', "Kayıt başarıyla gerçekleşmiştir. Giriş yapabilirsiniz.", { root: true });                                        
                }
                else {
                    commit('registerFailure', res[0].ErrorMessage);
                    dispatch('alert/error', res[0].ErrorMessage, { root: true });
                }
            },
            error => {
                commit('registerFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        );
    },
    fetchWorkouts(context, date) {
        service.fetchWorkouts(date).then((res) => {
            context.commit('setWorkouts', res);
        });
    },
    fetchMyWorkouts(context) {
        service.fetchMyWorkouts(state.token).then((res) => {
            context.commit('setWorkouts', res);
        });
    },
    fetchWorkoutTypes(context) {
        service.fetchWorkoutTypes().then((res) => {
            context.commit('setWorkoutTypes', res);
        });
    }
};

export const account = {
    state,
    mutations,
    actions,
    getters
}