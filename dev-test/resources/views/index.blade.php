
@extends('.layouts.layout')
@section('contents')
@section('title', "Rick and Morty wiki")

{{-- <h1>
    Home page
</h1> --}}


@if(count($valori) > 0)

    @foreach($valori as $key => $valore)
        {{-- {{ $valore }} <br/> --}}
    @endforeach
   
@endif

@endsection