import request from '@/utils/request'

export function listFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_list',
    method: 'post',
    params
  })
}

export function addFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_setting',
    method: 'post',
    params
  })
}

export function editFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_setting',
    method: 'post',
    params
  })
}
export function testFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_test',
    method: 'post',
    params
  })
}
