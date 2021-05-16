package com.frazko.minesweeper.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cell {
	private int XPos;
	private int YPos;
	private long value;
	private boolean isMine;
	private boolean isFlagged;
	private boolean isRevealed;

	public Cell(int XPos, int YPos) {
		this.setXPos(XPos);
		this.setYPos(YPos);
	}

	public boolean isNeighborOf(Cell other) {
		return this != other && Math.abs(other.getYPos() - this.getYPos()) <= 1
				&& Math.abs(other.getXPos() - this.getXPos()) <= 1;
	}

	public void toggleFlag() {
		this.setFlagged(!this.isFlagged);
	}

}