var Score = {
	// How many top scores we want to save at max
	_numberOfScores : 10,

	// Will contain all the saved scores
	// {score: 0, name: "Name"}
	_topScores : [],

	// Index to localStorage
	_localStorageIndex : "score",

	NO_SCORE : -1,

	// Current score of player, we will add values to this variable on the go and then when player is game over
	// we will save this score
	_score : 0,

	// How many lifes player has left in level, begins with 3 in every level
	_lifesLeft : 3,

	// Score for each new level
	_levelScore : 1000,

	// Score for each lifes left after each level
	_lifesLeftScore : 100,

	initialize : function() {
		var storage = JSON.parse(localStorage.getItem(this._localStorageIndex));
		this._topScores = storage ? storage : [];
	},

	_reset : function() {
		this._score = 0;
		this._lifesLeft = 3;
		this._topScores = JSON.parse(localStorage.getItem(this._localStorageIndex));
	},

	// Return lowest saved score
	_getLowest : function() {
		// Set lowest default value to -1
		var lowest = this.NO_SCORE;
		for(var key in this._topScores) {
			var score = this._topScores[key].score;

			if(lowest === this.NO_SCORE) {
				lowest = score;
			}

			lowest = score < lowest ? score : lowest;
		}
		return lowest;
	},

	_getSize : function() {
		return this._topScores.length;
	},

	getScore : function() {
		return this._score;
	},

	// Is score a highscore
	_isHighscore : function() { 
		return this._getSize() < this._numberOfScores || this._score > this._getLowest(); 
	},

	// Get array index for new score
	_getIndex : function() {
		for(var key in this._topScores) {
			var item = this._topScores[key];
			if(item.score < this._score) {
				return key;
			}
		}
		if(this._getSize() < this._numberOfScores) {
			return this._getSize();
		}
		return -1;
	},

	// Add new highscore
	_add : function(name) {
		var index = this._getIndex();
		if(index === -1) return;

		// Add new element to highscore array at position index
		this._topScores.splice(index, 0, {name: name, score: this._score});

		// Cut of extra elements from array
		this._topScores.length = this._topScores.length < this._numberOfScores ? this._topScores.length : this._numberOfScores;
	},

	// Save current score to localStorage
	save : function(name) {
		console.log("Save");
		if(this._lifesLeft !== 0) {
			return;
		}
		if(this._isHighscore()) {
			this._add(name);
			localStorage.setItem(this._localStorageIndex, JSON.stringify(this._topScores));
		}

		// Reset score to 0 and update list of highscores
		this._reset();
	},

	newLevel : function() {
		this._score += this._levelScore + (this._lifesLeft * this._lifesLeftScore);
		this._lifesLeft = 3;
	},

	decrementLifes : function() {
		this._lifesLeft--;
	},

	getAll : function() {
		return this._topScores;
	}
};

// Get all new data from localStorage
Score.initialize();