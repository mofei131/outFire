import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/industry-type/compindustry/list',
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
    url: '/api/industry-type/compindustry/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/industry-type/compindustry/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/industry-type/compindustry/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/industry-type/compindustry/submit',
    method: 'post',
    data: row
  })
}

export const getCompIndustryTree = (row) => {
  return request({
    url: '/api/industry-type/compindustry/tree',
    method: 'get',
    params: {
      row,
    }
  })
}