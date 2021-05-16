package com.frazko.minesweeper.model;

import java.util.List;
import java.util.Random;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class MineSweeperGame {

	@Id
	private String id;

	private Board board;

	private int minesCount;

	public void init(int rows, int cols, int minesCount) {
		this.board = new Board(rows, cols);
		this.setMinesCount(minesCount);
		setRandomMines(minesCount);
	}

	public void restart() {
		this.init(board.getRows(), board.getCols(), getMinesCount());
	}

	private void setRandomMines(int minesCount) {
		int minesSetCounter = 0;

		do {
			pullRandomCell(board.getCells()).setMine(true);
			minesSetCounter++;
		} while (minesSetCounter <= minesCount);

		board.countMines();
	}

	public Cell pullRandomCell(List<Cell> list) {
		Random random = new Random();
		int size = board.getCells().size();
		int index = random.nextInt(size);
		return board.getCells().get(index);
	}

	public boolean isWon() {
		return gameIsCompleted();
	}

	public boolean isLost() {
		return board.getCells().stream().anyMatch(cell -> cell.isRevealed() && cell.isMine());
	}

	public boolean isOver() {
		return isWon() || isLost();
	}

	public void toggleFlag(int row, int col) {
		this.toggleFlag(this.board.getCell(row, col));
	}

	private void toggleFlag(Cell cell) {
		if (!isOver() && !cell.isRevealed()) {
			cell.toggleFlag();
		}
	}

	public void selectCell(int row, int col) {
		Cell cell = this.board.getCell(row, col);
		if (!isOver() && !cell.isRevealed()) {
			this.revealCell(cell);
		}
	}

	private void revealCell(Cell cell) {
		if (isOver() || cell.isFlagged()) {
			return;
		}
		this.findNeighborCells(cell);
	}

	private void findNeighborCells(Cell cell) {
		cell.setRevealed(true);
		List<Cell> neighbors = board.getNeighbors(cell);

		if (!isOver() && !neighbors.stream().anyMatch(s -> s.isMine())) {
			neighbors.stream().filter(neighbor -> !neighbor.isRevealed() && !neighbor.isFlagged())
					.forEach(neighbor -> findNeighborCells(neighbor));
		}
	}

	private boolean gameIsCompleted() {
		return !board.getCells().stream().anyMatch(cell -> !cell.isRevealed() && !cell.isMine());
	}

}
