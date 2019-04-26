import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/getUserInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'get'
  })
}
