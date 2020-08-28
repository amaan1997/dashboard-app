<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\User;


class BlockedUser extends Model
    {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table='blocked_users';
    protected $fillable = [
        'user_id', 'block_status','block_reason',
    ];

    /**
     * A Event belongs to a User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
}
