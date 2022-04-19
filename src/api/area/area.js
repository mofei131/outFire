import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/area/area/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/area/area/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/area/area/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/area/area/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/area/area/submit',
    method: 'post',
    data: row
  })
}

export const getAreaTree = (row) => {
  return request({
    url: '/api/area/area/tree',
    method: 'get',
    params: {
      row,
    }
  })
}
export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/area/area/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}