# Testbank System

The testbank system allows you to easily modify and manage test questions without changing code. Questions are stored in JSON and CSV formats for easy editing.

## File Structure

```
src/data/testbank/
├── dyslexiaQuestions.json     # Dyslexia child test questions (JSON)
├── dyslexiaQuestions.csv      # Dyslexia child test questions (CSV)
├── basicTestQuestions.json    # Basic test question pools (JSON)
└── basicTestQuestions.csv     # Basic test question pools (CSV)
```

## Schema Documentation

### CSV Schema for Dyslexia Questions

The dyslexia questions CSV follows this schema:

```
id, type, audio, question, num_ans, ans1, ans2, ans3, ans4, ans_correct, module, orderIndex, maxScore, isTextInput, imageFilePath
```

**Field Descriptions:**

- `id`: Unique identifier for the question (number or string)
- `type`: Question type (phonological-awareness, decoding, understanding-fluency, spelling-writing, language-comprehension)
- `audio`: Audio file path(s). Use `|` to separate multiple audio files
- `question`: The question text displayed to users
- `num_ans`: Number of answer choices (0 for text input questions)
- `ans1-ans4`: Answer options (leave empty if not used)
- `ans_correct`: Correct answer (A, B, C, D for multiple choice; actual answer for text input)
- `module`: Module name (PHONOLOGICAL_AWARENESS, DECODING, UNDERSTANDING_FLUENCY, SPELLING_WRITING, LANGUAGE_COMPREHENSION)
- `orderIndex`: Order of question in test (1-10)
- `maxScore`: Maximum points for this question (usually 2)
- `isTextInput`: TRUE for text input questions, FALSE for multiple choice
- `imageFilePath`: Optional image file path

### CSV Schema for Basic Test Questions

The basic test questions CSV follows this schema:

```
id, type, audio, question, num_ans, ans1, ans2, ans3, ans4, ans_correct, module, pool, images, targetLetter
```

**Field Descriptions:**

- `id`: Unique identifier for the question
- `type`: Question type (audio-choice, text-choice, image-choice, drawing, language-recognition)
- `audio`: Audio file path(s). Use `|` to separate multiple audio files
- `question`: The question text displayed to users
- `num_ans`: Number of answer choices (0 for drawing questions)
- `ans1-ans4`: Answer options (leave empty if not used)
- `ans_correct`: Correct answer (1-4 for multiple choice; letter for drawing)
- `module`: Display name for the module
- `pool`: Module pool name (phonological-awareness, decoding, understanding-fluency, spelling-writing, language-comprehension)
- `images`: Image file paths. Use `|` to separate multiple images
- `targetLetter`: Target letter for drawing questions

## How to Modify Questions

### Using CSV (Recommended for Easy Editing)

1. **Open the CSV file** in Excel, Google Sheets, or any text editor
2. **Edit questions** by modifying the text in the `question` column
3. **Change answers** by updating the `ans1`, `ans2`, `ans3`, `ans4` columns
4. **Update correct answers** in the `ans_correct` column
5. **Add new audio files** by updating the `audio` column
6. **Save the file** and refresh the application

### Using JSON (For Advanced Users)

1. Open the JSON file in a text editor
2. Modify the question objects following the same schema
3. Ensure proper JSON syntax (commas, quotes, brackets)
4. Save the file and refresh the application

## Adding New Questions

### Dyslexia Test (Fixed 10 Questions)

To replace questions in the dyslexia test:

1. Edit the CSV/JSON file
2. Keep the same number of questions (10)
3. Maintain the orderIndex sequence (1-10)
4. Ensure audio files exist in the specified paths

### Basic Test (Question Pools)

To add new questions to the basic test:

1. Add rows to the CSV with new `id` values
2. Use the appropriate `pool` name (phonological-awareness, decoding, etc.)
3. The system will randomly select 2 questions from each pool

## Audio File Management

- Audio files should be placed in the `src/assets/` directory
- Use relative paths starting with `/assets/`
- Supported formats: MP3, WAV, OGG
- For multiple audio files in one question, separate paths with `|`

Example: `/assets/audioTestVowel/A.mp3|/assets/audioTestVowel/B.mp3`

## Image File Management

- Image files should be placed in the `src/assets/image/` directory
- Use relative paths starting with `/assets/`
- Supported formats: JPG, JPEG, PNG, GIF
- For multiple images, separate paths with `|`

Example: `/assets/image/testVowels/monkeyBanana.jpg|/assets/image/testVowels/catFish.jpg`

## Testing Changes

1. **Save your changes** to the CSV/JSON file
2. **Refresh the browser** or restart the development server
3. **Start a new test** to see your changes
4. **Verify audio playback** and answer validation work correctly

## Troubleshooting

### Questions Not Loading
- Check that the CSV/JSON file syntax is correct
- Verify file paths are accessible
- Check the browser console for error messages

### Audio Not Playing
- Verify audio file paths are correct and files exist
- Check that audio files are in supported formats
- Ensure audio files are properly imported in the project

### Images Not Displaying
- Verify image file paths are correct and files exist
- Check that image files are in the public directory or properly imported
- Ensure image file formats are supported

## Fallback System

The system includes automatic fallbacks:

1. **JSON First**: System tries to load JSON files first
2. **CSV Fallback**: If JSON fails, system loads CSV files
3. **Hardcoded Fallback**: If both fail, system uses hardcoded questions

This ensures the application continues to work even if testbank files have issues.

## Example: Adding a New Question

To add a new phonological awareness question to the basic test:

```csv
phon-9,audio-choice,"/assets/audioTestVowel/O.mp3|/assets/audioTestVowel/S.mp3","Hai âm này có giống nhau không?",2,"Giống nhau","Khác nhau",,,2,"Nhận thức âm vị",phonological-awareness,,
```

This adds a question comparing O and S sounds to the phonological awareness pool.
