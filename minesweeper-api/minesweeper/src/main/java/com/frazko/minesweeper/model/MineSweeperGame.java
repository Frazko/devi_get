package com.frazko.minesweeper.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import lombok.Builder;
import lombok.Data;


@Document
@Data
public class MineSweeperGame {

  @Id
  private String id;
  
  private Board board;

  public MineSweeperGame(int rows, int cols, int minesCount) {
    this.board = new Board(rows, cols);
    setMinesRandomly(minesCount);
  }

  private void setMinesRandomly(int minesCount) {
    List<Cell> shuffleList = new ArrayList<Cell>(board.getCells());
    Collections.shuffle(shuffleList);
    shuffleList.stream().limit(minesCount).forEach(x -> x.setMine(true));
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

  public void toggleFlag(Cell cell) {
    Assert.isTrue(!isOver() && !cell.isRevealed(), "");
    cell.toggleFlag();
  }

  public void revealCell(int row, int col) {
    this.revealCell(this.board.getCell(row, col));
  }

  public void revealCell(Cell cell) {
    if (isOver() || cell.isFlagged()) {
      return;
    }
    this.findNeighbors(cell);
  }

  private void findNeighbors(Cell cell) {
    cell.setRevealed(true);

    List<Cell> neighbors = board.getNeighbors(cell);

    /*
     * If there game is still on and there are no mines next to the opened square,
     * the neighbors are also opened recursively.
     */
    if (!isOver() && !neighbors.stream().anyMatch(s -> s.isMine())) {
      neighbors.stream().filter(s -> !s.isRevealed() && !s.isFlagged()).forEach(s -> findNeighbors(s));
    }
  }

  /**
   * Returns true if the game is over or if there are no squares without mines
   * left to open.
   * 
   * @return true if the game is over
   */
  private boolean gameIsCompleted() {
    return !board.getCells().stream().anyMatch(square -> !square.isRevealed() && !square.isMine());
  }

}
