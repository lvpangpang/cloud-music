<template>
<div v-show="isLoading" class="loading-box">
    <img src="../images/hot.gif" />
    <p>正在加载...</p>
</div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        isLoading : {
            type : Boolean,
            default : false
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
.loading-box {
    text-align: center;
}

</style>
