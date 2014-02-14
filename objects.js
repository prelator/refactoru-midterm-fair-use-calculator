//============= Global Objects / Constructors / Arrays ====================
	var Question = function(name, category, catLabel, text, choices){
		this.name = name;
		this.number = 1;
		this.category = category;
		this.catLabel = catLabel;
		this.text = text;
		this.choices = choices;
	};		

	Question.prototype.findByResponse = function(resp){
		for (var i = 0; i < this.choices.length; i++) {
			if (this.choices[i].label === resp) {
				return this.choices[i];
			}
		}
	};

	Question.prototype.saveResponse = function(resp){
		var selectedChoice = this.findByResponse(resp);
		answerList.push(
			{	question: this.name, 
				category: this.catLabel,
				response: selectedChoice.label, 
				points: selectedChoice.points || 0,
				longStatement: selectedChoice.longStatement,
				shortStatement: selectedChoice.shortStatement
			}	);			
	};

	var Choice = function(label, text, points, longStatement, shortStatement){
		this.label = label;
		this.text = text;
		this.points = points;
		this.longStatement = longStatement || "";
		this.shortStatement = shortStatement || "";
	};

	var score = {
		percentage: 0,
		totalPoints: 0,
		purposePoints: 0,
		naturePoints: 0,
		amountPoints: 0,
		marketPoints: 0
	};

	var scoreAlert = {
		type: "",
		greeting: "",
		message: "",
		strength: ""
	};

	var progress = {percentage: 0};

	var answerList = [];

	var questionCounter = 0;

	var longStatements = {
		purpose: "",
		nature: "",
		amount: "",
		market: ""
	};

	var user = {
		name: "",
		email: "",
		address: "",
		phone: "",
		url: "",
		rationale: {}
	};