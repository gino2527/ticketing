<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;

class ApiController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6|max:20|confirmed'
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return $user;
    }

    public function login(Request $request) {
        if (
            Auth::attempt([
                'email' => $request->email,
                'password' => $request->password
            ])
        ) {
            $user = Auth::user();
            $token = $user->createToken(request('email'))->accessToken;

            $this->content['token'] = $token;
            $this->content['user'] = $user;
            $status = 200;
        }
        else {
            $this->content['email'] = true;
            $this->content['password'] = true;
            $this->content['message'] = 'Email/Password is wrong.';
            $status = 401;
        }
        return response()->json($this->content, $status);
    }
}
