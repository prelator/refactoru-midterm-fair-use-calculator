//================ Question instances ==================
	//Main sequence questions
	var typeOfClaim = new Question(
		"type_of_claim",
		"Preliminary",
		"prelim",
		"What kind of copyrighted material was claimed in your video: audio or video?", 
		[	new Choice("audio", "Audio", 0),
			new Choice("video", "Video", 0),
		]
	);

	var originalType = new Question(
		"original_type",
		"Nature of copyrighted work",
		"nature",
		"Was the original copyrighted work creative in nature (song, movie, TV show, videogame, etc.) or factual in nature (news report, historical event, recorded speech, etc.)?",
		[	new Choice("creative", "Creative", 0, "The original work was creative in nature."),
			new Choice("factual", "Factual", 100, "The original work was factual in nature.")
		]
	);

	var originalPublished = new Question(
		"original_published",
		"Nature of copyrighted work",
		"nature",
		"Was the original copyrighted work published or unpublished?",
		[	new Choice("published", "Published", 100, "The original work was published."),
			new Choice("unpublished", "Unpublished", 0, "The original work was unpublished, but this does not preclude fair use.")
		]
	);

	var amount = new Question(
		"amount",
		"Amount and substantiality",
		"amount",
		"How much of the original copyrighted work did you incorporate into your video?",
		[	new Choice("ten", "10% or less", 100, "Less than 10% of the original was used."),
			new Choice("twenty", "10% - 25%", 75, "Less than 25% of the original was used."),
			new Choice("fifty", "25% - 50%", 50, "Less than 50% of the original was used."),
			new Choice("seventy", "50% - 75%", 25, "No more of the original was used than was necessary to achieve the purpose of the use."),
			new Choice("hundred", "75% - 100%", 0, "No more of the original was used than was necessary to achieve the purpose of the use.")
		]
	);

	var commercial = new Question(
		"commercial",
		"Purpose and charcter of use",
		"purpose",
		"Are you directly making money from your video (e.g. ad revenue), or is the video intended for any other commercial purpose (business advertisement, etc.)?",
		[	new Choice("yes", "Yes", 0),
			new Choice("no", "No", 200, "The video is non-commercial in nature.")
		]
	);

	var commentary = new Question(
		"commentary",
		"Purpose and character of use",
		"purpose",
		"Does your video include your own direct commentary or criticism on the copyrighted work?",
		[	new Choice("yes", "Yes", 200, "The video provides original commentary/criticism of the original work."),
			new Choice("no", "No", 0)
		]
	);

	var parody = new Question(
		"parody",
		"Purpose and character of use",
		"purpose",
		"Is your video a parody (mocking the original copyrighted work), satire (using the copyrighted work for social commentary on an unrelated subject), or neither?",
		[	new Choice("parody", "Parody", 200, "The video is a parody of the copyrighted work."),
			new Choice("satire", "Satire", 0),
			new Choice("neither", "Neither", 0)
		]
	);	

	var purpose = new Question(
		"purpose",
		"Purpose and character of use",
		"purpose",
		"Does your purpose in using the copyrighted material in your video fall under one of these other categories (choose one)?",
		[	new Choice("news", "News reporting", 200, "The video is for the protected purpose of news reporting."),
			new Choice("teaching", "Teaching", 200, "The video is for the protected purpose of teaching."),
			new Choice("scholarship", "Scholarship or research", 200, "The video is for the protected purpose of research/scholarship."),
			new Choice("none", "None", 0)
		]
	);

	var alter = new Question(
		"alter",
		"Purpose and character of use",
		"purpose",
		"Did you edit, alter, remix, or change the original copyrighted work in any way?",
		[	new Choice("significantly", "Yes, significiantly", 100, "The video substantially alters the original work, making it inherently transformative."),
			new Choice("somewhat", "Yes, somewhat", 50, "The video alters the original work, making it inherently transformative."),
			new Choice("little", "Yes, a little", 25, "The video alters the original work, making it inherently transformative."),
			new Choice("no", "No", 0)
		]
	);

	var compete = new Question(
		"compete",
		"Market impact",
		"market",
		"Could your video theoretically compete with the original copyrighted work, such that people could watch your video rather than paying for the original or viewing it from authorized sources, and receive the exact same experience? (If your video includes an entire copyrighted song, the answer should probably be yes.)",
		[	new Choice("yes", "Yes", 0),
			new Choice("no", "No", 100, "The video does not compete with the original work.")
		]
	);

	var marketHarm = new Question(
		"market_harm",
		"Market impact",
		"market",
		"If people did watch your video instead of paying for the original copyrighted work, would it be likely to significantly harm the value of the original work or substantially reduce the copyright holder's income from the work? (In the case of most YouTube videos, or if the material is not sold to the general public, the answer is likely no.)",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 100, "The video does not harm the market or value of the original work.")
		]
	);

	var licensing = new Question(
		"licensing",
		"Market impact",
		"market",
		"Is there a mechanism available for you to secure a license to use the copyrighted material, such that by failing to acquire a license, you are depriving the copyright owner of licensing fees they could otherwise expect to receive? (In the case of material owned by major media companies, likely no.)",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 100, "The video does not harm any available licensing market for the original work.")
		]
	);

	var promote = new Question(
		"promote",
		"Market Impact",
		"market",
		"Do you believe your use of the copyrighted material could actually serve to promote awareness of the original and thus have a POSITIVE effect on the market for the original?",
		[	new Choice("yes", "Yes", 100, "The video promotes the original work and therefore positively affects its market."),
			new Choice("no", "No", 0)
		]
	);

	//=========== Audio tree ==================
	var audioCentrality = new Question(
		"centrality",
		"Purpose and character of use",
		"purpose",
		"If the copyright claim was for music, does the copyrighted music in your video merely serve to provide general ambient atmosphere to the video (like a movie soundtrack), or is it central to the character of the video, with the video shaped around the music?",
		[	new Choice("atmosphere", "General atmosphere", 0),
			new Choice("central", "Central to video", 100, "The copyrighted audio is central to the character of the video and its use was therefore necessary."),
			new Choice("NA", "Not-applicable", 0)
		]
	);

	var audioContext = new Question(
		"audio_context",
		"Purpose and character of use",
		"purpose",
		"Does your video add a new context, meaning, or message to the audio, with the video track providing a visual interpretation of the copyrighted audio (e.g. music video, interpretive dance)?",
		[	new Choice("yes", "Yes", 200, "The video adds new context, meaning, or message to the audio, with the video track providing a visual interpretation of the copyrighted audio, adding transformative value."),
			new Choice("no", "No", 0)
		]
	);

	var audioIncidental = new Question(
		"audio_incidental",
		"Purpose and character of use",
		"purpose",
		"Did you include the copyrighted audio intentionally, or was it accidentally captured in the background (e.g. videogame music present in a playthrough, music from a stereo captured in a home video)?",
		[	new Choice("intentional", "Intentionally included", 0),
			new Choice("unintentional", "Accidental", 100, "The copyrighted audio was accidentally captured in the background of the video, making its use merely incidental.")
		]
	);

	var audioRecording = new Question(
		"recording",
		"Purpose and character of use",
		"purpose",
		"Is the copyrighted audio in your video your own recording of a copyrighted song (i.e. a cover recording), the original sound-recording, or a mixture of both?",
		[	new Choice("cover", "Cover recording", 100, "The video features an original cover recording of the song and is thus inherently transformative."),
			new Choice("original", "Original recording", 0),
			new Choice("mixture", "Mixture", 50, "The video features an original cover recording of the song and is thus inherently transformative."),
			new Choice("NA", "Not-applicable", 0) 
		]
	);

	var lyricVid = new Question(
		"lyric_vid",
		"Purpose and character of use",
		"purpose",
		"Does your video track consist solely of text displaying the lyrics of the orignal copyrighted sound-recording in the audio track, and/or a photo slideshow?",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 0)
		]
	);

	//=========== Video Tree ====================
	var videoSoundtrack = new Question(
		"soundtrack",
		"Purpose and character of use",
		"purpose",
		"Does your video use the original soundtrack from the copyrighted video source, or have you replaced the soundtrack (e.g. music video, bad lipreading video, literal trailer, etc.)?",
		[	new Choice("original", "Original soundtrack", 0),
			new Choice("new", "New soundtrack", 100, "The video adds a new soundtrack to the original, changing its content and message, and is therefore transformative in nature."),
			new Choice ("NA", "Not-applicable", 0)
		]
	);

	var videoIncidental = new Question(
		"video_incidental",
		"Purpose and character of use",
		"purpose",
		"Did you include the copyrighted visual material intentionally, or was it accidentally captured in the background (i.e. TV playing in home video)?",
		[	new Choice("intentional", "Intentionally", 0),
			new Choice("unintentional", "Accidentally", 100, "The copyrighted material was captured accidentally in the background, making its use purely incidental.")
		]
	);

	var videoContext = new Question(
		"video_context",
		"Purpose and character of use",
		"purpose",
		"Does your video add new context or meaning to the copyrighted video by placing it in a compilation alongside similar or contrasting clips?",
		[	new Choice("yes", "Yes", 200, "The video adds new context and meaning to the copyrighted video by placing it alongside similar or contrasting clips, and is therefore transformative in nature."),
			new Choice("no", "No", 0)
		]
	);

	var videoInteractive = new Question(
		"interactive",
		"Purpose and character of use",
		"purpose",
		"Is the copyright claim against video footage that was created in the process of your interaction with a piece of interactive software (e.g. a videogame playthrough or software tutorial)?",
		[	new Choice("yes", "Yes", 200, "The video features user interaction with an interactive piece of software, which is inherently transformative."),
			new Choice("no", "No", 0)
		]
	);

//========= Master question list =====================
	var questionList = [typeOfClaim, originalType, originalPublished, amount, commercial, commentary, parody, purpose, alter, audioCentrality, audioContext, audioIncidental, audioRecording, lyricVid, videoSoundtrack, videoIncidental, videoContext, videoInteractive, compete, marketHarm, licensing, promote];

//========== Question tree arrays ======================
	var audioQuestions = [originalType, originalPublished, amount, commercial, commentary, parody, purpose, alter, audioCentrality, audioContext, audioIncidental, audioRecording, lyricVid, compete, marketHarm, licensing, promote];
	
	var videoQuestions = [originalType, originalPublished, amount, commercial, commentary, parody, purpose, alter, videoSoundtrack, videoIncidental, videoContext, videoInteractive, compete, marketHarm, licensing, promote];
