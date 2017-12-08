# cloud-music
迟到的网易云音乐

项目视频展示
<a href="https://pan.baidu.com/play/video#video/path=%2F2017.12.08-10.02.04.mp4&t=-1">项目视频展示链接(更新版)</a>

# 前言

网上目前已经有了很多vue写的音乐播放器。但是本胖还是想自己踩一遍坑，毕竟自己踩的坑以后印象才会最深。主要是因为本胖这1年多都是在做商城购物类型网站，对音乐视频这方面没有踩坑经验，所以就很想来踩坑哈。<br/>

# 项目总结

1.歌词同步<br/>
接口返回的是每段歌词前面带有时间点的字符串。先要把字符串转为为数组，并且将每段歌词前的时间点转为为以秒为单位的时间格式存在一个数组里面，注意渲染歌词的时候，只能渲染一个数组（也就是歌词数组，歌词时间数组和歌词数组的index是同一个的）。然后只需要控制歌词容器的WebkitTransform就行了，最好是让初始化的时候第一行歌词在包裹容器的中间，然后一步步往上移动。<br/>
2.音乐后台播放<br/>
这一点，一开始我做的只能在播放组件里面播放音乐，后来把audio标签放APP.vue里面然后把控制他的一些变量放vuex里面就可以实现音乐在后台播放。<br/>
3.对于同一首歌，比如在播放烟花易冷的时候，再点击播放烟花易冷，audio不会自动从头开始播放，会继续播放下去。这样就造成了历史记录里面如果只有一首歌，你点击下一首，播放组件并没有什么反应的bug。解决方法就是手动重置audio的src属性<br/>

## 技术栈

vue2 + vue-cli + vuex + vue-router + webpack + ES6/7 


## 关于 数据接口 的说明

这个项目用到的接口都是来自这里的。

## 项目运行


```
运行接口
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

cd NeteaseCloudMusicApi

npm install 

node app.js

运行该项目
git clone https://github.com/lvpangpang/cloud-music.git 

cd cloud-music

npm install

npm run dev 

```


# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

> 吕胖胖的博客 http://www.qdfuns.com/house/15098.html

# 目标功能
- [x] 个性推荐组件 -- 完成
- [x] 歌单组件 -- 完成
- [x] 搜索组件 -- 完成
- [x] 搜索结果组件 -- 完成
- [x] 搜索歌单结果组件 -- 完成
- [x] 选择歌单分类组件 -- 完成
- [x] 音乐播放组件 -- 完成
- [x] mv播放组件 -- 完成(2017年12月8号新增)
- [x] 登录组件 -- 完成(2017年12月8号新增)
- [x] 每日歌曲推荐组件（需要登录权限） -- 完成(2017年12月8号新增)
- [x] 排行榜组件 -- 完成(2017年12月8号新增)

# 部分截图

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(2).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(6).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(4).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(5).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(3).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(7).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(1).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(8).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(9).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(10).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(11).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(12).png" width="300" height="500"/>

<img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(13).png" width="300" height="500"/><img src="https://github.com/lvpangpang/cloud-music/blob/master/images/img%20(14).png" width="300" height="500"/>




