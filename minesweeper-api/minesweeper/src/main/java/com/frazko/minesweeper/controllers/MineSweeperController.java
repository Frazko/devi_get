package com.frazko.minesweeper.controllers;

import com.frazko.minesweeper.model.Board;
import com.frazko.minesweeper.model.MineSweeperGame;
import com.frazko.minesweeper.requestObjects.CreateGameRequest;
import com.frazko.minesweeper.services.MineSweeperService;

import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RequestMapping("/v1/minesweeper-api")
@RestController
public class MineSweeperController {

  private final MineSweeperService mineSweeperService;

  @Autowired
  public MineSweeperController(MineSweeperService mineSweeperService) {
    this.mineSweeperService = mineSweeperService;
  }

  @ResponseStatus(HttpStatus.OK)
  @RequestMapping(value = "/create", method = RequestMethod.POST)
  public MineSweeperGame startNewGame(@RequestBody CreateGameRequest request) {
    try {
      return this.mineSweeperService.create(request);
    } catch (final Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
    }
  }

}
