const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})


module.exports = [
  {
    url: '/vue-admin-template/report/get_msg_info_by_min',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: {
             "msg_data": {
                "current_time": "22:00:00",
                "send_gift_num": 1000000,
                "add_score_num": 500000,
                "total_msg": 500000
            }
          }
        }
      }
  },
  {
    url: '/vue-admin-template/report/get_msg_info_by_min_history',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: [
            {
                "current_time": "22:00:00",
                "send_gift_num": 1000000,
                "add_score_num": 500
            },
            {
                "current_time": "22:01:00",
                "send_gift_num": 500000,
                "add_score_num": 300
            },
            {
                "current_time": "22:02:00",
                "send_gift_num": 300000,
                "add_score_num": 1000
            }
          ]

        }
      }
  },
  {
    url: '/vue-admin-template/report/get_income_stat_info',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: [
           [
            "2023-01-01",
            10000,
            10,
            100
           ],
           [
            "2023-01-02",
            10000,
            10,
            90
           ],
        ]
      }
    }
  },
  {
    url: '/vue-admin-template/report/get_user_online_stat',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: {"login_user": 1000, "anonymous_user": 0}
      }
    }
  },
  {
    url: '/vue-admin-template/report/get_send_gift_qps',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: {
              "2023-01-01 22:00:00": {"qidou_qps": 1000, "zuanshi_qps": 1000, "qidian_qps": 2000},
              "2023-01-01 22:01:00": {"qidou_qps": 1000, "zuanshi_qps": 1000, "qidian_qps": 2000},
              "2023-01-01 22:02:00": {"qidou_qps": 1000, "zuanshi_qps": 1000, "qidian_qps": 2000},
              "2023-01-01 22:03:00": {"qidou_qps": 1000, "zuanshi_qps": 1000, "qidian_qps": 2000}
        }

        }

      }
    }
]
