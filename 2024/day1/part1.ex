defmodule AOC.DayOne.PartOne do
  def solve(input) do
	list = String.split(input, "\n")
	|> Enum.reverse |> tl() |> Enum.reverse()
	|> Enum.map(fn row -> String.split(row, "   ") end)
	|> Enum.map(fn [l, r] -> [String.to_integer(l), String.to_integer(r)] end)

	left = Enum.map(list, fn [l, _] -> l end)
	right = Enum.map(list, fn [_, r] -> r end)

	sum(left, right, 0, 0)
  end

  defp sum([], [], _ic, s), do: s 
  defp sum(l, r, ic, s) when length(l) > 0 do sum(l, r, ic, hd(l), hd(r), s) end

  defp sum(left, right, ic, l, r, s) when length(left) == ic do 
	left = List.delete(left, l)
	right = List.delete(right, r)
	dist = abs(l - r)
	sum(left, right, 0, dist + s)
  end

  defp sum(left, right, ic, l, r, s) do
	next_l = Enum.at(left, ic)
	next_r = Enum.at(right, ic)
	sm_l = if next_l < l, do: next_l, else: l
	sm_r = if next_r < r, do: next_r, else: r
	sum(left, right, ic + 1, sm_l, sm_r, s)
  end
end
