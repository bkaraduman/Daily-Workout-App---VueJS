import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
    baseURL: 'http://localhost:3300/api/',
    adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default {
    fetchWorkoutTypes() {
        return http.get('/workouttypes').then((res) => {
            return res.data;
        });
    },
    fetchWorkouts(date) {
        return http.get('/workouts?date=' + date).then((res) => {
            return res.data;
        });
    },
    fetchMyWorkouts(token) {
        return http.post('/my-workouts', {
            token: token
        }).then((res) => {
            return res.data;
        });
    },
    login(email, password) {
        return http.post('/user/login/',
            { Email: email, Password: password }
        ).then((res) => {
            return res.data;
        });
    },
    register(email, password, username) {
        return http.post('/user/',
            { Email: email, Password: password, Username: username }
        ).then((res) => {
            return res.data;
        });
    },
    saveWorkout(workout, workoutType, workoutRate, token) {
        return http.post('/workouts/',
            { WorkoutTypeID: workoutType, Text: workout, WorkoutRate: workoutRate, Token: token }
        ).then((res) => {
            return res.data;
        });
    }
}