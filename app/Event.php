<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function getPosterAttribute()
    {
        if (!$this->value) {
            return  '/images/placeholder-event.png';
        }

        return $this->value;
    }

    public function organiser()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
