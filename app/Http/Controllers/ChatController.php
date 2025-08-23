<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();

        return view('dashboard', compact('users'));
    }

    public function fetchMessages(Request $request)
    {
        $contact = User::findOrFail($request->input('user_id'));

        return response()->json([
            'contact' => $contact,
        ]);
    }
}
