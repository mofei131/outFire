import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/list2',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }

  export const remove = (cid) => {
    return request({
      url: '/api/checkn/checkn/remove',
      method: 'post',
      params: {
        cid,
      }
    })
  }

  export const gpsList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/list3',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }

  export const areaList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/listcount',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }

  export const recheckList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/listrecheck',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }

  export const destrotList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/listdestrot',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }

  export const installList = (current, size, params) => {
    return request({
      url: '/api/checkalarm/checkalarm/listinstall',
      method: 'get',
      params: {
        ...params,
        current,
         size,
      }
    })
  }
  // export const getList = (id,params) => {
  //   return request({
  //     url: '/api/checkn/checkn/detail',
  //     method: 'get',
  //     params: {
  //       ...params,
  //       id
  //     }
  //   })
  // }