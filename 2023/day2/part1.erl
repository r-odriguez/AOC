-module(part1).
-export([part1/0]).

part1() ->
    {_, Content} = file:read_file("input1.txt"),
    Input = binary:bin_to_list(Content),
    Lines = string:split(Input, "\n"),
    Test = lists:map(fun (Line) -> string:split(Line, "|") end, Lines),
    io:format(Test).
