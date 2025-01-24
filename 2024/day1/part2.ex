defmodule AOC.DayOne.PartTwo do
  def solve(input) do
	list = treat_input(input)
	{left, right} = Enum.unzip(list)
	similarity_score(left, right)
  end

  defp treat_input(input) do
	String.split(input, "\n")
	|> Enum.reverse |> tl() |> Enum.reverse()
	|> Enum.map(&String.split(&1))
	|> Enum.map(fn [l, r] -> {String.to_integer(l), String.to_integer(r)} end)
  end

  defp similarity_score(left, right) do
	Enum.reduce(left, 0, fn l, acc ->
	  l * (Enum.frequencies(right)[l] || 0) + acc
	end)
  end
end
