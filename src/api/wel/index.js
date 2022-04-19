import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/comp/comp/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getTreeData = () => {
  return request({
    url: '/api/area/area/tree',
    method: 'get',

  })
}

export const getAllComp = () => {
  return request({
    url: '/api/comp/comp/page',
    method: 'get',

  })
}

export const getSingleComp = (id) => {
  return request({
    url: `/api/comp/comp/GetCompById?Id=${id}`,
    method: 'get',
  })
}

export const getAreaComp = (areaId) => {
  return request({
    url: `/api/comp/comp/GetAll?areaId=${areaId}`,
    method: 'get',
  })
}



export const getDetail = () => {
  return request({
    url: '/api/wel/index/detail',
    method: 'get',

  })
}

export const remove = (ids) => {
  return request({
    url: '/api/wel/index/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/wel/index/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/wel/index/submit',
    method: 'post',
    data: row
  })
}

