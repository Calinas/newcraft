<template>
    <transition name="slide">
        <div class="container">
            <div @click="back">返回</div>
            <div class="input-wrapper">
                <div class="input">
                    <input type="text" class="first" placeholder="请输入您的账号" v-model="username">
                </div>
                <div class="input">
                    <input type="password" placeholder="请输入您的密码" v-model="password">
                    <i class="icon icon-pass"></i>
                </div>
            </div>
            <div class="login-btn" @click="userLogin">登录</div>
            <div class="option-wrapper">
                <span>快速注册</span>
                <span>忘记密码？</span>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from "axios"
import {mapMutations} from 'vuex'
import {login} from '@/api/user.js'
export default {
    data(){
        return {
            username:'',
            password:''
        }
        
    },
    computed: {

    },
    methods: {
        ...mapMutations({
            SET_USER: 'SET_USER'
        }),
        back(){
            this.$router.back()
        },
        userLogin(){
            login(this.username,this.password).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        background: url(http://www.91craft.com/apps/w3g/_static/img/login-screen-bg.jpg) center center;
        background-size: cover;
        color:#fff;
        padding: 1.5rem;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s
    }
    .slide-enter,.slide-leave-to {
        transform: translate3d(100%, 0, 0)
    }
    .input-wrapper {
        margin-top: 22%;
        .input {
            width: 100%;
            background: rgba(0,0,0,.3);
            height: 44px;
            display: flex;
            align-items: center;
            padding: 0 1rem;
        }
        input {
            color: #fff;
            outline: 0;
            border: none;
            background: transparent;
            flex: 1;
            height: 100%;
            &.first {
                border-bottom: 1px solid rgba(225,225,225,.4);
            }
        }
    }
    .login-btn {
        margin: 10% auto;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: #982424;
        color: #fff;
        letter-spacing: 2px;
        border-radius: 6px;
        text-align: center;
    }
    .icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        &-pass {
            background: url(http://www.91craft.com/apps/w3g/_static/img/craft_hide_pw_icon.png) no-repeat;
            background-size: cover;
        }
    }
    .option-wrapper {
        display: flex;
        justify-content: space-between;
    }
</style>


