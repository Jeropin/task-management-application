<!-- Detail Component of Project -->
<template>
    <div class="row">
        <div class="column-left">
            <ProjectForm v-if="isLoaded" v-bind:project="populated_project" v-bind:available_users="available_users"/>
            <!-- Create the v-for loop -->
            <TaskForm v-if="isLoaded" v-bind:task="populated_project.tasks[0]" v-bind:available_users="available_users" v-bind:priorities="[]" v-bind:statuses="[]"/>
            <RouterLink :to="`/`" class="btn default"> Close </RouterLink>
        </div>
    </div>
</template>

<script>
import ProjectForm from "./ProjectForm.vue"
import TaskForm from './TaskForm.vue'
export default{
    name: "Details",

    components: {
        ProjectForm,
        TaskForm,
    },

    data(){
        return{
            populated_project: {},
            available_users: [],
            available_managers: [],
            isLoaded: false,
        }
    },

    methods:{
        // setData(project, employees, statuses, priorities)
        setData(project, employees){
            this.populated_project = {...project}
            this.available_users = employees.filter(employee => employee)
            this.isLoaded = true
        }
    },

    async beforeRouteEnter(to, from, next) {
        const projectId = to.params.id;

        const projectRes = await fetch(`http://localhost:8888/projects/${projectId}`);
        const project = await projectRes.json()

        const usersRes = await fetch(`http://localhost:8888/users/?project=${projectId}`);
        const users = await usersRes.json();

        const prioritiesRes = await fetch(`http://localhost:8888/tasks/priorities`);
        const priorities = await prioritiesRes.json()

        const employees = users.map(user => {
            if (user.position !== 'manager'){
                    return { _id: user._id, name: `${user.first} ${user.last}` }
            }
        });

        const managers = users.map(user =>{
            if(user.position === 'manager'){
                return { _id: user._id, name: `${user.first} ${user.last}`}
            }
        });

        // this.available_users = employees.filter(employee => employee)

        // console.log(users)

        // this.project_data = await projectRes.json()

        next(function(vm){
            return vm.setData(project, employees)
        })
    }
}

</script>