<!-- Can be created to hold all forms, therefore make this more flexible -->
<!-- Project Modal -->
<template>
    <div class="modal-container">
        <div class="card">
            <ProjectForm v-if="project" 
                v-bind:project="project" v-bind:available_users="available_users" v-bind:available_managers="available_managers"
                @closeModal="closeModal" @refresh="refresh"/>

            <TaskForm v-if="task" v-bind:task="task" v-bind:assigned_project_users="assigned_project_users" 
                v-bind:priorities="priorities" v-bind:statuses="statuses" v-bind:project_name="project_name"
                @closeModal="closeModal"
            />
           
            <button class="btn default" @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
import ProjectForm from './ProjectForm.vue'
import TaskForm from './TaskForm.vue'

export default{
    name: 'Modal',

    components:{
        ProjectForm,
        TaskForm,
    },

    props:{
        project: Object,
        available_users: Array,
        available_managers: Array,

        task: Object,
        assigned_project_users: Array,
        priorities: Array,
        statuses: Array,
        project_name: String,
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