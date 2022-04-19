import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/outfire-check/checkoutfire/list',
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
    url: '/api/outfire-check/checkoutfire/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/outfire-check/checkoutfire/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/outfire-check/checkoutfire/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/outfire-check/checkoutfire/submit',
    method: 'post',
    data: row
  })
}

