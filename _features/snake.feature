Feature: Snake Game
  A classic snake game where the player controls a snake to eat food and grow
  while avoiding walls and self-collision.

  Scenario: Starting the game
    Given the game has not started
    When I start the game
    Then the snake begins moving

  Scenario: Controlling the snake
    Given the game is running
    When I change direction
    Then the snake moves in the new direction

  Scenario: Opposite direction is ignored
    Given the snake is moving right
    When I press the left arrow key
    Then the snake continues moving right

  Scenario: Eating food
    Given the game is running
    When the snake eats food
    Then the snake grows by one segment
    And the score increases
    And new food appears

  Scenario: Wall collision ends game
    Given the game is running
    When the snake hits a wall
    Then the game ends
    And I see the game over screen

  Scenario: Self collision ends game
    Given the snake is long enough to collide with itself
    When the snake hits itself
    Then the game ends
    And I see the game over screen

  Scenario: Restarting after game over
    Given the game has ended
    When I restart the game
    Then a new game begins
    And the score resets to zero
