<template>
    <div>
        <div class="edit_cart"><a class="">完成</a></div>
        <div class="item">
            <div class="title">店铺的名字</div>
            <div class="content">
                <div class="check"></div>
                <div class="img-wrapper"></div>
                <div class="detail">
                    
                </div>
            </div>
        </div>

               
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.edit_cart {
    background-color: white;
    overflow: hidden;
    padding: 10px 0px;
}
.edit_cart > a {
    float: right;
    margin-right: 12px;
}
.item {
    background-color: #fff;
    margin-bottom: 15px;
    padding: 0 15px;
}
.item .title {
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
}
.item .content {
    margin-bottom: 0;
    padding: 15px 0;
    display: flex;
}
</style>

