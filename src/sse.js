/**
 * iterget - EventSource业务接口封装
 *
 * 前端
 *   https://github.com/wangzihaogithub/sse-js.git
 *
 * 后端
 *   <!-- https://mvnrepository.com/artifact/com.github.wangzihaogithub/sse-server -->
 *   <dependency>
 *      <groupId>com.github.wangzihaogithub</groupId>
 *      <artifactId>sse-server</artifactId>
 *      <version>1.0.3</version>
 *   </dependency>
 */
class Sse {
  static version = '1.0.0'
  static defaultOptions = {
    url: '/common/sse',
    eventListeners: {}
  }

  constructor(options) {
    this.options = Object.assign({}, Sse.defaultOptions, options)

    this.handleConnectionFinish = (event) => {
      const res = JSON.parse(event.data)
      this.connectionId = res.connectionId
      this.reconnectDuration = res.duration || 5000
    }

    this.handleOpen = () => {
      this.clearReconnectTimer()
    }

    this.handleError = () => {
      this.clearReconnectTimer()
      this.timer = setTimeout(() => {
        this.newEventSource().then(es => {
          this.es = es
        })
      }, this.reconnectDuration || 5000)
    }

    this.newEventSource = () => {
      return this.close().then(_ => {
        const es = new EventSource(`${this.options.url}/connect?sseVersion=${Sse.version}`)
        es.addEventListener('connect-finish', this.handleConnectionFinish)
        es.addEventListener('open', this.handleOpen)    // 连接成功
        es.addEventListener('error', this.handleError)  // 失败
        // 用户事件
        for (let eventName in this.options.eventListeners) {
          es.addEventListener(eventName, this.options.eventListeners[eventName])
        }
        return es
      })
    }

    this.clearReconnectTimer = () => {
      if (typeof this.timer === 'number') {
        clearTimeout(this.timer)
        this.timer = null
      }
    }

    this.destroy = () => {
      this.clearReconnectTimer()
      this.close()
    }

    this.close = () => {
      if (this.es) {
        this.es.close()
        if (this.connectionId !== undefined) {
          try {
            return fetch(`${this.options.url}/disconnect?connectionId=${this.connectionId}`).then(_ => {
              // 关闭连接
              this.clearReconnectTimer()
              this.es = null
            })
          } catch (e) {
          }
        }
      }
      return Promise.resolve()
    }

    // 监听浏览器窗口切换时
    document.addEventListener('visibilitychange', (e) => {
      this.clearReconnectTimer()
      if (document.visibilityState === 'visible') {
        this.newEventSource().then(es => {
          this.es = es
        })
      } else {
        this.close()
      }
    })
    // 页签关闭时
    window.addEventListener('unload', () => {
      let params = new URLSearchParams()
      params.set('connectionId', this.connectionId)
      params.set('method', 'beacon')
      params.set('sseVersion', Sse.version)
      navigator.sendBeacon(`${this.options.url}/disconnect`, params)
    }, false)
    this.newEventSource().then(es => {
      this.es = es
    })
  }
}

export default Sse