import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/category-type/compcategory/list',
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
    url: '/api/category-type/compcategory/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/category-type/compcategory/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/category-type/compcategory/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/category-type/compcategory/submit',
    method: 'post',
    data: row
  })
}

export const getCompCategoryTree = (row) => {
  return request({
    url: '/api/category-type/compcategory/tree',
    method: 'get',
    params: {
      row,
    }
  })
}
