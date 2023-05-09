const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    config_id: '@id',
    config_name: '@sentence(1, 2)',
    left_img: '',
    back_img: '',
    pcw_back_img: '',
    update_time: '@datetime',
    dur: '@integer(1, 10)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/configure/fly_template_list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          page_info: {
             total: items.length
          },
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/configure/fly_template_setting',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        msg: '成功',
        data: {}
      }
    }
  },
  {
    url: '/vue-admin-template/configure/fly_template_setting',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        msg: '成功',
        data: {}
      }
    }
  },
  {
    url: '/vue-admin-template/configure/fly_template_test',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        msg: '发送成功',
        data: {}
      }
    }
  }
]
