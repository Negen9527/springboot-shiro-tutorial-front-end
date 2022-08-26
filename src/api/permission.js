import request from '@/utils/request'

export function addPermission(data) {
  return request({
    url: '/permission/add',
    method: 'post',
    data
  })
}

export function getAll(token) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: { token }
  })
}

export function getTreeData(token) {
  return request({
    url: '/permission/list/tree',
    method: 'get',
    params: { token }
  })
}

export function deletePermission(data) {
  return request({
    url: '/permission/delete',
    method: 'post',
    data
  })
}
