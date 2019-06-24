const localStorage = window.localStorage

const USER_KEY = 'user_info'
// export 也用来导出。支持导出多个成员
// 这个方式有个好处：支持按需加载，需要谁加载谁 打包( npm run build) 的时候 对于没有使用的成员就不会打包到结果中
// 获取
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
// 修改
export const saveUser = data => {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}
// 删除
export const removeUser = () => {
  localStorage.removeItem(USER_KEY)
}
