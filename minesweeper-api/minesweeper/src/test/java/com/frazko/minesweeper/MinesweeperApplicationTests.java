package com.frazko.minesweeper;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.frazko.minesweeper.model.MineSweeperGame;
import com.frazko.minesweeper.services.MineSweeperService;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class MinesweeperApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private MineSweeperService mineSweeperService;
	
	String createJson = "{\"rows\": 3,\"cols\": 3,\"mines\": 3}";


	@Test
	public void createsAGame() throws Exception {

		final MineSweeperGame minesweeperGameMock = new MineSweeperGame();
		minesweeperGameMock.init(3, 3, 3);

		Mockito.when(mineSweeperService.create(Mockito.any())).thenReturn(minesweeperGameMock);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/create").accept(MediaType.APPLICATION_JSON).content(createJson).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		System.out.println("result  :: " + result);
		System.out.println("result::getResponse " + result.getResponse());
		

		assertNotNull(result.getResponse());

	}

	@Test
	public void CreatesCorrectRowsCols() throws Exception {
		
		final MineSweeperGame minesweeperGameMock = new MineSweeperGame();
		minesweeperGameMock.init(3, 3, 3);
		
		assertEquals(minesweeperGameMock.getBoard().getCols(), 3);
		assertEquals(minesweeperGameMock.getBoard().getRows(), 3);
		
	}

	@Test
	public void CreatesCorrectNumberOfMines() throws Exception {
		
		final MineSweeperGame minesweeperGameMock = new MineSweeperGame();
		minesweeperGameMock.init(3, 3, 3);
		
		assertEquals(minesweeperGameMock.getMinesCount(), 3);
		
	}

	@Test
	public void GameIsRunning() throws Exception {
		
		final MineSweeperGame minesweeperGameMock = new MineSweeperGame();
		minesweeperGameMock.init(3, 3, 3);
		
		assertEquals(minesweeperGameMock.isOver(), false);
		
	}

}
