import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/organize/organize/page',
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
    url: '/api/organize/organize/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/organize/organize/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/organize/organize/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/organize/organize/submit',
    method: 'post',
    data: row
  })
}

export const getMaxCid = (params) => {
  return request({
    url: '/api/organize/organize/getMaxCid',
    method: 'get',
    data: params
  })
}

