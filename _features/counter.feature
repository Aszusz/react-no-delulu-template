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
