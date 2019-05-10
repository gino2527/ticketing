<?php

namespace App\Http\Controllers;

use App\Event;
use App\Orderline;
use App\Http\Requests\EventRequest;
use Illuminate\Http\Request;
use DB;
use Excel;

class EventController extends Controller
{
    public function index(Request $request)
    {
        if ($request->sort) {
            $events =
                Event::
                    orderBy($request->sort)
                    ->with(
                        'organiser'
                    )
                    ->get();
        } else {
            $events =
                Event::with(
                    'organiser'
                )->get();
        }

        return $events;
    }

    public function myEvents(Request $request)
    {
        $data =
            Orderline::
                select('event_id')
                ->where('user_id', 1)
                ->groupBy('event_id')
                ->get();
        
        foreach ($data as $key => $value) {
            $event =
                Event::
                    with('organiser')
                    ->find($value->event_id);
            $event->count = (int)
                Orderline::
                    where('event_id', $value->event_id)
                    ->where('user_id', 1)
                    ->sum('count');

            $data[$key] = $event;
        }

        return $data;
    }
    
    public function store(EventRequest $request)
    {
        $event = new Event();
        $event->description     = $request->description;
        $event->date            = $request->date;
        $event->location        = $request->location;
        $event->max_tickets     = $request->max_tickets;
        $event->tickets_left    = $event->max_tickets;
        $event->time_from       = $request->time_from;
        $event->time_to         = $request->time_to;
        $event->title           = $request->title;
        $event->user_id         = 1;
        $event->save();
        
        return $event;
    }
    
    public function show(EventRequest $request, Event $event)
    {
        return $event;
    }

    public function update(EventRequest $request, Event $event)
    {
        //
    }
    
    public function destroy(Event $event)
    {
        //
    }

    public function export(Request $request)
    {
        $data =
            Orderline::
                select(DB::raw('DATE(created_at) as date'), 'event_id')
                ->groupBy('date', 'event_id')
                ->get();
        
        foreach ($data as $key => $value) {
            $temp = [];
            $temp['date'] = $value->date;
            $temp['event'] =
                Event::find($value->event_id)->title;
            $temp['count'] =
                Orderline::
                    where('event_id', $value->event_id)
                    ->whereDate('created_at', $value->date)
                    ->sum('count');

            $data[$key] = $temp;
        }
            
        return Excel::create('summary', function ($excel) use ($data) {
            $excel->sheet('events', function ($sheet) use ($data) {
                $sheet->fromArray($data);
            });
        })->download('xlsx');
    }
}
