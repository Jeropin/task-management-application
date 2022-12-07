<template>
    <form>
        <div>
            <label>Project Name</label>
            <input type="text" v-model="project.name" name="name"/>
        </div>
        <div>
            <label>Description</label>
            <textarea v-model="project.description" name="description"></textarea>
        </div>
        <div>
            <label>Repository</label>
            <input type="text" v-model="project.repository" name="repository"/>
        </div>
        <div>
            <label>Manager</label>
            <select v-model="selected_manager">
                <option v-for="manager in available_users" :value="manager._id" :selected="(selected_manager === manager._id)">
                    {{manager.name}}
                </option>
            </select>
        </div>
        <div>
            <label>Users</label>
            <select multiple v-model="selected_users">
                <option v-for="users in available_users" :value="users._id">{{user.name}}</option>
            </select>
        </div>
        
        <div>
            <label>Tasks</label>
            <p>{{project.tasks}}</p>
        </div>

        <div>
            <input v-if="project._id" type="button" @click="updateProject" value="Update">
            <input v-else type="button" @click="addProject" value="Add">
        </div>
        
    </form>

</template>

<script>

export default{
    name: "ProjectForm",
    props:{
        project: Object,
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
                body: JSON.stringify(this.project)
            });

            if (res.ok){
                this.$emit('closeModal');
                this.$emit('refresh');
            } else {
                this.handleError()
            }
        },

        async updateProject(){
            const res = await fetch(`http://localhost:8888/projects/${this.project._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.project)
            });

            if (res.ok){
                this.$emit('closeModal')
                this.$emit('refresh')
            } else {
                this.handleError()
            }
        }
    },

    async created() {
    }
}
</script>