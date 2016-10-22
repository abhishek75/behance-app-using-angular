

//Angular App Module and Controller
var app = angular.module("app", ["ngRoute","custData"]);
angular.module('app').config (['$routeProvider',function ($routeProvider){
    $routeProvider
 
    .when('/', {  
        templateUrl: 'view/home.html',
        controller: 'homeCtrl'
    })

    .when('/gallery', {  
        templateUrl: 'view/artgallery.html',
        controller: 'artCtrl'
    })

    .when('/addcard', {  
        templateUrl: 'view/addcard.html',
        controller: 'addcardCtrl'
    })

    .otherwise({ redirectTo: '/' });

}]);
  
angular.module('app').controller('homeCtrl',['$scope','$location','custData',function($scope, $location, custData){
    $scope.userdata={};
    $scope.showerror = false;
    var data = custData.get();
    data.accountdetails = [];
    data.cardsinfo = [{imageUrl:'2.png', desc:'laure ipsum iosdeno operas', comment:["wow","how?"], showingcommentbox:false}, {imageUrl:'2.png', desc:'iosdeno operas laure ipsum ', comment:["wow","how?"], showingcommentbox:false}, {imageUrl:'3.png', desc:'poserdo rounde laure ipsum', comment:["wow","how?"], showingcommentbox:false},{imageUrl:'2.png', desc:'poserdo rounde laure ipsum', comment:["wow","how?"], showingcommentbox:false}];
    var updateuserinfo = function(){
        custData.put(data);
        $location.url('/gallery');
    }
    $scope.checkUserInfo = function(userdata){
        if(userdata.username == undefined || userdata.username == "" || userdata.password == undefined || userdata.password == ""){
            $scope.showerror = true;
        }else{
            data.accountdetails.push(userdata);
            updateuserinfo(data);   
        }    
    }

    $scope.removeinvalidationmessage = function(){
        $scope.showerror =false;
    }

}]); 

angular.module('app').controller('artCtrl',['$scope','$location','custData',function($scope,$location,custData){
    var data = custData.get();
    $scope.cardsinfo = data.cardsinfo;
    $scope.collectcomment = function(index, newcomment){
        $scope.cardsinfo[index].comment.push(newcomment);
        $scope.cardsinfo[index].showingcommentbox = false;
        custData.put($scope.cardsinfo);
    }
    $scope.showcommentbox = function(index){
        $scope.cardsinfo[index].showingcommentbox = true;
    }
    $scope.addcard = function(index){
        $location.url("/addcard");        
    } 
    $scope.back = function(){
        $location.url('/');
    }
}]);

angular.module('app').controller('addcardCtrl',['$scope','$location','custData',function($scope,$location,custData){
    $scope.desc="";
    $scope.showerror = false;
    $scope.showpreview = function(){
        if($scope.desc!= undefined && $scope.desc!=""){
            $scope.showingpreview = true;
            $scope.showerror = false;
        }else{
            $scope.showerror = true;
        }            
    }
    $scope.backtoNormal = function(){
        $scope.showingpreview = false;
    }
    $scope.addcard = function(){
        if($scope.desc!=undefined && $scope.desc!=""){
            var data = custData.get();
            data.cardsinfo.push({imageUrl:"2.png", desc:$scope.desc, comment:[],showingcommentbox:false});
            custData.put(data);
            $location.url('/gallery');
        }else{
            $scope.showerror = true;
        }     
    }
     $scope.removeinvalidationmessage = function(){
        $scope.showerror =false;
    }

}]); 

 
