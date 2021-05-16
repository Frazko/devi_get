package com.frazko.minesweeper.repository;

import com.frazko.minesweeper.model.MineSweeperGame;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<MineSweeperGame, String> {
}
