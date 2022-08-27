import request from '@/utils/request'

export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function getAll(token) {
  return request({
    url: '/role/list',
    method: 'get',
    params: { token }
  })
}

export function addRolePermissionsR(data) {
  return request({
    url: '/role-permission-r/add',
    method: 'post',
    data
  })
}
export function listPermissionIdsByRoleId(roleId) {
  return request({
    url: '/role/listByRoleId',
    method: 'get',
    params: { roleId }
  })
}

export function getListTree(token) {
  return request({
    url: '/role/list/tree',
    method: 'get',
    params: { token }
  })
}
