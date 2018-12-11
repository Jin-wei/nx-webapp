<template>
    <div>
        <find-password-header></find-password-header>
        <div class="middle">
            <div class="min-width">
                <router-view></router-view>
            </div>
        </div>
        <find-password-footer></find-password-footer>
    </div>

</template>
<style src="../../../css/find_password.css"></style>
<script>
    import findPasswordHeader from '../../../components/login/findPasswordHeader'
    import findPasswordFooter from '../../../components/login/findPasswordFooter'
    export default{
         components:{findPasswordHeader,findPasswordFooter},

    }
</script>