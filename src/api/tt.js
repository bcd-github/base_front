import request from '@/utils/request'

// 获取用户列表
export const getList = (params) => {
    return request({
        url: '/test/list',
        method: 'get',
        params
    })
}

export const addUser = (data) => {
    return request({
        url: '/test/add',
        method: 'post',
        data
    })
}

export const delUser = (data) => {
    return request({
        url: '/test/delete',
        method: 'post',
        data
    })}

export const editUser = (data) => {
    return request({
        url: '/test/update',
        method: 'post',
        data
    })}
