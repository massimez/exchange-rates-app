<script setup></script>
<template>
  <div class="wrapper">
    <header></header>
    <main class="main">
      <slot></slot>
    </main>
    <!-- <footer></footer> -->
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding-top: 20px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-background 20s ease infinite;
}
.main {
  display: flex;
  width: 700px;
  margin: auto;
  height: 700px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.1px);
  -webkit-backdrop-filter: blur(5.1px);
  border: 1px solid rgba(255, 255, 255, 0.68);
}

@include _lg {
  .main {
    width: 600px;
  }
}
@include _xs {
  .main {
    width: 100%;
  }
}
</style>
