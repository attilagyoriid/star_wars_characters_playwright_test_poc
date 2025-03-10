@e2e
Feature: Registration Character Details e2e

    As a user 
    I want to select a Star Wars character 
    So that I can see the character details


  Background:
    Given I am on the Star Wars home page

  Scenario Outline: Successful Character Details with image
    When I select "<CHARACTER_NAME>" from the list
    When I click "Show Image" button
    Then I will see the name of "<CHARACTER_NAME>"
    And I will see the image of "<CHARACTER_NAME>"


    Examples:
    | CHARACTER_NAME                  |
    | R2-D21                           |
    | C-3PO                           |
    | Luke Skywalker                  |
  
  Scenario Outline: Successful Character Details with No image
    When I select "<CHARACTER_NAME>" from the list
    When I click "Show Image" button
    Then I will see the name of "<CHARACTER_NAME>"
    And I will not see the image of "<CHARACTER_NAME>"
    And I will see missing image text "No Image Available"


    Examples:
    | CHARACTER_NAME                  |
    | Owen Lars                       |
    | Obi-Wan Kenobi                  |
