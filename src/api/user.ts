import request from '@/utils/request'

export const getUser = (params: any) =>
  request({
    url: '/users',
    method: 'GET',
    params // get传递params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data // post传递data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'GET'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'PUT',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'POST',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'POST'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'POST',
    data
  })