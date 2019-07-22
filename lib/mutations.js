export default {
  setUserName: (_, { userName }, { cache }) => {
    cache.writeData({ data: { userName } })
    return null
  },
}
