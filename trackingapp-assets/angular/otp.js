app.controller('otpController',function($scope,$http){
    $scope.data = {};
    $scope.otp = {};
    $scope.otp.client = "MOBILEAPP";
    $scope.otp.device = "android";
    $scope.otp.os = "android";
    $scope.otp.appCode = "test";

    $scope.data.isGradiet = 1;
    $scope.style = {};

    var pinRequestIdeamart = "http://128.199.204.10/api/otp/dialog/1626148757/request";
    var pinVerifyIdeamart = "http://128.199.204.10/api/otp/dialog/1626148757/verify";
      
    var pinRequestMspace = "https://appzone.lk/api/otp/1560172000/request";
    var pinVerifyMspace = "https://appzone.lk/api/otp/1560172000/verify";




    $scope.otpRequest= function(){

        $scope.checkOperator( $scope.otp.subscriberId);

        $http(
            {
                method : "POST",
                url : $scope.getPinRequest($scope.operator),
                data : $scope.otp,
                headers : {
                    'content-type' :'application/json',
                }
            }
        )
        .then(
            function(responce){
                console.log( responce.data);
            
                if(responce.data.statusCode == 'S1000'){

                    console.log( responce);
                    $('#otp-request-error').html('');
                    $scope.otp.referenceNo = responce.data.referenceNo;

                    $('#otp-request').addClass("d-none");
                    $('#otp-verify').removeClass("d-none");

                }else if(responce.data.statusCode == 'E1853'){
                    $('#otp-request-error').html("Maximum number of OTP requests reached for "+ $scope.data.subscriberId);
                }else if(responce.data.statusCode == 'E1856'){
                    $('#otp-request-error').html("Invalid Request");
                }else if(responce.data.statusCode == 'E1857'){
                    $('#otp-request-error').html("Internal Server Error Occur");
                }else if(responce.data.statusCode == 'E1301'){
                    $('#otp-request-error').html("Please Enter Valid Number");
                }else if(responce.data.statusCode == 'E1351'){
                    $('#otp-request-error').html("User already registered");
                }else{
                    $('#otp-request-error').html("Unknown Error Occur. Please Try again");
                }
            }
        );
    };

    $scope.otpVerify = function(){
        $http(
            {
                method : "POST",
                url : $scope.getPinVerify($scope.operator),
                data : $scope.otp,
                headers : {
                    'content-type' :'application/json',
                }
            }
        )
        .then(
            function(responce){
                if(responce.data.statusCode == 'S1000'){

                }else if(responce.data.statusCode == 'E1850'){
                    $('#otp-verify-error').html("Invalid PIN Number.");
                }else if(responce.data.statusCode == 'E1856'){
                    $('#otp-verify-error').html("Invalid Request.");
                }else if(responce.data.statusCode == 'E1851'){
                    $('#otp-verify-error').html("PIN Number has been expired.");
                }else if(responce.data.statusCode == 'E1852'){
                    $('#otp-verify-error').html("Maximum number of OTP attempts had reached.");
                }else if(responce.data.statusCode == 'E1854'){
                    $('#otp-verify-error').html("Could not find OTP.");
                }else if(responce.dataata.statusCode == 'E1855'){
                    $('#otp-verify-error').html("Invalid Reference Number.");
                }else if(responce.data.statusCode == 'E1857'){
                    $('#otp-verify-error').html("Internal Server Error Occur.");
                }else if(responce.data.statusCode == 'E1301'){
                    $('#otp-verify-error').html("Requested ApplicationID is not allowed within the System for operator unknown.");
                }else{
                    $('#otp-verify-error').html("Unknown Error Occur. Please Try again");
                }
            }
        );
    }

    $scope.checkOperator = function(msisdn){
        if (msisdn.substring(0, 4) == "9471" || msisdn.substring(0, 4) == "9470" || msisdn.substring(0, 3) == "071" || msisdn.substring(0, 3) == "070") {
            $scope.operator = "mspace";
        }else{
            $scope.operator = "ideamart";
        }
    };

    $scope.getPinRequest = function(operator){
        if(operator == "ideamart"){
            return pinRequestIdeamart;
        }else{
            return pinRequestMspace;
        }
    };

    $scope.getPinVerify = function(operator){
        if(operator == "ideamart"){
            return pinVerifyIdeamart;
        }else{
            return pinVerifyMspace;
        }
    };


});



