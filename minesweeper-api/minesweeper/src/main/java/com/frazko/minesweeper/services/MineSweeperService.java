package com.frazko.minesweeper.services;

import com.frazko.minesweeper.model.MineSweeperGame;
import com.frazko.minesweeper.repository.GameRepository;

import com.frazko.minesweeper.requestObjects.CreateGameRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;


public class MineSweeperService {

  private final GameRepository gameRepository;

  @Autowired
  public MineSweeperService(final GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  public MineSweeperGame create(@RequestBody CreateGameRequest request) {
    final MineSweeperGame mineSweeperGame = new MineSweeperGame(request.getRows(), request.getCols(),
        request.getMines());
    return this.gameRepository.save(mineSweeperGame);
  }

}
