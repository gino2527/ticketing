<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function orderlines() {
        return $this->hasMany('App\Orderline');
    }
}
