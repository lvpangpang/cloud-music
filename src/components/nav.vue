<template>
<div class="nav-box">
    <a href="javascript:history.back();" class="back-btn" v-if="back"></a>
    <a href="javascript:;" class="back-btn" v-else @click="backTo"></a>
    <h1 v-html="name" class="name"></h1>
</div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        name : {
            type : String,
            default : ''
        },
        back : {
            type : Boolean,
            default : true
        },
        backUrl : {
            type :String,
            default : ''
        }
    },
    data() {
        return {}
    },
    methods: {
        backTo() {
            window.location.url = this.props.backUrl;
        }
    }
}
</script>

<style scoped>
.nav-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    background: #d43c33;
}
.back-btn {
    position: absolute;
    left: .7rem;
    top: .5rem;
    width: 2rem;
    height: 2rem;
    background: url(../images/back1.png) no-repeat center / 2rem 2rem;
}
.name {
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
}

</style>
