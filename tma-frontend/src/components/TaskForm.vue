<template>
    <form>
        <div>
            <label>Task Name</label>
            <!-- <input v-model="project.name" type="text" name="name"/> -->
        </div>
        <div>
            <label>Task Detail</label>
        </div>
        <div>
            <label>Project</label>
            <input type="text" :value="project_name" readonly/>
        </div>
    </form>

</template>

<script>
export default {
    name: 'TaskForm',
    props: {
        task: Object,
        available_users: Array,
        priorities: Array,
        statuses: Array,
    },

    data() {

        return{
            selected_priority: '',
            selected_status: '',
            selceted_user: ''
        }
    },
}
</script>