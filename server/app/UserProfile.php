<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class UserProfile extends Model
{
        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $table='user_profile';
        protected $fillable = [
            'user_id', 'gender','mobile','address','state','country','profileImage',
        ];
    
        /**
         * A Event belongs to a User.
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
         */
        public function user()
        {
            return $this->belongsTo(User::class, 'user_id');
        }
        
}
