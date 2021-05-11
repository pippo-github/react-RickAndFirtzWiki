<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApplicationController extends Controller
{
    //
    public function paginaIndex(){


$response = Http::get('https://rickandmortyapi.com/api');

$dataAPI = array();

$dataAPI = $response->json();

// var_dump($dataAPI);
// var_dump($response->json());

        return view("index")->with("valori", $dataAPI);
    }
}
