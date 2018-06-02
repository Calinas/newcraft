<template>
    <div id="app">

        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    body {
        line-height: 24px;
        font-size: 1.4rem;
        background-color: #f1f1f1;
    }
    image[lazy=loading] {
        width: 100%;
    }
    .fix-scroll-out {
        overflow: hidden;
        height: 100vh;
        position: relative;
    }
    .fix-scroll-inner {
        overflow: auto;
        height: 100%;
    }
    .font-red {
        color: #982424;
    }
    .font-bold {
        font-weight: bold;
    }
    .font-black {
        color: #333;
    }
    .text-center {
        text-align: center;
    }
    .font-grey {
        color: #969696;
    }
    .img100 {
        width: 100%;
    }
    .font-15-title {
        font-size: 15px;
        font-weight: bold;
        color: #333;
    }
    pre {
        white-space: pre-wrap;
    }
    a {
        text-decoration: none;
        color: #000;
    }
    img {
        max-width: 100%;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }



    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    html {
        font-size: 10px
    }

    @media screen and (min-width: 319px) and (max-width: 373px) {
        html {
            font-size: 10px
        }
    }

    @media screen and (min-width: 374px) and (max-width: 413px) {
        html {
            font-size: 11px
        }
    }

    @media screen and (min-width: 413px) and (max-width: 638px) {
        html {
            font-size: 12px
        }
    }

    @media screen and (min-width: 640px) and (max-width: 719px) {
        html {
            font-size: 13px
        }
    }

    @media screen and (min-width: 720px) and (max-width: 749px) {
        html {
            font-size: 14px
        }
    }

    @media screen and (min-width: 750px) and (max-width: 799px) {
        html {
            font-size: 14px
        }
    }

    @media screen and (min-width: 800px) {
        html {
            font-size: 14px
        }
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-size: 1.4rem;
        line-height: 24px;
    }
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .text-center {
        text-align: center;
    }
    .scroll-inner {
    height: 100%;
    overflow: hidden;
}
.scroll-container {
  position: fixed;
  left: 0;
  bottom: 44px;
  top: 44px;
  width: 100%;
}
.router-link-exact-active  {
    color: #982424;
}
</style>
