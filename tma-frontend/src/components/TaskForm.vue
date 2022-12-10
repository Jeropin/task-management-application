<template>
    <form>
        <div>
            <div>
                <label>Task Name</label>
                <input type="text" v-model="task.name" name="name" />
            </div>
            <div>
                <label>Details</label>
                <textarea v-model="task.details" name="description"></textarea>
            </div>
            <div>
                <div>
                    <label>Assigned</label>
                    <input type="text" v-model="task.timeline.assigned" name="assigned" />

                    <label>Due</label>
                    <input type="text" v-model="task.timeline.due" name="due" />

                    <label>Last Updated</label>
                    <input type="text" v-model="task.timeline.last_updated" name="last_updated" readonly/> 
                </div>
            </div>
            <div>
                <label>Status</label>
                <select v-model="selected_status">
                    <option v-for="status in statuses" :value="status">
                        {{ status }}
                    </option>
                    
                </select>
            </div>
            <div>
                <label>Priority</label>
                <select v-model="selected_priority">
                    <option v-for="priority in priorities" :value="priority">
                        {{ priority }}
                    </option>
                </select>
            </div>
            <div>
                <label>Assigned Users</label>
                <input type="text" :value="assigned_user.name" readonly />
            </div>
            <div>
                <label>Available User</label>
                <select v-model="selected_user">
                    <option v-for="user in assigned_project_users" :value="user._id">
                        {{ user.name }}
                    </option>
                </select>
            </div>
            <div>
                <label>Project</label>
                <input type="text" :value="project_name" readonly />
            </div>
            <div>
                <input type="button" v-if="task._id" @click="updateTask" value="Update Task" class="btn update" />
                <input type="button" v-else @click="addTask" value="Add Task" class="btn add"/>
            </div>
        </div>
    </form>

</template>

<script>
export default {
    name: 'TaskForm',
    props: {
        task: Object,
        assigned_project_users: Array,
        priorities: Array,
        statuses: Array,
        project_name: String,
    },

    methods:{
        handleError(){
            this.error = true
            
            setTimeout(function(scope){
                scope.error = null
            }, 2000, this)
        },

        async addTask(){

            this.task.priority = this.selected_priority;
            this.task.status = this.selected_status;

            const data = {
                ...this.task,
                user: this.selected_user,
            }

            const res = await fetch(`http://localhost:8888/tasks`, {
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

        async updateTask(){

            this.task.priority = this.selected_priority;
            this.task.status = this.selected_status;

            const data = {
                ...this.task,
                user: this.selected_user,
            }

            const res = await fetch(`http://localhost:8888/tasks/${this.task._id}`, {
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

    data() {
        return{
            selected_priority: '',
            selected_status: '',
            selected_user: '',
            assigned_user: ''
        }
    },

    async created() {
        if (this.task._id){
            this.selected_status = this.task.status
            this.selected_priority = this.task.priority

            const userRes = await fetch(`http://localhost:8888/users/${this.task.user}`);
            const user = await userRes.json();
            this.assigned_user = {id: user._id, name: `${user.first} ${user.last}` }
            this.selected_user = user._id

        }
    }
}
</script>