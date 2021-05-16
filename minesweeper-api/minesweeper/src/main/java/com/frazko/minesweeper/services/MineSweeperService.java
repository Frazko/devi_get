package com.frazko.minesweeper.services;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.frazko.minesweeper.model.MineSweeperGame;
import com.frazko.minesweeper.repository.GameRepository;
import com.frazko.minesweeper.requestObjects.CreateGameRequest;
import com.frazko.minesweeper.requestObjects.RestartGameRequest;
import com.frazko.minesweeper.requestObjects.SelectCellRequest;

@Component
public class MineSweeperService {

	private final GameRepository gameRepository;

	public MineSweeperService(final GameRepository gameRepository) {
		this.gameRepository = gameRepository;
	}

	private MineSweeperGame findById(String id) {
		System.out.println("findById: " + id);
		try {
			return this.gameRepository.findById(id).get();
		} catch (RuntimeException exception) {
			throw new RuntimeException("The Game does not Exists!");
		}
	}

	private MineSweeperGame saveGame(MineSweeperGame minesweeperGame) {
		try {
			return this.gameRepository.save(minesweeperGame);
		} catch (RuntimeException exception) {
			throw new RuntimeException("The Game could not be saved");
		}
	}

	public MineSweeperGame create(@RequestBody CreateGameRequest request) {
		final MineSweeperGame minesweeperGame = new MineSweeperGame();
		minesweeperGame.init(request.getRows(), request.getCols(), request.getMines());
		try {
			return this.gameRepository.save(minesweeperGame);
		} catch (RuntimeException exception) {
			throw new RuntimeException("The Game could not be saved");
		}
	}

	public MineSweeperGame findGame(final String id) {
		return findById(id);
	}

	public MineSweeperGame select(@RequestBody SelectCellRequest request) {
		final MineSweeperGame minesweeperGame = findById(request.getId());
		minesweeperGame.selectCell(request.getX(), request.getY());
		return saveGame(minesweeperGame);
	}

	public MineSweeperGame flag(@RequestBody SelectCellRequest request) {
		final MineSweeperGame minesweeperGame = findById(request.getId());
		minesweeperGame.toggleFlag(request.getX(), request.getY());
		return saveGame(minesweeperGame);
	}
	
	public MineSweeperGame restart(@RequestBody RestartGameRequest request) {
		final MineSweeperGame minesweeperGame = findById(request.getId());
		minesweeperGame.restart();
		return saveGame(minesweeperGame);
	}

}
