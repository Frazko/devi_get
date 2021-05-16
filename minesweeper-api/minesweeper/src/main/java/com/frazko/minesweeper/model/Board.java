package com.frazko.minesweeper.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

import lombok.Data;

@Data
@Document
public class Board {
  private int rows;
  private int cols;
  private int mines;
  private List<Cell> cells;

  public Board(int rows, int cols) {
    this.setCols(cols);
    this.setRows(rows);

    this.cells = this.buildBoard(rows, cols);
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

  public Cell getCell(int x, int y) {
    Assert.isTrue(validateCoordinates(x, y), "if the X and Y parameters are not within the allowed coordinates");
    return this.getCells().get(x * this.getRows() + y);
  }

  private boolean validateCoordinates(int x, int y) {
    return x >= 0 && y >= 0 && x < this.getRows() && y < this.getCols();
  }

  public List<Cell> getNeighbors(Cell cell) {
    return this.getCells().stream().filter(x -> x.isNeighborOf(cell)).collect(Collectors.toList());
  }

}