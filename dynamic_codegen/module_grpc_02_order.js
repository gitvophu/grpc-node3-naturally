module.exports = {
    Order:function(con){
        this.find = function(id = 0,callback){
            if(id < 1){
                callback(false);
                return false;
            }
    
            var sql = "SELECT * FROM `orders` WHERE `id` = "+id + " LIMIT 1";
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
            var sql = "UPDATE `orders` SET "+set_field+ " WHERE id = " +id + " LIMIT 1" ;
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
    
            var sql = "INSERT INTO `orders`("+add_fields+") VALUES ("+add_values+")";
            con.query(sql,function(err,result){
                if(err) throw err;
                callback(result)
            })
            
        }
        this.all = function(callback){
            var sql = "SELECT * FROM `orders`";
            con.query(sql,function(err,result){
                callback(result)
            })
        }
    
        this.delete = function(id=0,callback){
            if(id < 1){
                callback(false);
                return false;
            }
            var sql = "DELETE FROM `orders` WHERE id = " + id + " LIMIT 1";
            con.query(sql,function(err,result){
                if(err) throw err;
                callback(result);
            });
        }
    }
}