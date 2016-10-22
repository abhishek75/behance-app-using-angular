// will keep all of you data through out your application if proceed in flow
angular.module('custData', []).factory('custData', function(){
 	var custData = {};
 	custData.data = {};
 	//custData.data = [];
 	custData.put = function(customerData){

        custData.data = customerData;
        //return custData;               
    };
    
    custData.get = function(){
    	return custData.data;
    }
    
    return custData;
});

