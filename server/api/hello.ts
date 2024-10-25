// 访问 http://localhost:1024/api/hello 即可得到 { hello: "world" }
export default defineEventHandler(() => {
  return {
    hello: 'world',
  }
})
