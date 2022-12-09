<!-- Container Component for all Projects -->
<template>
    <button class="btn add" @click="loadProject()">Add Project</button>
    <div v-for="project in projects" class="card">
        <div class="container">
            <h1>{{project.name}}</h1>
            <h2>{{project.description}}</h2>
            <h3>{{project.repository}}</h3>
            <!-- <button class="btn view"> View</button> -->
            <RouterLink :to="`projects/${project._id}`" class="btn view"> View </RouterLink>
            <!-- <RouterLink :to="`projects/${project._id}`" class="btn edit"> Edit </RouterLink> -->
            <!-- <RouterLink :to="`projects/${project._id}`" class="btn delete"> Delete </RouterLink> -->
            <button class="btn edit" @click="loadProject(project.id)">Edit</button>
            <button class="btn delete" @click="deleteProject(project.id)">Delete</button>
        </div>
    </div>

    <ProjectModal v-if="showModal" 
    v-bind:project="project_data" v-bind:available_users="available_users"  v-bind:available_managers="available_managers" 
    v-show="showModal" @closeModal="closeModal" @refresh="refresh">
    </ProjectModal>
</template>

<script>
import ProjectModal from './ProjectModal.vue'

export default{
    name: 'Projects',

    components:{
        ProjectModal
    },

    data(){
        return{
            available_users:[],
            available_managers: [],
            project_data: {},
            projects:[],
            showModal: false,
        }
    },

    methods: {
        closeModal(){
            this.showModal=false
        },

        async refresh(){
            const res = await fetch('http://localhost:8888/projects');
            
            const body = await res.json();
            this.projects = body;
        },

        async deleteProject(_id){

            await fetch(`http://localhost:8888/projects/${_id}`, {
                method: 'DELETE',
                mode: 'cors'
            });

            this.refresh();
        },
        

        //Coding On Tuesday 
        async loadProject(projectId=null){

            const usersRes = await fetch(`http://localhost:8888/users/?project=${projectId}`);
            const users = await usersRes.json();

            const employees = users.map(user => {
                if (user.position !== 'manager'){
                    return { _id: user._id, name: `${user.first} ${user.last}` }
                }
            });

            this.available_users = employees.filter(employee => employee)

            const managers = users.map(user =>{
                if(user.position === 'manager'){
                    return { _id: user._id, name: `${user.first} ${user.last}`}
                }
            });

            this.available_managers = managers.filter(manager => manager);

            this.project_data = {};

            if(projectId){
                const res = await fetch(`http://localhost:8888/projects/${projectId}`)
                this.project_data = await res.json()
            };

            this.showModal = true;
        },
    },

    async created() {
        this.refresh();
    }
}
</script>
