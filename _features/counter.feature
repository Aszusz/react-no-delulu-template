Feature: Counter
  A simple counter with increment, decrement, and reset controls

  Scenario: Counter starts at zero
    Given I open the app
    Then the counter displays 0

  Scenario: Incrementing the counter
    Given the counter is at 5
    When I increment the counter
    Then the counter displays 6

  Scenario: Decrementing the counter
    Given the counter is at 5
    When I decrement the counter
    Then the counter displays 4

  Scenario: Decrementing below zero
    Given the counter is at 0
    When I decrement the counter
    Then the counter displays -1

  Scenario: Resetting the counter
    Given the counter is at 7
    When I reset the counter
    Then the counter displays 0

  Scenario: Random increment increases counter after delay
    Given the counter is at 0
    When I random increment the counter
    Then the counter displays a value between 5 and 10 within 4000ms

  Scenario: Random decrement decreases counter after delay
    Given the counter is at 0
    When I random decrement the counter
    Then the counter displays a value between -10 and -5 within 4000ms

  Scenario: Async increment does not block immediate decrement
    Given the counter is at 0
    When I random increment the counter
    And I decrement the counter
    Then the counter displays -1
    Then the counter displays a value between 4 and 9 within 4000ms
