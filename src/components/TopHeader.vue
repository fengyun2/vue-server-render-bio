<template>
  <header class="header">
    <nav class="inner">
      <!-- <router-link to="/" exact></router-link> -->
      <router-link to="/bar">Bar</router-link>
      <router-link to="/tom">Tom</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
$header-bgcolor: #f60;
.header {
  background-color: $header-bgcolor;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 15px 5px;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;

    &:hover {
      color: #fff;
    }
    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }
  }
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }
    a {
      margin-right: 1em;
    }
  }
}
</style>

