import { createStore } from 'vuex'

// 保存到localstorage
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
// 从localstorage 中获取cartlist数据
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList()/* {
      第一层级是商铺id
      shopId: {
        shopName: '沃尔玛',
        第二层是商品id
        第二层内容是加入购物车的商品内容以及数量
        productList: {
          productId1: {
              imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
              name: '番茄 250g / 份',
              oldPrice: 39.6,
              price: 33.6,
              sales: 10,
              _id: '1',
              count: 0
            },
            productId2: {
              imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
              name: '番茄 250g / 份',
              oldPrice: 39.6,
              price: 33.6,
              sales: 10,
              _id: '1',
              count: 0
            }
          }
        }
      }
    } */
  },
  mutations: {
    // 增减商品逻辑
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) { product.count = 0 }
      if (product.count >= 999) { product.count = 999 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 获取商店名称
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 是否勾选商品
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId]?.productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车逻辑
    clearCartProduct (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 全选
    setCartItemChecked (state, payload) {
      const { shopId } = payload
      const productList = state.cartList[shopId].productList
      if (productList) {
        let flag = true
        for (const key in productList) {
          if (productList[key].check === false) {
            flag = false
            break
          }
        }
        if (!flag) {
          for (const key in productList) {
            productList[key].check = true
          }
        } else {
          for (const key in productList) {
            productList[key].check = false
          }
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
