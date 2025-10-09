import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { MenuItem } from '@/types/menuItem'
import { MAIN_MENU_LIST, OTHER_MENU_LIST } from '@/constants/menu'

export const useMenuStore = defineStore('menuList', () => {
  const menuList: Ref<MenuItem[]> = ref(MAIN_MENU_LIST)

  // 其它菜单
  const otherMenuList: Ref<MenuItem[]> = ref(OTHER_MENU_LIST)

  return {
    menuList,
    otherMenuList,
  }
})
