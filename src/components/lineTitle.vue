<template>
    <div class="line-title">
        <div class="lineTitle">
            <i class="line line-left"></i>
            <span class="center-title">{{title}}</span>
            <i class="line line-right"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lineTitle',
        props: {
            title: ''
        }
    }
</script>

<style scoped lang="scss">
    .lineTitle {
        text-align: center;
        i {
            display: inline-block;
            width: 14px;
            height: 1px;
            background-color: #1a1a1a;
            vertical-align: middle;
        }
        .center-title {
            margin: 0 10px;
            color: #1a1a1a;
            font-size: 1.4rem;
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>

