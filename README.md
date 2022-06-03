# sse-js

#### 介绍
sse-js

#### 软件架构
软件架构说明

#### 安装教程

1. Vue示例：


            import Sse from '../util/sse.js'
            
            mounted() {
              // 服务端推送
              this.sse = new Sse({
                url : '/api/sse',
                eventListeners:{
                  'myevent-alert': this.onAlert,
                  'myevent-bell': this.onBell
                }
              })
            },
            beforeDestroy() {
              this.sse.destroy()
            }
    
2. 示例2, 原生html或Vue：
    
    
          1. 在index.html加入代码
          
          <script>
                function addSseEventListener(url, eventListeners) {
                  return import(url).then(module => new module.default({url, eventListeners}))
                }
          </script>
  
         2. 使用
         
            const listeners = {
               'myHunterBell': this.onHunterBell,
               'xxx-xx': this.xx
             }
            addSseEventListener('/sse/hr', listeners).then(sseConnection => {
               this.sseConnection = sseConnection
            })
            
             
2. 后端java


            源码 https://github.com/wangzihaogithub/sse-server.git
            
            导包
            <!-- https://mvnrepository.com/artifact/com.github.wangzihaogithub/sse-server -->
            <dependency>
                <groupId>com.github.wangzihaogithub</groupId>
                <artifactId>sse-server</artifactId>
                <version>1.0.6</version>
            </dependency>



#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
