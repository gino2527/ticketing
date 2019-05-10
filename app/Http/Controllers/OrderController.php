<?php

namespace App\Http\Controllers;

use App\Event;
use App\Order;
use App\Orderline;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    
    public function index()
    {
        $orders =
            Order::
                with(
                    'orderlines',
                    'orderlines.event',
                    'orderlines.event.organiser',
                    'user'
                )->get();

        return $orders;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'cart' => 'required|array'
        ]);

        $order = new Order();
        $order->user_id = 1;
        $order->save();

        foreach ($request->cart as $orderline) {
            $count = $orderline['count'];
            $event = $orderline['event'];

            $orderline = new Orderline();
            $orderline->count       = $count;
            $orderline->event_id    = $event['id'];
            $orderline->order_id    = $order->id;
            $orderline->user_id     = 1;
            $orderline->save();

            $event = Event::find($event['id']);
            $event->tickets_left = $event->tickets_left - $count;
            $event->save();
        }

        $order =
            Order::
                find($order->id)
                ->with(
                    'orderlines',
                    'orderlines.event'
                )
                ->get();
        
        $events =
            Event::with(
                'organiser'
            )->get();
        
        return $events;
        
        return $order;
    }
     
    public function update(Request $request, Order $order)
    {
        //
    }
     
    public function destroy(Order $order)
    {
        //
    }
}
