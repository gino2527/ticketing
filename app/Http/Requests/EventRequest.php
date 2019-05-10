<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'description'   => 'required|string',
            'date'          => 'required|date',
            'location'      => 'required|string|min:8',
            'max_tickets'   => 'required|integer|min:1',
            'time_from'     => 'required|date_format:H:i',
            'time_to'       => 'required|date_format:H:i',
            'title'         => 'required|string|min:8',
            'poster'        => '',
            'tickets_left'  => '',
        ];
    }
}
