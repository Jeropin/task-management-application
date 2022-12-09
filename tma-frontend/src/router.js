import { createRouter, createWebHistory }from 'vue-router';

import Projects from './components/Projects.vue'
import Details from './components/Details.vue'

const routes =[
    {
        path: '/',
        component: Projects
    },

    {
        path: '/projects/:id',
        component: Details
    },
];

export default createRouter({
    routes,
    history: createWebHistory()
});

