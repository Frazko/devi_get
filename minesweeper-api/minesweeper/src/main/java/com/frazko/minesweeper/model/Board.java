package com.frazko.minesweeper.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Board {
	private int rows;
	private int cols;
	private List<Cell> cells;

	private boolean validateCoordinates(int x, int y) {
		return x >= 0 && y >= 0 && x < this.getRows() && y < this.getCols();
	}

	private int getNeighborMines(Cell cell) {
		return this.getCells().stream().filter(neighbor -> neighbor.isNeighborOf(cell) && neighbor.isMine())
				.collect(Collectors.toList()).size();
	}

	public Board(int rows, int cols) {
		this.setCols(cols);
		this.setRows(rows);
		this.setCells(this.buildBoard(rows, cols));
	}

	public Cell getCell(int x, int y) {
		if (validateCoordinates(x, y)) {
			return this.getCells().get(x * this.getRows() + y);
		} else {
			throw new Error("X and Y are not within the board");
		}
	}

	private List<Cell> buildBoard(int height, int width) {
		List<Cell> cells = new ArrayList<>();
		for (int row = 0; row < height; row++) {
			for (int column = 0; column < width; column++) {
				cells.add(new Cell(row, column));
			}
		}
		return cells;
	}

	public List<Cell> getNeighbors(Cell cell) {
		return this.getCells().stream().filter(neighbor -> neighbor.isNeighborOf(cell)).collect(Collectors.toList());
	}

	public void countMines() {
		this.getCells().stream().forEach((cell) -> {
			if (!cell.isMine()) {
				cell.setValue(this.getNeighborMines(cell));
			}
		});
	}

}