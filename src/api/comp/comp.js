import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/comp/comp/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/comp/comp/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/comp/comp/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/comp/comp/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/comp/comp/submit',
    method: 'post',
    data: row
  })
}

export const getMaxCid = (params) => {
  return request({
    url: '/api/comp/comp/getMaxCid',
    method: 'get',
    data: params
  })
}

export const selectListGroupByPropertyId = () => {
  return request({
    url: '/api/comp/comp/groupbypropertyid',
    method: 'get'
  })
}