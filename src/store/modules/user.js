import {setToken, setRefreshToken, removeToken, removeRefreshToken} from '@/util/auth'
import {Message} from 'element-ui'
import {setStore, getStore} from '@/util/store'
import {isURL, validatenull} from '@/util/validate'
import {deepClone} from '@/util/util'
import webiste from '@/config/website'
import {loginByUsername, getUserInfo, logout, refreshToken, getButtons} from '@/api/user'
import {getTopMenu, getRoutes} from '@/api/system/menu'


function addPath(ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) ele[propsDefault.children] = [];
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child);
    })
  }

}

const user = {
  state: {
    tenantId: getStore({name: 'tenantId'}) || '',
    userInfo: getStore({name: 'userInfo'}) || [],
    permission: getStore({name: 'permission'}) || {},
    roles: [],
    menu: getStore({name: 'menu'}) || [],
    menuAll: [],
    token: getStore({name: 'token'}) || '',
    refreshToken: getStore({name: 'refreshToken'}) || '',
  },
  actions: {
    //根据用户名登录
    LoginByUsername({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.tenantId, userInfo.username, userInfo.password, userInfo.type).then(res => {
          const data = res.data;
          if (data.error_description) {
            Message({
              message: data.error_description,
              type: 'error'
            })
          } else {
            commit('SET_TOKEN', data.access_token);
            commit('SET_REFRESH_TOKEN', data.refresh_token);
            commit('SET_TENANT_ID', data.tenant_id);
            commit('SET_USER_INFO', data);
            commit('DEL_ALL_TAG');
            commit('CLEAR_LOCK');
          }
          resolve();
        }).catch(error => {
          // const data = {
          //   access_token: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiLkuIDoiKznlKjmiLciLCJ1c2VyX2lkIjoiMTIwMjQzNDA5NzQzOTkyNDIyNiIsInJvbGVfaWQiOiIxMjAyNDM0MjEyNjc4NDI2NjI1IiwidXNlcl9uYW1lIjoidGVzdCIsIm5pY2tfbmFtZSI6Iua1i-ivlSIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMyIsImFjY291bnQiOiJ0ZXN0IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1OTQ5NzU2MDMsIm5iZiI6MTU5NDk3MjAwM30.fFWyv_-ITsjhWTH0H7DpH9mvyUEM3TeoEoNbuqYrMjY",
          //   account: "test",
          //   area_id: "650000",
          //   avatar: "http://47.101.40.188:9000/iot/upload/20191223/77f2e8d060166bfebf54d4645a0eff06.jpg",
          //   comp_id: 22,
          //   expires_in: 3600,
          //   is_use: 1,
          //   license: "powered by bladex",
          //   nick_name: "测试",
          //   refresh_token: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTIwMjQzNDA5NzQzOTkyNDIyNiIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1OTU1NzY4MDIsIm5iZiI6MTU5NDk3MjAwM30.UdKAIVXMjIlOWi_LsL3kGjPK2dIGTmJkoSHgPaOn3HU",
          //   role_name: "一般用户",
          //   tenant_id: "000000",
          //   token_type: "bearer",
          //   user_id: 1202434097439924200,
          //   user_name: "test"
          // }
          // if (data.error_description) {
          //   Message({
          //     message: data.error_description,
          //     type: 'error'
          //   })
          // } else {
          //   commit('SET_TOKEN', data.access_token);
          //   commit('SET_REFRESH_TOKEN', data.refresh_token);
          //   commit('SET_TENANT_ID', data.tenant_id);
          //   commit('SET_USER_INFO', data);
          //   commit('DEL_ALL_TAG');
          //   commit('CLEAR_LOCK');
          // }
          reject(error);
        })
      })
    },
    GetButtons({commit}) {
      return new Promise((resolve) => {
        getButtons().then(res => {
          const data = res.data.data;
          commit('SET_PERMISSION', data);
          resolve();
        })
      })
    },
    //根据手机号登录
    LoginByPhone({commit}, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = res.data.data;
          commit('SET_ROLES', data.roles);
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //刷新token
    refreshToken({state, commit}) {
      console.log('handle refresh token')
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken, state.tenantId).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data.access_token);
          commit('SET_REFRESH_TOKEN', data.refresh_token);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENU', [])
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          removeToken()
          removeRefreshToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    //获取顶部菜单
    GetTopMenu() {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    //获取系统菜单
    GetMenu({commit, dispatch}, topMenuId) {
      return new Promise(resolve => {
        getRoutes(topMenuId).then((res) => {
          const data = res.data.data
          let menu = deepClone(data);
          menu.forEach(ele => {
            addPath(ele, true);
          })
          commit('SET_MENU', menu)
          dispatch('GetButtons');
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token;
      setStore({name: 'token', content: state.token, type: 'session'})
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken;
      setStore({name: 'refreshToken', content: state.refreshToken, type: 'session'})
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId;
      setStore({name: 'tenantId', content: state.tenantId, type: 'session'})
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
      setStore({name: 'userInfo', content: state.userInfo})
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({name: 'menu', content: state.menu, type: 'session'})
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      let result = [];

      function getCode(list) {
        list.forEach(ele => {
          if (typeof (ele) === 'object') {
            const chiildren = ele.children;
            const code = ele.code;
            if (chiildren) {
              getCode(chiildren)
            } else {
              result.push(code);
            }
          }

        })
      }

      getCode(permission);
      state.permission = {};
      result.forEach(ele => {
        state.permission[ele] = true;
      });
      setStore({name: 'permission', content: state.permission, type: 'session'})
    }
  }

}
export default user
