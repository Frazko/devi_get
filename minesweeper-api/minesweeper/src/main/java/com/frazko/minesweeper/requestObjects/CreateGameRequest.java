package com.frazko.minesweeper.requestObjects;

import lombok.Data;

@Data
public class CreateGameRequest {
  private int rows;
  private int cols;
  private int mines;
}