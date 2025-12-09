<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactRequest;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // 1. Validazione
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'service' => 'nullable|string',
            'budget' => 'nullable|string',
            'message' => 'required|string',
        ]);

        // 2. Invio Mail (all'amministratore del sito)
        $recipientEmail = env('CONTACT_FORM_EMAIL', 'info@arredorama.it');
        $ccEmail = env('MAIL_CC', null);

        $mail = Mail::to($recipientEmail);
        
        // Aggiungi CC se configurato
        if ($ccEmail) {
            $mail->cc($ccEmail);
        }
        
        $mail->send(new ContactRequest($validated));

        // 3. Risposta JSON
        return response()->json(['message' => 'Email inviata con successo!']);
    }
}