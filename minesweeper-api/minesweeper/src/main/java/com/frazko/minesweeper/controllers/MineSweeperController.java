package com.frazko.minesweeper.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.frazko.minesweeper.model.MineSweeperGame;
import com.frazko.minesweeper.requestObjects.CreateGameRequest;
import com.frazko.minesweeper.requestObjects.RestartGameRequest;
import com.frazko.minesweeper.requestObjects.SelectCellRequest;
import com.frazko.minesweeper.services.MineSweeperService;

@CrossOrigin
@RequestMapping("/api/v1")
@RestController
public class MineSweeperController {

	private final MineSweeperService mineSweeperService;

	public MineSweeperController(MineSweeperService mineSweeperService) {
		this.mineSweeperService = mineSweeperService;
	}

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public MineSweeperGame startNewGame(@RequestBody CreateGameRequest request) {
		if (request.getMines() >= (request.getCols() * request.getRows())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There can't be more mines than cells.");
		}
		try {
			return this.mineSweeperService.create(request);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/game/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public MineSweeperGame loadGame(@PathVariable String id) {
		System.out.println("param ID: " + id);
		try {
			return this.mineSweeperService.findGame(id);
		} catch (Exception e) {
			System.out.println("ERROR: " + e.getMessage());
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/select", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public MineSweeperGame selectCell(@RequestBody SelectCellRequest request) {
		try {
			return this.mineSweeperService.select(request);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/flag", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public MineSweeperGame flagCell(@RequestBody SelectCellRequest request) {
		try {
			return this.mineSweeperService.flag(request);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/restart", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public MineSweeperGame restart(@RequestBody RestartGameRequest request) {
		try {
			return this.mineSweeperService.restart(request);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

}
