<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="header-content">
        <h1>天氣助手</h1>
        <el-menu 
          mode="horizontal" 
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/">首頁</el-menu-item>
          <el-menu-item index="/search">搜尋</el-menu-item>
          <el-menu-item index="/favorites">收藏地點</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    
    <el-main class="app-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

.app-container {
  min-height: 100vh;
}

.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;

  h1 {
    margin: 0;
    color: #409EFF;
    font-size: 1.5em;
  }
}

.app-main {
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

:deep(.el-menu-item.is-active) {
  color: #409EFF !important;
  border-bottom-color: #409EFF !important;
}
</style>
