<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orderline extends Model
{
    public function event()
    {
        return $this->belongsTo('App\Event', 'event_id');
    }

    public function order()
    {
        return $this->belongsTo('App\Order', 'order_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
