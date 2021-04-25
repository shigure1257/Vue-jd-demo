import { useStore } from 'vuex'
import { computed } from 'vue'
// 商品增删逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  // 展示所购商品信息
  const productList = computed(() => {
    let productList = cartList[shopId]?.productList || {}
    const selectItemList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        selectItemList[i] = product
      }
    }
    productList = selectItemList
    return selectItemList
  })

  // 获取商店名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 就算商品数量以及总价
  const calcuations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, totalprice: 0, allchecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.totalprice += (product.price * product.count)
        }
        if (product.count > 0 && !product.check) {
          result.allchecked = false
        }
      }
    }
    result.totalprice = result.totalprice.toFixed(2)
    return result
  })
  return { changeCartItemInfo, cartList, productList, shopName, calcuations }
}
