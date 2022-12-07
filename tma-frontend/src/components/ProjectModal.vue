<!-- Can be created to hold all forms, therefore make this more flexible -->
<template>
    <!-- <div class="modal-container"> -->
    <div>
        <div class="card">
            <ProjectForm v-bind:project="project" v-bind:available_users="available_users" @refresh="refresh"/>
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
        available_users: Array
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