<template>
    <div class="row">
        <div class="column-left">
            <ProjectForm v-bind:project="{...populated_project}"/>
        </div>
    </div>
</template>

<script>
import ProjectForm from "./ProjectForm.vue"

export default{
    name: "Project",

    components: {
        ProjectForm,
    },

    data(){
        return{
            populated_project:{},
        }
    },

    methods:{
        setData(project){
            this.populated_project = project
        }
    },

    async beforeRouteEnter(to, from, next) {
        const projectRes = await fetch(`http://localhost:8888/projects/${to.params.id}`)
        const project = await projectRes.json()

        next(function(vm){
            return vm.setData(project)
        })
    }
}

</script>