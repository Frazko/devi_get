package com.frazko.minesweeper.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.frazko.minesweeper.model.MineSweeperGame;


public interface GameRepository extends MongoRepository<MineSweeperGame, String> {
}
