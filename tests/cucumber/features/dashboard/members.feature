# @dev
Feature: One-liner description of this feature

  As a box owner
  I want to manage my members
  So that I can run my business

  Background:
    Given I am a box owner
    And I have a box called "The Hot Box"
    And I have logged in

  # @dev
  Scenario: I can view my dashboard
    Then I should see "The Hot Box" on my dashboard

  # @dev
  Scenario: I can see my members
    Given I have a member named "Jack Grossmann"
    Then I should be able to see "Jack Grossmann"

  # @dev
  Scenario: New members are seen as "Pending"
    Given I have a member named "Jack Grossmann"
    Then I should be able to see that their membership status is "Pending"

  # @dev
  Scenario: I can add members
    Given I add a member named "Bob Dole"
    Then I should be able to see "Bob Dole"

  # @dev
  Scenario: I can delete members
    Given I have a member named "Jack Grossmann"
    When I delete the user
    Then I should see a confirmation that they were deleted
    And I should no longer see them in the list
