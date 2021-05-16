package com.frazko.minesweeper.requestObjects;

import lombok.Data;

@Data
public class CreateGameRequest {
  private int rows;
  private int cols;
  private int mines;
  
  
	public int getMines() {
		return mines;
	}
	public void setMines(int mines) {
		this.mines = mines;
	}
	public int getCols() {
		return cols;
	}
	public void setCols(int cols) {
		this.cols = cols;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
}