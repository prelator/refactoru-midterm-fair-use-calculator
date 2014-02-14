//============= Global Objects / Constructors / Arrays ====================
	
	//Question constructor
	var Question = function(name, category, catLabel, text, choices){
		this.name = name;
		this.number = 1;
		this.category = category;
		this.catLabel = catLabel;
		this.text = text;
		this.choices = choices;
	};		

	//Question method: retrieve choice corresponding to given response
	Question.prototype.findByResponse = function(resp){
		for (var i = 0; i < this.choices.length; i++) {
			if (this.choices[i].label === resp) {
				return this.choices[i];
			}
		}
	};

	//Question method: store response as object in answerList array
	Question.prototype.saveResponse = function(resp){
		var selectedChoice = this.findByResponse(resp);
		answerList.push(
			{	question: this.name, 
				category: this.catLabel,
				response: selectedChoice.label, 
				points: selectedChoice.points || 0,
				longStatement: selectedChoice.longStatement
			}	);			
	};

	//Question choice constructor
	var Choice = function(label, text, points, longStatement){
		this.label = label;
		this.text = text;
		this.points = points;
		this.longStatement = longStatement || "";
	};

	//Default score object instantiation
	var score = {
		percentage: 0,
		totalPoints: 0,
		purposePoints: 0,
		naturePoints: 0,
		amountPoints: 0,
		marketPoints: 0
	};

	//Default final score alert instantiation
	var scoreAlert = {
		type: "",
		greeting: "",
		message: "",
		strength: ""
	};

	//Progress bar object instantiation
	var progress = {percentage: 0};

	//Answerlist array instantiation
	var answerList = [];

	//Question counter variable
	var questionCounter = 0;

	//Dispute statements object instantiation
	var longStatements = {
		purpose: "",
		nature: "",
		amount: "",
		market: ""
	};

	//User info object instantiation
	var user = {
		name: "",
		email: "",
		address: "",
		phone: "",
		url: "",
		rationale: {}
	};

	//Webform notice text object instantiation
	var webformNotice = {
		text: ""
	};