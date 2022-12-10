<!-- Detail Component of Project -->
<template>
        <div class="row">
            <div class="col-md">
                <div>
                    <RouterLink :to="`/`" class="btn default"> Close Project View</RouterLink>
                </div>
                <div class="card">
                    <ProjectForm v-if="isLoaded" 
                    v-bind:project="populated_project" v-bind:available_users="available_users" 
                    v-bind:available_managers="available_managers" v-bind:assigned_project_users="assigned_project_users"
                    @refresh="refresh" />
                </div>
            </div>
            <div class="col-md">
                <div>
                    <button class="btn add" @click="openTaskModal()">Add Task</button>
                </div>
                <div v-for="task in populated_project.tasks" class="card">
                    <TaskForm v-if="isLoaded" v-bind:task="task" v-bind:assigned_project_users="assigned_project_users" 
                    v-bind:priorities="priorities" v-bind:statuses="statuses" v-bind:project_name="populated_project.name"/>
                    <button class="btn delete" @click="deleteTask(task._id)">Delete</button>
                </div>
            </div>
        </div>

    <Modal v-if="showModal" 
        v-bind:task="add_task" v-bind:assigned_project_users="assigned_project_users" 
        v-bind:priorities="priorities" v-bind:statuses="statuses" v-bind:project_name="populated_project.name"
        @closeModal="closeModal">
    </Modal>
</template>

<script>
import ProjectForm from "./ProjectForm.vue"
import TaskForm from './TaskForm.vue'
import Modal from './Modal.vue'
export default{
    name: "Details",

    components: {
        ProjectForm,
        TaskForm,
        Modal,
    },

    data(){
        return{
            populated_project: {},
            available_users: [],
            available_managers: [],

            assigned_project_users:[],
            priorities: [],
            statuses: [],

            add_task: {},
            showModal: false,
            isLoaded: false,
        }
    },

    methods:{
        setData(project, unassigned, managers, assigned_project_users, priorities, statuses){
            this.populated_project = {...project};
            this.available_users = unassigned.filter(employee => employee);
            this.available_managers =  managers.filter(manager => manager);
            this.assigned_project_users = assigned_project_users.filter(user => user);
            this.priorities = priorities;
            this.statuses = statuses;

            this.isLoaded = true;
        },

        async refresh(){
            const res = await fetch(`http://localhost:8888/projects/${this.populated_project._id}`);
            
            const body = await res.json();
            this.populated_project = body;
        },

        openTaskModal() {
            // create an empty task object with the associated project id and empty timeline object
            this.add_task = { project: this.populated_project._id, timeline: {} }
            this.showModal = true
        },

        closeModal() {
            this.showModal = false
        },

        async deleteTask(_id){
            await fetch(`http://localhost:8888/tasks/${_id}`, {
                method: 'DELETE',
                mode: 'cors'
            });

            this.$router.go()
        },
    },

    async beforeRouteEnter(to, from, next) {
        const projectId = to.params.id;

        const projectRes = await fetch(`http://localhost:8888/projects/${projectId}`);
        const project = await projectRes.json()

        const usersRes = await fetch(`http://localhost:8888/users/?project=${projectId}`);
        const users = await usersRes.json();

        const prioritiesRes = await fetch(`http://localhost:8888/tasks/priorities`);
        const priorities = await prioritiesRes.json();

        const statusesRes = await fetch(`http://localhost:8888/tasks/statuses`);
        const statuses = await statusesRes.json();

        const unassigned = users.map(user => {
            if (user.position !== 'manager'){
                    return { _id: user._id, name: `${user.first} ${user.last}` }
            }
        });

        const managers = users.map(user =>{
            if(user.position === 'manager'){
                return { _id: user._id, name: `${user.first} ${user.last}`}
            }
        });

        const assigned_project_users = []

        for (let userId of project.users){
            const myuserRes = await fetch(`http://localhost:8888/users/${userId}`)
            const myuser = await myuserRes.json();
            assigned_project_users.push({ _id: myuser._id, name: `${myuser.first} ${myuser.last}` })
        }

        next(function(vm){
            return vm.setData(project, unassigned, managers, assigned_project_users, priorities, statuses)
        })
    }
}

</script>