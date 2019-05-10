<?php

use Faker\Generator as Faker;

$factory->define(App\Event::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(5),
        'description' => $faker->text(),
        'date'            => $faker->date(),
        'location'        => $faker->city(),
        'tickets_left'    => 200,
        'max_tickets'     => 200,
        'time_from'       => $faker->time(),
        'time_to'         => $faker->time(),
        'user_id' => factory('App\User')->create()->id,
    ];
});