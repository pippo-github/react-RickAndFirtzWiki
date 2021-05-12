
@extends('.layouts.layout')
@section('contents')
@section('title', "Rick and Morty wiki")

{{-- <h1>
    Home page
</h1> --}}


@if(count($jsonValue) > 0)

    @foreach($jsonValue as $key => $data)
        {{-- {{ $data }} <br/> --}}
    @endforeach
   
@endif

@endsection