<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisterationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $status='';

    public function __construct($status)
    {
      $this->status = $status;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if($status==='approved'){
            return $this->view('mail.approved-account')
            ->from(env('MAIL_FROM_ADDRESS'))
            ->subject('Process BiraMedia Account');
        }
        else{
            return $this->view('mail.rejected-account')
            ->from(env('MAIL_FROM_ADDRESS'))
            ->subject('Process BiraMedia Account');
        }
    }
}
