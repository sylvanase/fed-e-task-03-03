import dayjs from 'dayjs'
import Vue from 'vue'


Vue.filter('date', (val,  format = 'YYYY-MM-DD HH:mm:ss')=> {
  return dayjs(val).format(format)
})