# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 技术实现思路

## 项目概述

这是一个基于 React 和 Three.js 的 WebGL 3D 地球展示项目，主要展示带有标记点的交互式地球模型，并结合个人作品集网站功能。

## 技术栈

- **前端框架**: React 19 + TypeScript
- **3D 渲染**: Three.js + React Three Fiber + Drei
- **动画效果**: GSAP
- **UI 动效**: Framer Motion
- **路由管理**: React Router
- **样式处理**: SASS

## 核心功能实现

1. **3D 地球渲染**:

   - 使用 Three.js 创建真实感地球模型
   - 实现地球表面纹理、凹凸贴图和高光贴图
   - 添加半透明云层效果
   - 实现大气层发光效果(shader 实现)

2. **交互标记**:

   - 在地球表面添加地理位置标记
   - 标记点带有脉冲动画效果
   - 标记点附带文字说明

3. **响应式界面**:

   - 适配不同设备屏幕尺寸
   - 窗口大小变化时自动调整 3D 场景

4. **个人作品集部分**:
   - 导航栏(Navbar)组件
   - 首页介绍(Hero)组件
   - 关于我(About)组件
   - 技能展示(Skills)组件
   - 工作经历(Experience)组件
   - 联系方式(Contact)组件

## 项目结构

```
src/
├── components/       # React组件
│   ├── Navbar/       # 导航栏组件
│   ├── Hero/         # 首页介绍组件
│   ├── About/        # 关于我组件
│   ├── Skills/       # 技能展示组件
│   ├── Experience/   # 工作经历组件
│   ├── Contact/      # 联系方式组件
│   └── ThreeText.tsx # Three.js文本渲染组件
├── scenes/           # Three.js场景
│   └── ThreeScene.tsx # 3D地球场景
├── styles/           # 样式文件
├── hooks/            # 自定义React钩子
├── utils/            # 工具函数
├── assets/           # 静态资源
└── App.tsx           # 应用主组件
```

## 技术亮点

1. 使用 WebGL 实现高性能 3D 渲染
2. 结合 React 组件化思想与 Three.js 的 3D 渲染能力
3. 使用异步加载管理器处理 3D 贴图资源
4. 运用着色器(shader)实现高级视觉效果
5. 优化 3D 渲染性能，提供流畅用户体验
