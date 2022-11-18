import Mock from 'mockjs'

Mock.mock('/api/user/login', 'get', {
    "status": 0,
    "data": {
        "id|1-3": 2,
        "username": "@name",
    }
})