<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', Auth::user()->id)->get();

        return view('dashboard', compact('users'));
    }

    public function fetchMessages(Request $request)
    {
        $contact = User::findOrFail($request->input('user_id'));
        $messages = Message::where('form_id', Auth::user()->id)
            ->where('to_id', $request->input('user_id'))
            ->orWhere(function ($query) use ($contact) {
                $query->where('form_id', $contact->id)
                    ->where('to_id', Auth::user()->id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'contact' => $contact,
            'messages' => $messages,
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

        event(new \App\Events\SendMessageEvent($message->message, Auth::user()->id, $request->input('contact_id')));

        return response()->json($message);

    }
}
