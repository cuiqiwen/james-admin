export function listFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_list',
    method: 'get',
    params
  })
}

export function addFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_setting',
    method: 'get',
    params
  })
}

export function editFlyTemplateAction(params) {
  return request({
    url: '/vue-admin-template/configure/fly_template_setting',
    method: 'get',
    params
  })
}
