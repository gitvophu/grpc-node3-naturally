/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var grpc = require('grpc');
//node-mysql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "192.168.1.111",
  user: "sa",
  password: "qwerty!@#",
  database: "test_db"
});
con.connect(function(err) {
	if(err) throw err;
	console.log("Connected");
})
//END node-mysql
const fs = require('fs');

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).phuvo.customGrpc.helloworld;

// DB query
const module_01 = require('./module_grpc_01');
const module_order = require('./module_grpc_02_order');
const module_order_detail = require('./module_grpc_03_order_detail');

const Product = module_01.Product;
const Order = module_order.Order
const OrderDetail = module_order_detail.OrderDetail;


//
function User () {
	this.find = function(id = 0,callback){
		if(id < 1){
			callback(false);
			return false;
		}

		var sql = "SELECT * FROM `users` WHERE `id` = "+id + " LIMIT 1";
		con.query(sql,function(err,result,field){
			if(err) throw err;
			if(result.length < 1){
				callback(false,field);
				return;
			}
			callback(result[0],field);
		})
	}
	this.update = function(id=0,data = {},callback){
		var obj_length = Object.keys(data).length;
		if (obj_length < 1 || id < 1) {
			callback(false);
			return false;
		}
		var set_field = '';
		var loop_index = 0 ;
		
		for(var k in data){
			loop_index++;
			set_field += ' ' + k + " = '" + data[k] + "'";
			if(loop_index !== obj_length){
				set_field += ', ';
			}
		}
		var sql = "UPDATE `users` SET "+set_field+ " WHERE id = " +id + " LIMIT 1" ;
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result);
		})
	}
	this.add = function(data = {},callback){
		var object_length = Object.keys(data).length;
		if (object_length < 1) {
			callback(false);
			return false;
		}
		var add_fields = '';
		var add_values = '';
		var loop_index = 0;
		for (var k in data){
			loop_index++;
			add_fields += k;
			add_values += "'" + data[k] + "'";
			if(loop_index !== object_length){
				add_fields += ", ";
				add_values += ", ";
			}
		}

		var sql = "INSERT INTO `users`("+add_fields+") VALUES ("+add_values+")";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result)
		})
		
	}
	this.all = function(callback){
		var sql = "SELECT * FROM `users`";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result)
		})
	}

	this.delete = function(id=0,callback){
		if(id < 1){
			callback(false);
			return false;
		}
		var sql = "DELETE FROM `users` WHERE id = " + id + " LIMIT 1";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result);
		});
	}
}

function Npp () {
	this.find = function(id = 0,callback){
		if(id < 1){
			callback(false);
			return false;
		}

		var sql = "SELECT * FROM `npp` WHERE `id` = "+id + " LIMIT 1";
		con.query(sql,function(err,result,field){
			if(err) throw err;
			if(result.length < 1){
				callback(false,field);
				return;
			}
			callback(result[0],field);
		})
	}
	this.update = function(id=0,data = {},callback){
		var obj_length = Object.keys(data).length;
		if (obj_length < 1 || id < 1) {
			callback(false);
			return false;
		}
		var set_field = '';
		var loop_index = 0 ;
		
		for(var k in data){
			loop_index++;
			set_field += ' ' + k + " = '" + data[k] + "'";
			if(loop_index !== obj_length){
				set_field += ', ';
			}
		}
		var sql = "UPDATE `npp` SET "+set_field+ " WHERE id = " +id + " LIMIT 1" ;
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result);
		})
	}
	this.add = function(data = {},callback){
		var object_length = Object.keys(data).length;
		if (object_length < 1) {
			callback(false);
			return false;
		}
		var add_fields = '';
		var add_values = '';
		var loop_index = 0;
		for (var k in data){
			loop_index++;
			add_fields += k;
			add_values += "'" + data[k] + "'";
			if(loop_index !== object_length){
				add_fields += ", ";
				add_values += ", ";
			}
		}

		var sql = "INSERT INTO `npp`("+add_fields+") VALUES ("+add_values+")";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result)
		})
		
	}
	this.all = function(callback){
		var sql = "SELECT * FROM `npp`";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result)
		})
	}
	
	this.delete = function(id=0,callback){
		if(id < 1){
			callback(false);
			return false;
		}
		var sql = "DELETE FROM `npp` WHERE id = " + id + " LIMIT 1";
		con.query(sql,function(err,result){
			if(err) throw err;
			callback(result);
		});
	}
}

var user_obj = new User() ;
var npp_obj = new Npp() ;

// END DB query
/**
 * Implements the SayHello RPC method.
 */
var product_obj = new Product(con);
var order_obj = new Order(con) ;
var order_detail_obj = new OrderDetail(con) ;


function sayHello(call, callback) {
  callback(null, {message: 'Hello 123123' + call.request.name});
}
function sayHello2(call, callback) {
  callback(null, {message: 'Hello asdasd' + call.request.name});
}
function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello Again ' + call.request.name + " -----: " + call.request.age });
}
function getProductList(call, callback){
	product_obj.all(function(arr_product){
		callback(null, {message: JSON.stringify(arr_product),products:arr_product });
	})
}

function showProduct(call,callback){
	var id = call.request.id;
	var response = {};
	product_obj.find(id,function(product){
		// product =  result;
		if (!product) {
			response['code'] = 0;
			response['message'] = "Xảy ra lỗi, id không hợp lệ";
			response['id']=0;
			response['name']='';
			response['price']=product;
		}else{
			response['code'] 	= 1000;
			response['message'] = "Lấy thông tin thành công";
			response['id']  	= product['id'];
			response['name']	= product['name'];
			response['price']	= product['price'];
		}
		callback(null,response);
	});
	
	
}
function addProduct(call, callback){
	var product = {
		id:call.request.id,
		name:call.request.name,
		price:call.request.price,
		image:call.request.image,
	}

	var arr_err = [];
	if(product.image){
		let base64_string = product.image.base64.toString('utf8');
		var tmp = base64_string.split(",");
		base64_string = tmp[1];
		var miliseconds = new Date().getTime();
		var rand_name = "file_"+miliseconds+"_";
		var file_name = rand_name + product.image.name;
		var ext = file_name.split(".").pop();
		var arr_allow = Array("jpg","jpeg","png","gif");
		if(arr_allow.includes(ext)){
			fs.writeFile('./public/'+file_name,base64_string,'base64',function(err){
				if(err){
					console.log(err);
					arr_err.push("Lỗi upload hình ảnh");
				}
			})
		}else{
			arr_err.push("Lỗi upload hình ảnh: chỉ hỗ trợ các định dạng: " + arr_allow.join(", "));
		}
		
	}
	if(!product.name){
		arr_err.push("Product name ko hop le");
	}
	if(!product.price || product.price < 0){
		arr_err.push("Product price khong hop le");
	}

	// tien hanh them moi hoac cap nhat
	var response = {};

	if(arr_err.length > 0){
		response['code'] = 0;
		response['message'] = 'Xảy ra lỗi:  ' + arr_err.join(", ");
		response['id'] = 0;
		callback(null, response);
	}else{
		if (!product.id) {
			// them moi
			var arr_insert = {name:product['name'],price:product['price']};
			if(product.image){
				arr_insert['image'] = file_name;
			}
			product_obj.add(arr_insert,function(result){
				response['code'] = 1000;
				response['message'] = 'Thêm sản phẩm thành công: ' + product.name;
				response['id'] = 0;
				console.log(result);
				callback(null, response);
				return;
			})
		}else{
			//cap nhat
			var arr_update = {name:product['name'],price:product['price']};
			if(product.image){
				arr_update['image'] = file_name;
				product_obj.find(product.id,function(product_item){
					fs.unlink("./public/"+product_item.image, function(err){
						if(err) {
							console.log(err);
						}
						console.log("unlink OK " );
					})
				})
			}
			product_obj.update(product.id,arr_update,function(result){
				if(result){
					response['code'] = 1000;
					response['message'] = 'Cập nhật sản phẩm thành công: ' + product.name;
					response['id'] = product.id;
				}else{
					response['code'] = 0;
					response['message'] = 'Xảy ra lỗi khi thêm';
					response['id'] = 0;
				}
				callback(null, response);
				
				return;
				// console.log(result);
			})
			
		}
	}
	
}

// delete product
function deleteProduct(call, callback){
	var id = call.request.id;
	var response = {};
	if(!id){
		response['id'] = 0;
		response['message'] = 'Xảy ra lỗi, id ko dc bỏ trống';
		response['code'] = 0;
		callback(null,response);
	}else{
		product_obj.delete(id,function(result){
			if(result){
				response['id'] = id;
				response['message'] = 'Đã xóa thành công product có id = ' + id;
				response['code'] = 1000;
				callback(null,response);
			}else{
				response['id'] = 0;
				response['message'] = 'Xảy ra lỗi server khi xóa';
				response['code'] = 0;
				callback(null,response);
			}
			
		})
	}
	
}
// Quản ly -------------------------------------------------------------
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//list user
function getUserList(call, callback){
	user_obj.all(function(arr_user){
		arr_user = JSON.stringify(arr_user);
		callback(null, {message: arr_user,code:1000 });
	})
}
//add user
function showUser(call,callback){
	var id = call.request.id;
	var response = {};
	user_obj.find(id,function(user){
		// user =  result;
		if (!user) {
			response['code'] = 0;
			response['message'] = "Xảy ra lỗi, id không hợp lệ";
			response['id']=0;
			response['age']=0;
			response['email']='';
		}else{
			response['code'] 	= 1000;
			response['message'] = "Lấy thông tin thành công";
			response['id']  	= user['id'];
			response['name']	= user['name'];
			response['age'] 	= user['age'];;
			response['email']	= user['email'];;
		}
		callback(null,response);
	});
	
	
}
function addUser(call, callback){
	var user = {
		id:call.request.id,
		name:call.request.name,
		age: Number.parseInt(call.request.age),
		email:call.request.email,
		image:call.request.image,
	}
	if(user.image){
		let base64_string = user.image.base64.toString('utf8');
		var tmp = base64_string.split(",");
		base64_string = tmp[1];
		var miliseconds = new Date().getTime();
		var rand_name = "file_"+miliseconds+"_";
		var file_name = rand_name + user.image.name;
		fs.writeFile('./public/'+file_name,base64_string,'base64',function(err){
			if(err) throw err;
			console.log('image OK');
		})
	}
	var arr_err = [];
	
	

	if(!user.name){
		arr_err.push("Tên user ko hop le");
	}
	if(!Number.isInteger(user.age) || user.age < 0){
		arr_err.push("Tuổi user ko hợp lệ");
	}
	if( !user.email || !validateEmail(user.email)){
		arr_err.push("Email user ko hợp lệ");
	}
	// tien hanh them moi hoac cap nhat
	var response = {};

	if(arr_err.length > 0){
		response['code'] = 0;
		response['message'] = 'Xảy ra lỗi:  ' + arr_err.join(", ");
		response['id'] = 0;
		callback(null, response);
		return false;
	}else{
		if (!user.id) {
			// them moi
			var arr_insert = {name:user['name'],age:user['age'],email:user['email']}
			if(user.image){
				arr_insert['image'] = file_name;
			}
			user_obj.add(arr_insert,function(result){
				response['code'] = 1000;
				response['message'] = 'Thêm user thành công: ' + user.name;
				response['id'] = result.insertId;
				console.log(result);
				callback(null, response);
				return;
			})
		}else{
			//cap nhat
			var arr_update = {name:user['name'],age:user['age'],email:user['email']};
			if(user.image){
				arr_update['image'] = file_name;
				user_obj.find(user.id,function(user_item){
					fs.unlink("./public/"+user_item.image, function(err){
						if(err) console.log(err);;
						console.log("unlink OK " );
					})
				})
			}
			user_obj.update(user.id,arr_update,function(result){
				if(result){
					response['code'] = 1000;
					response['message'] = 'Cập nhật thành công: ' + user.name;
					response['id'] = user.id;
				}else{
					response['code'] = 0;
					response['message'] = 'Xảy ra lỗi khi thêm';
					response['id'] = 0;
				}
				callback(null, response);
				return;
				// console.log(result);
			})
		}
	}
	
}
// delete user
function deleteUser(call, callback){
	var id = call.request.id;
	var response = {};
	if(!id){
		response['id'] = 0;
		response['message'] = 'Xảy ra lỗi, id ko dc bỏ trống';
		response['code'] = 0;
		callback(null,response);
		return false;
	}else{
		user_obj.delete(id,function(result){
			if(result){
				response['id'] = id;
				response['message'] = 'Đã xóa thành công user có id = ' + id;
				response['code'] = 1000;
				callback(null,response);
				return;
			}else{
				response['id'] = 0;
				response['message'] = 'Xảy ra lỗi server khi xóa';
				response['code'] = 0;
				callback(null,response);
				return;
			}
			
		})
	}
	
}
// 
// Quản ly NPP -------------------------------------------------------------
//list user
function getNppList(call, callback){
	npp_obj.all(function(arr_npp){
		arr_npp = JSON.stringify(arr_npp);
		callback(null, {message: arr_npp,code:1000 });
	})
}
//add user
function addNpp(call, callback){
	var npp = {
		id:call.request.id,
		name:call.request.name,
		age: Number.parseInt(call.request.age),
		email:call.request.email,
		image:call.request.image,
	}
	if(npp.image){
		let base64_string = npp.image.base64.toString('utf8');
		var tmp = base64_string.split(",");
		base64_string = tmp[1];
		var miliseconds = new Date().getTime();
		var rand_name = "file_"+miliseconds+"_";
		var file_name = rand_name + npp.image.name;
		fs.writeFile('./public/'+file_name,base64_string,'base64',function(err){
			if(err) throw err;
			console.log('image OK');
		})
	}
	var arr_err = [];
	
	

	if(!npp.name){
		arr_err.push("Tên npp ko hop le");
	}
	if(!Number.isInteger(npp.age) || npp.age < 0){
		arr_err.push("Tuổi npp ko hợp lệ");
	}
	if( !npp.email || !validateEmail(npp.email)){
		arr_err.push("Email npp ko hợp lệ");
	}
	// tien hanh them moi hoac cap nhat
	var response = {};

	if(arr_err.length > 0){
		response['code'] = 0;
		response['message'] = 'Xảy ra lỗi:  ' + arr_err.join(", ");
		response['id'] = 0;
		callback(null, response);
		return false;
	}else{
		if (!npp.id) {
			// them moi
			var arr_insert = {name:npp['name'],age:npp['age'],email:npp['email']}
			if(npp.image){
				arr_insert['image'] = file_name;
			}
			npp_obj.add(arr_insert,function(result){
				response['code'] = 1000;
				response['message'] = 'Thêm npp thành công: ' + npp.name;
				response['id'] = result.insertId;
				console.log(result);
				callback(null, response);
				return;
			})
		}else{
			//cap nhat
			var arr_update = {name:npp['name'],age:npp['age'],email:npp['email']};
			if(npp.image){
				arr_update['image'] = file_name;
				npp_obj.find(npp.id,function(npp_item){
					fs.unlink("./public/"+npp_item.image, function(err){
						if(err) console.log(err);;
						console.log("unlink OK " );
					})
				})
			}
			npp_obj.update(npp.id,arr_update,function(result){
				if(result){
					response['code'] = 1000;
					response['message'] = 'Cập nhật thành công: ' + npp.name;
					response['id'] = npp.id;
				}else{
					response['code'] = 0;
					response['message'] = 'Xảy ra lỗi khi thêm';
					response['id'] = 0;
				}
				// console.log(response);return;
				callback(null, response);
				return;
				// console.log(result);
			})
		}
	}
	
}
// delete npp
function deleteNpp(call, callback){
	var id = call.request.id;
	var response = {};
	if(!id){
		response['id'] = 0;
		response['message'] = 'Xảy ra lỗi, id ko dc bỏ trống';
		response['code'] = 0;
		callback(null,response);
		return false;
	}else{
		npp_obj.delete(id,function(result){
			if(result){
				response['id'] = id;
				response['message'] = 'Đã xóa thành công npp có id = ' + id;
				response['code'] = 1000;
				callback(null,response);
				return;
			}else{
				response['id'] = 0;
				response['message'] = 'Xảy ra lỗi server khi xóa';
				response['code'] = 0;
				callback(null,response);
				return;
			}
			
		})
	}
	
}
function showNpp(call,callback){
	var id = call.request.id;
	var response = {};
	npp_obj.find(id,function(npp){
		// npp =  result;
		if (!npp) {
			response['code'] = 0;
			response['message'] = "Xảy ra lỗi, id không hợp lệ";
			response['id']=0;
			response['age']=0;
			response['email']='';
		}else{
			response['code'] 	= 1000;
			response['message'] = "Lấy thông tin thành công";
			response['id']  	= npp['id'];
			response['name']	= npp['name'];
			response['age'] 	= npp['age'];;
			response['email']	= npp['email'];;
		}
		callback(null,response);
	});
	
	
}
// Tạo đơn hàng 
// FIXME
function addOrder(call,callback){
	var addOrderInfo = {
		note:call.request.addOrderInfo.note,
		status:call.request.addOrderInfo.status,
		address:call.request.addOrderInfo.address,
		phone:call.request.addOrderInfo.phone,
		userId:call.request.addOrderInfo.userId,
		total_price:call.request.addOrderInfo.total_price
	}
	var addOrderDetailInfo = call.request.addOrderInfo.addOrderDetailInfo;
	
	new Promise((resolve,reject)=>{	
		// lấy danh sách product id liên quan
		var arr_id = Array();
		addOrderDetailInfo.forEach(function(element,index){
			arr_id.push(element.productId);
		})
		resolve(arr_id);
	}).then((arr_id)=>{
		// Lấy dữ liệu product liên quan ra
		return new Promise((resolve,reject)=>{
			product_obj.getProductListInListId(arr_id,function(resultProductsList){
				var prodoctList = {};
				var total_price = 0;
				resultProductsList.forEach(function(element,index){
					prodoctList[element['id']] = element;
					total_price += element.price*element.quantity;
					if(index == resultProductsList.length - 1){
						var result = {
							prodoctList:prodoctList,
						}
						resolve(result);
					}
				})
			})
		})
	}).then((result)=>{
		// Tính tổng tiền toàn bộ đơn hàng
		var total_price = 0 ;
		var prodoctList = result['prodoctList'];
		return new Promise((resolve,reject)=>{
			addOrderDetailInfo.forEach(function(element,index){
				if(prodoctList[element['productId']]){
					total_price += prodoctList[element['productId']]['price'] * element['quantity'];
				}
				if(index == addOrderDetailInfo.length - 1){
					result['total_price'] = total_price;
					resolve(result);
				}
			})
		})
		
	}).then((result)=>{
		// Tiến hành thêm đơn hàng
		var prodoctList = result['prodoctList'];
		var total_price = result['total_price'];
		console.log(total_price);
		var arr_insert_order = {
			note:addOrderInfo.note,
			status:addOrderInfo.status,
			address:addOrderInfo.address,
			phone:addOrderInfo.phone,
			user_id:addOrderInfo.userId,
			total_price:total_price,
		};
		order_obj.add(arr_insert_order,function(orderResult){
			var insert_order_id = orderResult.insertId;
			var addOrderDetailInfo_length = Object.keys(addOrderDetailInfo).length;
			addOrderDetailInfo.forEach(function(addOrderDetailInfoItem,i){
				if(prodoctList[addOrderDetailInfoItem.productId]){
					var total_price_detail = addOrderDetailInfoItem.quantity*prodoctList[addOrderDetailInfoItem.productId]['price'];
					var arr_insert_order_detail = {
						product_id : addOrderDetailInfoItem.productId,
						quantity : addOrderDetailInfoItem.quantity,
						order_id : insert_order_id,
						total_price: total_price_detail
					};
					order_detail_obj.add(arr_insert_order_detail,function(order_detail_result){
						if(i == addOrderDetailInfo_length - 1){
							response = {};
							response['id'] = insert_order_id;
							response['code'] = 1000;
							response['message'] = "Thêm đơn hàng thành công";
							callback(null,response);
						}
					})
				}
				
			})
			
		})
	}).catch((err)=>{
		response = {};
		response['id'] = insert_order_id;
		response['code'] = 0;
		response['message'] = err;
		callback(null,response);
	});
}

// Hủy đơn hàng
// OK
function deleteOrder(call,callback){
	var order_id = call.request.order_id;	
	new Promise((resolve, reject)=>{
		// kiểm tra order id tồn tại?
		order_obj.find(order_id,function(orderResult){
			if(orderResult){
				var result = {};
				result['orderResult'] = orderResult;
				return resolve(result);
			}else{
				return reject("Xảy ra lỗi: order id ko tìm thấy kết quả");
			}
		})
		
	}).then((result)=>{
		// tiến hành xóa order 
		return new Promise((resolve, reject)=>{
			order_obj.delete(order_id,function(deleteOrderResult){
				if(deleteOrderResult){
					return resolve(result);
				}else{
					return reject("Xảy ra lỗi xóa order");
				}
			})
		});
	}).then((result)=>{
		// tiến hành xóa order detail liên quan
		return new Promise((resolve, reject)=>{
			order_detail_obj.deleteOrderDetailByOrderId(order_id,function(deleteOrderDetailResult){
				if(deleteOrderDetailResult){
					return resolve(result);
				}else{
					return reject("Xảy ra lỗi xóa order detail");
				}
			})
		});
	}).then((result)=>{
		var response = {};
		response['order_id'] = order_id;
		response['code'] = 1000;
		response['message'] = "OK: Đã xóa";
		callback(null,response);
	}).catch((err)=>{
		var response = {};
		response['order_id'] = order_id;
		response['code'] = 0;
		response['message'] = err;
		callback(null,response);
	})
}
// Lấy danh sách các đơn hàng
// OK
function getOrderList(call,callback){
	var response = {};
	order_obj.all(function(result){
		response['code'] = 1000;
		response['message'] = "OK";
		console.log(response);
		var result_length = Object.keys(result).length;
		var done = 0;
		
			
		
		result.forEach(function(element,k){
			var order_id = result[k]['id'];
			var user_id = result[k]['user_id'];
			order_detail_obj.getOrderDetailByOrderId(order_id,function(orderDetailResult){
				result[k]['orderDetail'] = orderDetailResult;
				var orderDetailResult_length = Object.keys(orderDetailResult).length ;
				orderDetailResult.forEach(function(elementOrderDetail,i){
					var product_id = orderDetailResult[i]['product_id'];
					product_obj.find(product_id,function(productResult){
						response['order'] = result;
						response['order'][k]['orderDetail'][i]['product'] = [];
						if(productResult){
							response['order'][k]['orderDetail'][i]['product'] = productResult;
						}
						if(k == result_length - 1 && i == orderDetailResult_length - 1 ){
							if(done){
								callback(null,response);
							}else{
								done = 1;
							}
						}
					})
				})
				
				user_obj.find(user_id,function(userResult){
					// console.log(userResult);
					response['order'] = result;
					response['order'][k]['user'] = userResult;
					console.log(response['order'][k]['orderDetail']);
					if(k == result_length - 1){
						
						if(done){
							callback(null,response);
						}else{
							done = 1;
						}
					}
				});
				
			})
		})
		
	})
	
}
// update chi tiết đơn hàng
//OK
function updateOrderDetail(call,callback){
	var order_detail_id = call.request.id;
	var arr_update = {
		product_id:call.request.product_id,
		quantity:call.request.quantity
	}
	var arr_err = Array();
	if(order_detail_id < 1){
		arr_err.push("order_detail_id không được nhỏ hơn 1");
	}
	if(arr_update.quantity < 1){
		arr_err.push("Số lượng không được nhỏ hơn 1");
	}
	if(arr_update.product_id < 1){
		arr_err.push("product id không được nhỏ hơn 1");
	}
	new Promise((resolve,reject)=>{
		// kiểm tra dữ liệu hợp lệ
		if(arr_err.length > 0 ){
			return reject("Xảy ra lỗi: " + arr_err.join(", "));
		}else{
			return resolve("OK");
		}
	}).then((result)=>{
		// kiểm tra order_detail_id tồn tại?
		return new Promise((resolve,reject)=>{
			order_detail_obj.find(order_detail_id,function(orderResult){
				if(orderResult){
					var result = {};
					result['orderResult'] = orderResult;
					return resolve(result);
				}else{
					return reject("Xảy ra lỗi: order_detail_id ko tìm thấy kết quả");
				}
			})
		})
	}).then((result)=>{
		// kiem tra product co tồn tại
		return new Promise((resolve, reject)=>{
			product_obj.find(arr_update.product_id,function(productResult){
				if(productResult){
					result['productResult'] = productResult;
					return resolve(result);
				}else{
					return reject("Xảy ra lỗi: product id ko tìm thấy kết quả");
				}
			})
		})
	}).then((result)=>{
		// tiến hành update
		order_detail_obj.update(order_detail_id,arr_update,function(resultUpdate){
			var response = {};
			response['id'] = order_detail_id;
			response['code'] = 1000;
			response['message'] = "OK";
			callback(null,response);
		});
	}).catch((err)=>{
		var response = {};
		response['id'] = order_detail_id;
		response['code'] = 0;
		response['message'] = err;
		callback(null,response);
	})
	
	
}
// huy chi tiết đơn hàng
// OK
function deleteOrderDetail(call,callback){
	var order_detail_id = call.request.id;
	order_detail_obj.delete(order_detail_id,function(result){
		var response = {};
		response['id'] = order_detail_id;
		response['code'] = 1000;
		response['message'] = "OK";
		callback(null,response);
	});
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(
	  hello_proto.Greeter.service, 
	{
		deleteOrderDetail:deleteOrderDetail,
		updateOrderDetail:updateOrderDetail,
		deleteOrder:deleteOrder,
		addOrder:addOrder,
		getOrderList:getOrderList,
		showUser:showUser,
		showNpp:showNpp,
		deleteNpp:deleteNpp,
		addNpp:addNpp,
		getNppList:getNppList,
		deleteUser:deleteUser,
		addUser:addUser,
		getUserList:getUserList,
		showProduct:showProduct,
		deleteProduct:deleteProduct,
		addProduct:addProduct,
		getProductList:getProductList,
		sayHello: sayHello,
		sayHelloAgain:sayHelloAgain,
		sayHello2:sayHello2
		// addProduct:addProduct
	});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
