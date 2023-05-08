const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    config_id: '@id',
    config_name: '@sentence(10, 20)',
    left_img: '',
    back_img: '',
    pcw_back_img: '',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    update_time: '@datetime',
    dur: '@integer(1, 10)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/configure/fly_template_list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/configure/fly_template_setting',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/configure/fly_template_setting',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {}
      }
    }
  }
]
