<!-- Project Form -->
<template>
    <form>
        <div>
            <label>Project Name</label>
            <input v-model="project.name" type="text" name="name"/>
        </div>
        <div>
            <label>Description</label>
            <textarea v-model="project.description" name="description"></textarea>
        </div>
        <div>
            <label>Repository</label>
            <input v-model="project.repository" type="text" name="repository"/>
        </div>
        <div>
            <label>Manager</label>
            <select v-model="selected_manager">
                <option v-for="manager in available_managers" :value="manager._id" :selected="(selected_manager === manager._id)">
                    {{manager.name}}
                </option>
            </select>
        </div>
        <div>
            <label>Assigned Users</label>
            <select multiple disabled>
                <option v-for="user in assigned_project_users" readonly>{{user.name}}</option>
            </select>
        </div>
        <div>
            <label>Available Users</label>
            <select multiple v-model="selected_users">
                <option v-for="user in available_users" :value="user._id">{{user.name}}</option>
            </select>
        </div>

        <div>
            <input v-if="project._id" type="button" @click="updateProject" value="Update" class="btn update">


            <input v-else type="button" @click="addProject" value="Add" class="btn add">
        </div>
        
    </form>

</template>

<script>

export default{
    name: "ProjectForm",
    props:{
        project: Object,
        available_users: Array,
        available_managers: Array,
        assigned_project_users: Array,
    },

    data(){
        return{
            error: null,
            selected_manager: '',
            selected_users: [],
        }
    },

    methods:{
        handleError(){
            this.error = true
            
            setTimeout(function(scope){
                scope.error = null
            }, 2000, this)
        },

        async addProject(){

            const data = {
                ...this.project,
                manager: this.selected_manager,
                users: this.selected_users
            }

            const res = await fetch(`http://localhost:8888/projects`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok){
                this.$emit('closeModal');
                this.$router.go()
            } else {
                this.handleError()
            }
        },

        async updateProject(){
            const data = {
                ...this.project,
                manager: this.selected_manager,
                users: this.selected_users
            }

            const res = await fetch(`http://localhost:8888/projects/${this.project._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok){
                this.$emit('closeModal')
                this.$router.go()
            } else {
                this.handleError()
            }
        }
    },

    async created() {
        if (this.project._id) {
            this.selected_manager = this.project.manager._id
        }
    }
}
</script>