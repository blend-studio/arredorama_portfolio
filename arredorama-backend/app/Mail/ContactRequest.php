<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    // Riceviamo i dati dal controller
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Nuova Richiesta dal Sito Web')
                    ->replyTo($this->data['email']) // Per rispondere direttamente al cliente
                    ->view('emails.contact');
    }
}