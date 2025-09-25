import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

export interface Notice {
  show: boolean
  text: string
  color?: string
  timeout?: number
  icon?: string
}

const notice = ref<Notice>({ show: false, text: '', color: 'info', timeout: 3000 })

export function useNotifier() {
  const theme = useTheme()

  // 根据主题调整颜色
  const getAdaptiveColor = (color: string) => {
    if (theme.global.current.value.dark) {
      // 深色主题下的颜色适配
      switch (color) {
        case 'success':
          return 'green-darken-2' // 深绿色，更适合深色主题
        case 'error':
          return 'red-darken-2' // 深红色
        case 'warning':
          return 'orange-darken-2' // 深橙色
        case 'info':
          return 'blue-darken-2' // 深蓝色
        default:
          return color
      }
    } else {
      // 浅色主题保持原有颜色
      return color
    }
  }

  function notify(text: string, color: string = 'info', timeout = 3000, icon?: string) {
    const adaptiveColor = getAdaptiveColor(color)
    notice.value = { show: true, text, color: adaptiveColor, timeout, icon }
  }

  function hide() {
    notice.value.show = false
  }

  return { notice, notify, hide }
}

// 函数式导出，便于在非 setup 场景使用
export function notify(text: string, color: string = 'info', timeout = 3000, icon?: string) {
  // 这里需要创建一个临时的 composable 来获取主题
  const isDark = document.documentElement.classList.contains('v-theme--dark')

  const getAdaptiveColor = (color: string) => {
    if (isDark) {
      switch (color) {
        case 'success':
          return 'green-darken-2'
        case 'error':
          return 'red-darken-2'
        case 'warning':
          return 'orange-darken-2'
        case 'info':
          return 'blue-darken-2'
        default:
          return color
      }
    }
    return color
  }

  const adaptiveColor = getAdaptiveColor(color)
  notice.value = { show: true, text, color: adaptiveColor, timeout, icon }
}
