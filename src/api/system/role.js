import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/role/list2',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/blade-system/menu/grant-tree',
    method: 'get',
  })
}

export const grant = (roleIds, menuIds, dataScopeIds, apiScopeIds) => {
  return request({
    url: '/api/role/grant',
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
      apiScopeIds
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/role/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/role/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/role/submit',
    method: 'post',
    data: row
  })
}


export const getRole = (roleIds) => {
  return request({
    url: '/api/blade-system/menu/role-tree-keys',
    method: 'get',
    params: {
      roleIds,
    }
  })
}

export const getRoleTree = (tenantId) => {
  return request({
    url: '/api/role/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}
