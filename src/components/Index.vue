<template>
  <div class="index-bg fragment-container">
    <div class="top-menu"
         :class="{'top':this.$store.state.isTop, 'not-top':!this.$store.state.isTop}">
      <el-menu
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          @select="handleSelect">
        <el-menu-item index="#home">首页</el-menu-item>
        <el-menu-item index="#product">产品</el-menu-item>
        <el-menu-item index="#service">服务</el-menu-item>
        <el-menu-item index="#more">联系我们</el-menu-item>
        <el-image v-if="this.$store.state.isTop" class="logo" :src="require('../../public/images/logo-white.png')"/>
        <el-image v-else class="logo" :src="require('../../public/images/logo.png')"/>
      </el-menu>
    </div>
    <div class="top-carousel">
      <el-carousel
          class="carousel"
          trigger="click"
          arrow="always">
        <el-carousel-item class="carousel-item" v-for="item in images" :key="item.url">
          <div>
            <el-image class="image" :src="item.url"/>
          </div>
        </el-carousel-item>
        <div class="index-title">
          <p>仿生蚂蚁机械</p>
        </div>
        <div class="index-button">
          <el-button @click="handleSelect('#home')">
            了解更多
          </el-button>
          <el-button @click="handleSelect('#more')">
            联系我们
          </el-button>
        </div>
      </el-carousel>
    </div>
    <div id="main" class="main">
      <el-row>
        <el-col :span="3" style="border-bottom: 1px solid transparent"/>
        <el-col :span="18">
          <Home id="home" class="main-view"/>
          <Product id="product" class="main-view"/>
          <Service id="service" class="main-view"/>
          <More id="more" class="main-view"/>
        </el-col>
        <el-col :span="3" style="border-bottom: 1px solid transparent"/>
      </el-row>
    </div>
    <div class="bottom">

    </div>
    <el-backtop target=".index-bg"></el-backtop>
  </div>
</template>

<script>
import Home from "@/views/Home";
import Product from "@/views/Product";
import Service from "@/views/Service";
import More from "@/views/More";

export default {
  name: "Index",
  components: {More, Service, Product, Home},
  data() {
    return {
      images: [
        {
          name: '1',
          url: require("../../public/images/2-总体图.jpg")
        },
        {
          name: '2',
          url: require("../../public/images/IMG_0433.jpg")
        },
        {
          name: '3',
          url: require("../../public/images/IMG_0434.jpg")
        }
      ],
      activeIndex: '/home',
      scrollTop: 0,
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
      document.querySelector(key).scrollIntoView(true);
    },
    //保存滚动值
    handleScroll(e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = e.target.scrollTop
      if (this.scrollTop > 0) {
        this.$store.state.isTop = false
      } else {
        this.$store.state.isTop = true
      }
      let homeHeight = document.getElementById('home').offsetTop + 760
      let productHeight = document.getElementById('product').offsetTop + 760
      let serviceHeight = document.getElementById('service').offsetTop + 760
      let moreHeight = document.getElementById('more').offsetTop + 760
      let offset = 100
      if (this.scrollTop <= offset) {
        this.activeIndex = ''
      } else if (this.scrollTop >= homeHeight - offset && this.scrollTop <= homeHeight + offset) {
        this.activeIndex = '#home'
      } else if (this.scrollTop >= productHeight - offset && this.scrollTop <= productHeight + offset) {
        this.activeIndex = '#product'
      } else if (this.scrollTop >= serviceHeight - offset && this.scrollTop <= serviceHeight + offset) {
        this.activeIndex = '#service'
      } else if (this.scrollTop >= moreHeight - offset && this.scrollTop <= moreHeight + offset) {
        this.activeIndex = '#more'
      }
    },
  },
  mounted() {
    //监听页面滚动
    window.addEventListener('scroll', this.handleScroll, true)
  },

  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less" scoped>
.index-bg {
  height: 100vh;
  overflow-x: hidden;
  background-color: #f9f7f7;
}

.top {
  background-color: transparent;

  /deep/ .el-menu {
    position: absolute;
    right: 10%;
    font-weight: bold;

    .el-menu-item {
      color: #f0f0f0;
    }

    .el-menu-item:focus {
      background-color: transparent;
      border-bottom: 0;
    }

    .el-menu-item:hover {
      background-color: transparent;
      color: #409eff;
      border-bottom: 0;
    }

    .el-menu-item.is-active {
      background-color: transparent;
      color: #409eff;
      border-bottom: 0;
      border-top: 2px solid #409eff;
    }
  }
}

.not-top {
  background-color: #f9f7f7;
  border-bottom: 2px solid #cecece;

  /deep/ .el-menu {
    position: absolute;
    right: 10%;
    font-weight: bold;

    .el-menu-item {
      color: #0f0f0f;
    }

    .el-menu-item:focus {
      background-color: transparent;
      border-bottom: 0;
    }

    .el-menu-item:hover {
      background-color: transparent;
      color: #409eff;
      border-bottom: 0;
    }

    .el-menu-item.is-active {
      background-color: transparent;
      color: #409eff;
      border-bottom: 0;
      border-top: 2px solid #409eff;
    }
  }
}

.top-menu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  animation: fade-in 1s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    margin-left: 100px;
  }
}

.menu {
  background-color: transparent;
  border-bottom: 0;
}

.logo {
  margin: 15px 0 0 10px;
  width: 30px;
}

// 自定义切换箭头样式
/deep/ .el-carousel__arrow {
  position: absolute;
  top: 120%;
  width: 50px;
  height: 50px;
  background-color: #f0f0f055;
  border-radius: 25%;
}

/deep/ .el-carousel__arrow--left {
  animation: fade-in-left 1s ease-out;
}

/deep/ .el-carousel__arrow--right {
  animation: fade-in-right 1s ease-out;
}

@keyframes fade-in-left {
  0% {
    left: -10%;
    opacity: 0;
  }
}

@keyframes fade-in-right {
  0% {
    right: -10%;
    opacity: 0;
  }
}

// 自定义指示器样式
/deep/ .el-carousel__indicators--horizontal {
  position: absolute;
  bottom: 30px;
  text-align: center;

  .el-carousel__indicator--horizontal button {
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.5;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 24px;
    height: 8px;
    background: #ffffff;
    opacity: 0.5;
    border-radius: 10px;
  }

  animation: fade-in-bottom 1s ease-out;
}

@keyframes fade-in-bottom {
  0% {
    bottom: -10%;
    opacity: 0;
  }
}

.top-carousel {
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel {
  height: 100vh;
}

.carousel-item {
  height: 100vh;
}

.image {
  filter: brightness(25%);
  width: 100%;
  height: 100vh;
}

.index-title {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%);
  z-index: 999;
  font-size: 60px;
  font-weight: bold;
  color: #f0f0f0;
  letter-spacing: 10px;
  animation: title 1s ease-out;
}

@keyframes title {
  0% {
    top: 70%;
    color: #f0f0f000;
  }
}

.index-button {
  position: absolute;
  z-index: 50;
  top: 130%;
  left: 50%;
  transform: translate(-50%);
  animation: button 1s ease-out;
}

@keyframes button {
  0% {
    top: 140%;
    opacity: 0;
  }

}

/deep/ .el-button {
  color: #f0f0f0;
  background-color: transparent;
  font-weight: bold;
}

/deep/ .el-button:hover {
  color: #409eff;
  background-color: #f0f0f0;
}

.main {
  width: 100%;
  min-height: 100vh;
}

.main-view {
  padding: 80px 20px 20px 20px;
  width: 100%;
  min-height: 100vh;
  background-color: #f9f7f7;
}

.bottom {
  width: 100%;
  height: 120px;
  background-color: #35363a;
}
</style>
