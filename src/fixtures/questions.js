const questions = [
	{
		type: 'text',
		description: 'How are you feeling today?'
	},
	{
		type: 'single',
		description: 'How stressed are you feeling today?',
		options: ['No stress', 'Some stress', 'A lot of stress']
	},
	{
		type: 'multiple',
		description: 'What feelings best describe your mood today?',
		options: ['Happy', 'Angry', 'Ecstatic', 'Tired', 'Sad', 'Confused']
	}
];

export default questions;
