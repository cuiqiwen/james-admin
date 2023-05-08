import request from '@/utils/request'

export function getMsgInfoByMinAction() {
  return request({
    url: '/vue-admin-template/report/get_msg_info_by_min',
    method: 'post'
  })
}

export function getMsgInfoByMinHistoryAction(num) {
  return request({
    url: '/vue-admin-template/report/get_msg_info_by_min_history',
    method: 'post',
    params: {
      num
    }
  })
}

export function getIncomeStatInfoAction() {
  return request({
    url: '/vue-admin-template/report/get_income_stat_info',
    method: 'post',
    params: {}
  })
}

export function getUserOnlineStatAction() {
  return request({
    url: '/vue-admin-template/report/get_user_online_stat',
    method: 'post',
    params: {}
  })
}

export function getSendGiftQpsAction() {
  return request({
    url: '/vue-admin-template/report/get_send_gift_qps',
    method: 'post',
    params: {}
  })
}

