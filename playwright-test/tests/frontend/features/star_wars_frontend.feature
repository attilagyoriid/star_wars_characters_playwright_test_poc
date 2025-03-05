@frontend
Feature: Front-end Registration Character Details with mock back-end api

    As a user 
    I want to select a Star Wars character 
    So that I can see the character details


  Background:
    Given I mock reponse for api: "**/api/people/" with "people_mock_reponse.json" as response
    And I am on the Star Wars home page
  
  Scenario Outline: Successful Character Details with No image
    When I select "<CHARACTER_NAME>" from the list
    When I click "Show Image" button
    Then I will see the name of "<CHARACTER_NAME>"
    And I will not see the image of "<CHARACTER_NAME>"
    And I will see missing image text "No Image Available"


    Examples:
    | CHARACTER_NAME                  |
    | Mock-Owen Lars                  |
    | Mock-Obi-Wan Kenobi             |
    | Mock-R2-D2                      |
    | Mock-C-3PO                      |
    | Mock-Luke Skywalker             |