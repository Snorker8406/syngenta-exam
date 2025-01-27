
# Syngenta Exercise

Syngenta code challenge related to analyze a text file.

The code was developed gradually following the instructions in the Word document.

The development progress can be followed by every commit:
 1. starting coding only javascript for Question 1
 2. then adding typescript and tools like nodemon
 3. architecture as backend server with express
 4. adding unit test with JestJS
 5. and finally added frontend with ReactJS (create-react-app) to connect it with backend


**Summary:** the app is small but complete app with backend and frontend

**Used technologies:** node, nodemon, express, typescript, reactJS, jestJS

**Workflow:** the user uploads a .txt file to the node server,  express server saves the file in /backend/uploads path, then perform the logic to analizes the file in the backend and returns an object as response with a message (success or fail), and the content with the result of the list of words and counts of the just received file.

![Syngenta app](https://github.com/user-attachments/assets/1ec4725b-f042-42ac-960b-ea566787a102)

# Installation
clone repo: https://github.com/Snorker8406/syngenta-exam.git

then run:
```bash
    npm install
```
then 
```bash
    npm run install-all
```
this going to install both dependencies (backend and frontend), or you can install them as usual from each path /backend and /frontend with "npm install" respectively.

**to start the app (both backend and frontend) run:**
```bash
    npm start
```
or also you can start individually as usual, first /backend and then /fronted both with "npm start"

finally unit test are included for backend file called /backend/src/syngentaExamQuestion2.ts since is the file that contains the logic.

to start **Unit Tests** run
```bash
    npm test
```


# Question responses

 the responses are in the backend side as well as unit testing for Question 4

## **Question 1 word count :**
https://github.com/Snorker8406/syngenta-exam/blob/main/backend/src/syngentaExamQuestion1.ts
  1. loads the .txt file in a variable (runtime memory).
  2. process all to lowercase, remove special chars and split by words.
  3. create a Map<string, number> to iterate word by word and start counting and building the list.
  4. finally orders the list descending by count (the word most frecuent at the beggining).

**To run only this function you can use this command, make sure to run it from /backend path**
```bash
    npm run quest1
```


## **Question 2 improvements :**
https://github.com/Snorker8406/syngenta-exam/blob/main/backend/src/syngentaExamQuestion2.ts

This approach increases performance having in mind processing big files since is not saving the file in runtime memory, because is counting words at the same time as the file is being read by a buffer.
  1. checks if path parameter is not null
  2. creates a Map<string, number> to save the word list result and counts
  3. creates a read stream to read the file from path provided by parameters
  4. the event cached by every line read, the line is processed toLowerCase, removing special characters and split by words to accumulate the in the Map previously created.
  5. once the read of the file is done we already have the result.
  6. finally the Map si ordered and returned as result.

**To run only this function you can use this command, make sure to run it from /backend path**

```bash
    npm run quest2
```
  **Time Complexity**
1. Reading the file line by line:

    - The createReadStream and readline libraries process the file line by line, meaning the entire file is read once. If the file size is N (in terms of characters), reading the file is O(N).

2. Processing each line:

    - For each line, the following steps are executed:
      - toLowerCase(): Converts the line to lowercase, which is O(L), where L is the number of characters in the line.
      - replace(): Removes non-alphanumeric characters, also O(L).
      - split(): Splits the line into words, which is proportional to the number of spaces or words in the line, i.e., O(L).
      - Iterating through the words in the line: For each word, inserting/updating the Map takes O(1) (on average). If there are W words in the file, this step is O(W).

3. Determining the most frequent word:

    - Each word's count is compared against maxConteo, which is a constant-time operation O(1). Since this check is part of the word loop, it's already accounted for in O(W).

**Overall Time Complexity:**
Combining the steps:
O(N + W), where:

  - N is the size of the file in characters.
  - W is the total number of words in the file.
Since W is generally proportional to N in natural language text, the effective complexity is approximately O(N).

**Space Complexity**

1. File Content Storage:

    - Unlike reading the entire file into memory, the file is processed line by line, so at most, one line of text is held in memory at a time. This is O(L), where L is the maximum line length.

2. Word Frequency Map:

    - The Map stores unique words and their counts. Let U be the number of unique words in the file. The space used by the Map is O(U).

3. Temporary Variables:

    - Variables like palabraMasComun and maxConteo are constants, so their space usage is O(1).


**Overall Space Complexity:**
**O(L + U)**, where:

* L is the length of the longest line.
* U is the number of unique words in the file.
This approach is memory-efficient because it avoids loading the entire file into memory at once, making it suitable for processing large files.

## **Question 3 highest count:**
https://github.com/Snorker8406/syngenta-exam/blob/main/backend/src/syngentaExamQuestion3.ts

**To run only this function you can use this command, make sure to run it from /backend path**

```bash
    npm run quest3
```

In this code is used the same logic of **Question 2** but in this case we don't need to return a list of words, only the most repeated, in this case the logic is a bit different we don't need to order the list, is matter of keep the higer number and word in a variable, and compare every word proccessed , and by the end of read the file the last in the mentioned variable is the most frecuent word.

## Question 4 unit tests:
https://github.com/Snorker8406/syngenta-exam/blob/main/backend/src/syngentaExamQuestion2.test.ts

**To run unit tests you can use this command:**

  - make sure to run it from /backend path
  - in case tests broken, REMOVE /backend/dist path, maybe is the cause of the errors

```bash
    npm test
```

![Syngenta ut](https://github.com/user-attachments/assets/9211dfe4-1af1-418f-afb9-8969d776b32f)

