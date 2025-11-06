<template>
  <el-container>
    <el-header class="app-header">
      <div class="header-content">
        <!-- Logo区域 -->
        <div class="logo-section">
          <el-image :src="logo" fit="cover" class="logo-image" />
          <span class="site-title">MicroBlogVerse</span>
        </div>

        <!-- 胶囊式导航菜单（居中） -->
        <nav class="nav-menu">
          <div class="nav-container">
            <button
              :class="['nav-item', { active: activeIndex === 'home' }]"
              @click="navigateTo('home', '/home')"
            >
              <el-icon><House /></el-icon>
              <span>主页</span>
            </button>
            <button
              :class="['nav-item', { active: activeIndex === 'trend' }]"
              @click="navigateTo('trend', '/trend')"
            >
              <el-icon><TrendCharts /></el-icon>
              <span>趋势</span>
            </button>
          </div>
        </nav>

        <!-- 工具栏（右侧） -->
        <div class="toolbar">
          <el-input
            v-model="keyword"
            placeholder="搜索文章、用户..."
            size="large"
            class="modern-search"
            @keyup.enter="search"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div class="action-group">
            <button class="action-btn primary" @click="navigateTo('write', '/write')">
              <el-icon><Edit /></el-icon>
              <span>写文章</span>
            </button>
            <button class="action-btn secondary">
              <el-icon><Bell /></el-icon>
              <el-badge :value="notificationCount" :max="99" />
            </button>
          </div>
          <div v-if="!user.id" class="login-section">
            <button class="login-btn" @click="$router.push('/login')">
              <el-icon><User /></el-icon>
              <span>登录</span>
            </button>
          </div>
          <div v-else class="toolbar-item">
            <el-popover trigger="hover" placement="bottom-end">
              <template #reference>
                <el-avatar :src="user.avatar" size="large" />
              </template>
              <div class="user-menu">
                <el-link @click="navigateTo('profile', `/profile?id=${user.id}`)">
                  <el-icon><User /></el-icon>
                  个人中心
                </el-link>
                <el-link @click="signOut">
                  <el-icon><SwitchButton /></el-icon>
                  退出
                </el-link>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { Edit, Message, User, SwitchButton, Search, House, TrendCharts, Bell } from '@element-plus/icons-vue'
import logo from '@/static/images/logo.png'

export default {
  name: "Index",
  components: {
    Edit,
    Message,
    User,
    SwitchButton,
    Search,
    House,
    TrendCharts,
    Bell
  },
  data() {
    return {
      user: {
        id: '',
        username: '',
        nickname: '',
        avatar: ''
      },
      activeIndex: 'home',
      keyword: '',
      notificationCount: 3, // 示例通知数量
      logo
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem("satoken")
      this.$cookies.delete("id")
      this.$cookies.delete("username")
      this.$cookies.delete("nickname")
      this.$cookies.delete("avatar")
      this.$router.push("/login")
    },

    search() {
      if (this.keyword.length > 0) {
        this.$router.push("/search?keyword=" + encodeURIComponent(this.keyword))
      }
    },

    navigateTo(page, url) {
      this.activeIndex = page
      this.$router.push(url)
    }
  },
  created() {
    this.$router.push("/home")
    this.user.id = this.$cookies.get("id")
    this.user.username = this.$cookies.get("username")
    this.user.nickname = this.$cookies.get("nickname")
    this.user.avatar = this.$cookies.get("avatar")
  }
}
</script>

<style scoped>
/* 现代化色彩变量 */
:root {
  --primary-color: #6366f1;
  --primary-light: #a5b4fc;
  --secondary-color: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --bg-primary: #ffffff;
  --bg-secondary: #f1f5f9;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.app-header {
  background: var(--bg-primary);
  border-bottom: 2px solid var(--primary-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 0;
  height: 64px;
  backdrop-filter: blur(10px);
  position: relative;
  animation: fadeInUp 0.6s ease-out;
}

.app-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light), var(--primary-color));
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 32px;
  gap: 32px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.logo-image {
  height: 44px;
  width: 44px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

.site-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-color: var(--text-primary);
  -webkit-text-fill-color: var(--text-primary);
}

/* 胶囊式导航菜单 */
.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  background: var(--bg-secondary);
  border-radius: 25px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 1. 基础按钮样式 */
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  background-color: transparent; /* 默认透明背景 */
  border-radius: 21px;
  color: var(--text-secondary); /* 默认灰色文字 */
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}


/* 当鼠标悬停在未激活的按钮上时，让它“预览”激活后的样子 */
.nav-item:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  transform: translateY(-2px); /* 悬停时上浮，增加动感 */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); /* 阴影更明显 */
}

/* 3. "激活" 状态的样式 (始终保持紫色) */
/* 想要的“玻璃质感”常驻效果 */
.nav-item.active {
  background-color: rgba(255, 255, 255, 0.95); /* 使用高透明度的白色作为背景，营造玻璃感 */
  color: var(--text-primary); /* 文字变为深色以保证清晰度 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加柔和的阴影，使其“浮”起来 */
}

/* 4. "激活" 状态下的悬停效果 (可选，提供细微的交互感) */
/* 当鼠标悬停在已经激活的按钮上时，也给一点细微的反馈 */
.nav-item.active:hover {
  transform: translateY(-1px); /* 稍微上浮一点点 */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); /* 阴影稍微加深 */
}


/* 5. 移除原先对 span 的单独样式，让其自然继承父元素颜色 */
.nav-item span {
  font-weight: 500;
  position: relative;
}

/* 工具栏（右侧） */
.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  justify-content: flex-end;
}

/* 搜索框样式 */
.modern-search {
  width: 280px;
  /* border-radius: 25px;
  overflow: hidden; */
}

.modern-search :deep(.el-input__wrapper) {
  border-radius: 25px;
  /* 1. 默认状态：使用更柔和的边框和背景，使其更干净 */
  border: 1px solid var(--border-color); /* 初始为1px的浅灰色边框 */
  background: var(--bg-secondary);        /* 初始为浅灰色背景，与页面协调 */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* 添加细微的内阴影增加立体感 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

/* --- 4. 搜索框 --- */
/* 为搜索框也添加轻微的悬浮效果，保持交互统一 */
.modern-search:hover :deep(.el-input__wrapper) {
  border-color: var(--primary-light);
  transform: translateY(-1px); /* 轻微上浮 */
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); /* 添加柔和的阴影 */
}

/* 3. 聚焦状态：边框变为主色，并添加外发光效果，提供清晰的视觉反馈 */
/* 搜索框聚焦样式，它和悬停样式需要协同工作 */
.modern-search:focus-within :deep(.el-input__wrapper) {
  background: var(--bg-primary);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  transform: translateY(0); /* 聚焦时恢复原位，防止抖动 */
}

/* 按钮组合容器 */
.action-group {
  grid-column: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background: var(--bg-secondary);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

/* 写文章按钮样式 */
.write-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.write-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.write-btn:active {
  transform: translateY(0);
}

/* 消息按钮样式 */
.message-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.message-btn:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-btn.primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

/* --- 1. 写文章按钮 (主要按钮) --- */
/* 保留了品牌色，但通过增加光泽和更强的阴影来模拟悬浮感 */
.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  /* 在原有渐变上叠加一层高光，使其更亮、更有质感 */
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
}

.action-btn.secondary {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

/* --- 2. 通知按钮 (次要按钮) --- */
/* 直接应用导航菜单的玻璃悬浮效果 */
.action-btn.secondary:hover {
  background-color: rgba(255, 255, 255, 0.95);
  color: var(--text-primary); /* 文字变深色 */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: transparent; /* 隐藏边框，看起来更像浮动的卡片 */
}

.toolbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.toolbar-item:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.user-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-menu .el-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.user-menu .el-link:hover {
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

/* 登录按钮样式 */
.login-section {
  grid-column: 5;
  flex-shrink: 0;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* --- 3. 登录按钮 --- */
/* 将原有的颜色填充效果，替换为统一的玻璃悬浮效果 */
.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.95);
  color: var(--text-primary); /* 文字颜色从主题色变为深色 */
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  /* 保持边框颜色与主题色一致，作为品牌元素的延续 */
  border-color: var(--primary-light);
}

.login-btn:active {
  transform: translateY(0);
}

/* 主内容区域现代化 */
.el-main {
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--bg-secondary) 100%);
  min-height: calc(100vh - 64px);
  padding: 32px 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin: 0 32px;
}


/* 响应式布局调整 */
@media (max-width: 1280px) {
  .header-content {
    grid-template-columns: auto minmax(150px, 250px) auto minmax(200px, 350px) auto;
    padding: 0 16px;
  }
}

@media (max-width: 1024px) {
  .header-content {
    grid-template-columns: auto auto 1fr;
    gap: 16px;
  }

  .logo-section {
    grid-column: 1;
  }

  .nav-menu {
    grid-column: 2;
  }

  .toolbar {
    grid-column: 3;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 12px 8px;
    gap: 8px;
  }

  .nav-menu {
    display: none;
  }

  .toolbar {
    justify-content: center;
  }

  .logo-section {
    justify-content: center;
  }
}
/* 动画增强 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-header {
  animation: fadeInUp 0.6s ease-out;
}

.nav-item, .action-btn, .toolbar-item {
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}

.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.2s; }
.action-btn { animation-delay: 0.3s; }
.toolbar-item { animation-delay: 0.4s; }
</style>
