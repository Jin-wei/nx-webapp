<template>
    <div class="all-min-width develop-bk">
       <!-- <div class="img-bk"></div>-->
        <div class="img-banner-dev"></div>
        <div class="container margin-top-50 all-min-width develop-content">
            <div class="dev-title">
                {{$t('develop.title')}}
            </div>
            <div class="dev-list-div">
                <ul>
                    <li class="dev-block" v-for="dev in $t('develop.ul')">
                        <img :src='"/static/images/img/dev_doc/"+dev.icon' alt="">
                        <p class="dev-block-title">{{dev.title}}</p>
                        <p class="dev-block-small">{{dev.small}}</p>
                        <a target="_blank" :href=localUrl+dev.pdf>
                            <button class="dev-btn" v-if="dev.btn" >{{dev.btn}}</button>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<script src="../../../controller/develop_doc_controller.js"></script>
<style src="../../../css/develop_doc.css"></style>

