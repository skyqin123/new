
// 事件过滤器
export const timeformat = (time, spe) => {
  spe = spe || '-'
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = time.getDate()
  day = day < 10 ? '0' + day : day

  return year + spe + month + spe + day
}
