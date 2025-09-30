import { ref } from 'vue'

export interface Notice {
  show: boolean
  text: string
  color?: string
  timeout?: number
  icon?: string
  title?: string
}

const notice = ref<Notice>({ show: false, text: '', color: 'info', timeout: 3000 })

export function useNotifier() {
  function notify(
    text: string,
    color: string = 'info',
    timeout = 3000,
    title?: string,
    icon?: string
  ) {
    notice.value = { show: true, text, color: color, timeout, title, icon }
  }

  function hide() {
    notice.value.show = false
  }

  return { notice, notify, hide }
}

// 函数式导出，便于在非 setup 场景使用
export function notify(text: string, color: string = 'info', timeout = 3000, icon?: string) {
  notice.value = { show: true, text, color: color, timeout, icon }
}
