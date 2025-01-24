in_order = fn report ->
  reversed = Enum.reverse(report)
  case Enum.sort(report) do
    ^reversed -> true 
    ^report -> true
    _ -> false
  end
end

right_distance = fn report ->
  Enum.chunk_every(report, 2, 1)
  |> Enum.take_while(fn l -> length(l) == 2 end)
  |> Enum.all?(fn [a,b] -> abs(a-b) > 0 and abs(a-b) < 4 end)
end

File.read!("2024/day2/example.txt")
|> String.split("\n")
|> Enum.map(&String.split(&1))
|> Enum.reverse |> tl() |> Enum.reverse
|> Enum.map(&Enum.map(&1, fn c -> String.to_integer(c) end))
|> Enum.filter(right_distance)
# |> Enum.filter(in_order)
# |> Enum.count
|> IO.inspect


