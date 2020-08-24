<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User;
use JWTAuth;
use JWTAuthException;
use Carbon\Carbon;
use DB;


class UserController extends Controller
{
    /**
     * Register the user.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            
            if (!$token = JWTAuth::attempt( ['email'=>'asalheen1997@gmail.com','password'=>'amaan1997'])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }
    public function registerUser(Request $request)
    {
        // Validate all the required parameters have been sent.
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
        ]);
        if ($validator->fails()) {
            $error='Invalid Input';
        }
        try {  
            $errror='';
            $status='';          
            $is_user_exist=User::where('email',$request->email)->first();
            if($is_user_exist){
                $error='User already exist!';
            }
            else{
                $user=new User();

                $user->first_name=$request->firstName;
                $user->last_name=$request->lastName;
                $user->email=$request->email;
                $user->password=Hash::make($request->password);
                $user->role=$request->role;
    
                if ($user->save())
                {
                    $token = self::getToken($request->email, $request->password); // generate user token
    
                    $user->auth_token = $token; // update user token
                    $user->update();
                        
                    return response()->json([
                        'status' => 201,
                        'success'=>true,
                        'access_token'=>$token,
                        'data'=>['firstName'=>$user->first_name,$user->last_name=>'last_name','email'=>$user->email,'role'=>$user->role]
                    ]);
                }
                else{
                  $error='Something went wrong!Please try again';
                }
        }
        return response()->json([
            'status' => $status,
            'success'=>false,
            'error'=>$error
        ])->setStatusCode(400);  
            
        } catch (Exception $e) {
            DB::rollback();
            return $this->responseServerError('Error creating user profile.');
        }
    }

    /**
     * Login user.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
            if ($user && Hash::check($request->password, $user->password)) // The passwords match...
            {
                if(is_null($user->email_verified_by)){
                    return response()->json([
                        'success'=>false,
                        'error'=>'User Account not approved!'
                    ])->setStatusCode(400);
                }
                else{
                    $token = self::getToken($request->email, $request->password);
                    $user->auth_token = $token;
                    $user->save();
        
                    return response()->json([
                        'success'=>true,
                        'auth_token'=>$token,
                        'user'=>['firstName'=>$user->first_name,'lastName'=>$user->last_name,'email'=>$user->email,'role'=>$user->role]
                    ])->setStatusCode(200);
                }  
            }
            else {
                return response()->json([
                    'success'=>false,
                    'error'=>'Invalid Login Credentials'
                ])->setStatusCode(400);
        } 
    }
    public function getPendingAccounts(){
        $pendingAccounts = User::select('first_name','last_name','email','role')->where('email_verified_at', null)->where('role','!=','admin')->get();

        return response()->json([
            'status' => 201,
            'success'=>true,
            'pending_records'=>$pendingAccounts
        ]);
    }
    public function updateAccountStatus(Request $request){
        // Validate all the required parameters have been sent.
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'email'  =>'required|string|max:255',
            'verifiedBy' =>'required'
        ]);
        if ($validator->fails()) {
            // return $this->responseUnprocessable($validator->errors());
        }
        try{
            $user=User::where('email',$request->email)->first();

            if($request->status){
                $user->email_verified_by=$request->verifiedBy;
                $user->email_verified_at=Carbon::now();

                $user->update();

                $response='User Account Approved successfully!';
            }
            else{
                $user->delete();
                $response='User Account Rejected successfully!';
            }
            return response()->json([
                'status' =>'201',
                'success' =>true,
                'data'=>$response
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'status' =>'500',
                'success' =>false,
                'data'=>$e
            ]);
        }
    }
}
