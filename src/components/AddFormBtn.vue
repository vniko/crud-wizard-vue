<template>
    <div class="row pull-right text-right" style="width:100%; margin-bottom:15px;">
        <div class="col-lg-3 pull-right text-right">
        <a href="#" class="btn btn-primary" @click.prevent="add()"><i class="fa fa-plus"></i>
            Add form</a>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'AddFormBtn',
        methods: {
            add () {
                this.$parent.$parent.addForm()
            }
        }
    }
</script>
