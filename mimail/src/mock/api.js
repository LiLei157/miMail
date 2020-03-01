import Mock, { Random } from 'mockjs'

const list = []
for(let i = 0; i < 10; i++){
    list.push({
        "id":Random.guid(),
        "name":Random.cname(),
        "email":Random.email()
    })
}

Mock.mock('/list',{
    "status":0,
    "data":list
})