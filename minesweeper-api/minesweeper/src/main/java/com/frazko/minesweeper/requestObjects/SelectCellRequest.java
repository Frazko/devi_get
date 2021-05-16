package com.frazko.minesweeper.requestObjects;

import lombok.Data;

@Data
public class SelectCellRequest {
  private int posX;
  private int posY;
}