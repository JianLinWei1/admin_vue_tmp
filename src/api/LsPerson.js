import request from '@/utils/request'

export function getLsPersons(params) {
  return request({
    url: '/api/prisonstaff/query',
    method: 'get',
    params
  })
}
//添加人员
export function  addLsPerson(params){
	return request({
		url:'/api/prisonstaff/insert',
		method:'post',
		data:[params]
	})
}
//删除人员
export function delLsPerson(params){
	return request({
		url:'/api/prisonstaff/delete',
		method:'post',
		data:[params]
	})
}

//设备查询
export  function getLjDevices(params){
	return request({
		url:'/api/prisondevice/query',
		method:'get',
		params
	})
}
//比对记录
export  function  getLsRecord(params){
	return  request({
		url:'/api/prisonrecord/query',
		method:'get',
		params
	})
}
