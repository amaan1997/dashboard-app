<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserRole;
use JWTAuth;
use JWTAuthException;
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
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
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
            return $this->responseUnprocessable($validator->errors());
        }
        try {

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
                $user->save();

                return response()->json([
                    'status' => 201,
                    'success'=>true,
                    'access_token'=>$token,
                    'user'=>['name'=>$user->name,'email'=>$user->email,'role'=>$user->role,'auth_token'=>$token]
                ]);
            }
            else{
                return response()->json([
                    'status' => 401,
                    'success'=>false,
                    'error'=>'Could not register the user'
                ]);
            }
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
        $user = User::where('email', $request->email)->get()->first();
        if ($user && Hash::check($request->password, $user->password)) // The passwords match...
        {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();

            return response()->json([
                'status' => 201,
                'success'=>true,
                'data'=>['name'=>$user->name,'email'=>$user->email,'role'=>$user->role,'auth_token'=>$token]
            ]);
        }
        else 
            return response()->json([
                'status' => 401,
                'success'=>false,
                'data'=>'Invalid Login Credentials'
            ]);
    }
    public function getPendingAccounts(){
        $pendingAccounts = User::where('email_verified_at', null)->get();
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
            return $this->responseUnprocessable($validator->errors());
        }
        try{
            $user=User::where('email',$request->email)->first();

            if($request->status){
                $user->email_verified_by=$request->verifiedBy;
                $user->email_verified_at=\Carbon::now();

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
