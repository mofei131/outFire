import request from '@/router/axios';

export const yanTai = params => {
    return request({
      url: 'http://www.weather.com.cn/data/sk/101120501.html',
      method: 'get',
      params: {
        params
      }
    })
  }