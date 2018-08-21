$(document).ready(function () {

  $("#start-button").on("click", gameState.startTimer);

});

var gameState = {

  timeRemaining: 60,

  startTimer: function () {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  countdown: function () {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  stopTimer: function () {
    clearInterval();
    trivia.checkAnswers();
  },

  showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Skipped questions: " + numUnanswered);
  }
}

var trivia = {

  displayQuestions: function () {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
    }
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  checkAnswers: function () {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio' + i + ']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

var questionBank =
  [
    {
      question: "Who shot Mr. Burns?",
      answers: ["Smithers", "Maggie Simpson", "Homer Simpson"],
      correct: "Maggie Simpson"
    },
    {
      question: "Which of the characters of the Simpson family was going to be a rabbit?",
      answers: ["Barney", "Marge Simpson", "Lisa Simpson"],
      correct: "Marge Simpson"
    },
    {
      question: "What is the name of Bart's elephant?",
      answers: ["Snowball", "Stampy", "Pachyderm"],
      correct: "Stampy"
    },
    {
      question: "What is the full name of Homer?",
      answers: ["Homer Jeff Simpson", "Homer Jay Simpson", "Homer Josh Simpson"],
      correct: "Homer Jay Simpson"
    },
    {
      question: "When the Simpsons move to a farm, what plant do they grow and sell at a roadside stand?",
      answers: ["carrots", "tomacco", "corn"],
      correct: "tomacco"
    },
    {
      question: "What character Homer voiceover and died quickly on the Itchy and Scratchy Show??",
      answers: ["Poochie", "Max Power", "Kang"],
      correct: "Poochie"
    },
    {
      question: "What is the license number of Bart Simpson?",
      answers: ["B47U89RE234", "B47U89RE243", "Trick question"],
      correct: "B47U89RE243"
    },
    {
      question: "What famous musician lent his voice to The Cosmic Coyote?",
      answers: ["Johnny Cash", "Leonard Cohen", "Bob Dylan"],
      correct: "Johnny Cash"
    },
  ]
