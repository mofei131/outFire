import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/device/device/page',
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
    url: '/api/device/device/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/device/device/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/device/device/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/device/device/submit',
    method: 'post',
    data: row
  })
}

export const selectListGroupByType2Id = () =>{
  return request({
    url: '/api/device/device/groupbytype2id',
    method: 'get'
  })
}
