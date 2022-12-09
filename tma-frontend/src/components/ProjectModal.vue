<!-- Can be created to hold all forms, therefore make this more flexible -->
<!-- Project Modal -->
<template>
    <div>
        <div class="card">
            <ProjectForm v-if="project" 
            @closeModal="closeModal" @refresh="refresh"
            v-bind:project="project" v-bind:available_users="available_users" v-bind:available_managers="available_managers"/>
            <button class="btn default" @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
import ProjectForm from './ProjectForm.vue'

export default{
    name: 'ProjectModal',

    components:{
        ProjectForm
    },

    props:{
        project: Object,
        available_users: Array,
        available_managers: Array,
    },

    methods:{
        refresh(){
            this.$emit('refresh')
        },
        closeModal(){
            this.$emit('closeModal')
        }
    }
}
</script>