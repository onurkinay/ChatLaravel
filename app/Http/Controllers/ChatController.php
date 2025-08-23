<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:255',
            'contact_id' => 'required|exists:users,id',
        ]);

        $message = new \App\Models\Message;
        $message->message = $request->input('message');
        $message->form_id = Auth::user()->id;
        $message->to_id = $request->input('contact_id');
        $message->save();

        return response()->json($message);
    }
}
