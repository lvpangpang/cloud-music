<template>
<div class=" login-box">
    <a href="javascript:;" class="close-btn" @click="setShowLogin1(false)"></a>
    <div class="login-main">
        <input type="tel" placeholder="手机号" class="info-item" v-model="phone" />
        <input type="password" placeholder="密码" class="info-item" v-model="pwd" />
        <a href="javascript:;" class="login-btn" :class="{active : phone!==''&&pwd!==''}" @click="login">登录</a>
    </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navHeader from '@/components/nav';

export default {
    name: 'songList',
    data() {
        return {
            phone : '',
            pwd : ''
        }
    },
    computed : {
        ...mapState([
            'isShowLogin',
        ])
    },

    mounted() {
    },

    methods: {
        ...mapActions([
            'setShowLogin1',
            'setLogin1'
        ]),

        login() {
            if ( this.phone===''||this.pwd==='' ) {
                return;
            }
            this.axios.get(this.API.login + '?phone=' + this.phone + '&password=' + this.pwd).then( ( data ) => {
                var data = data.data;
                if ( data.code === 200 ) {
                    window.$toast({
                        msg : '登录成功'
                    });
                    this.setShowLogin1(false);
                    this.setLogin1(true);
                } else {
                    window.$toast({
                        msg : data.msg
                    });
                }
            });
        }
    },

    components: {
        navHeader
    }
}
</script>

<style scoped>

.login-box {
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}
.close-btn {
    float: right;
    margin: 1rem;
    width: 2rem;
    height: 2rem;
    background: url(../images/close.png) no-repeat center / 2rem 2rem;
}
.login-main {
    width: 90%;
    height: 10rem;
    margin: 5rem auto;
}
.info-item {
    display: block;
    width: 70%;
    margin: 0 auto;
    border: none;
    height: 3rem;
    border-bottom: 1px solid #dedede ;
}
.login-btn {
    display: block;
    margin: 2rem auto;
    width: 5rem;
    line-height: 2rem;
    background: #efefef;
    border-radius: 4px;
    color: #333;
    text-align: center;
}
.active {
    background: #d43c33;
    color: #fff;
}

</style>
