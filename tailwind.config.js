module.exports = {
  content: ["./source/web/**/*.{html,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {}
    /**
     * @summary 配置 0 ～ 1000 这个范围内的数字均为 px 单位
     */
    // spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
    //   map[index] = `${index}px`
    //   return map
    // }, {})
  },
  plugins: []
}
