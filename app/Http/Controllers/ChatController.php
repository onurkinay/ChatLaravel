<?php

namespace App\Http\Controllers;

use App\Models\User;

class ChatController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();

        return view('dashboard', compact('users'));
    }
}
