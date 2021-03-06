# How to kill a Chinaman

How to kill a Chinaman is my first novel.

It presents in first-person the thoughts and narratives of an unidentified character with severe mental health issues.

The intention of the novel is to take you through a provocative theme-park of cynicism, violence and mania. I suppose you could describe it as a delicious free-for-all.

The novel has largely been inspired by the events of my own life, as well as the writing styles of William S. Burroughs' novel, Naked Lunch.

I imagine the manuscript will be finished sometime in 2021.

## Repository Overview

- `chapters` - All the novel's chapters.
- `chapters-without-annotations` - All the novel's chapters without headings or annotations.
- `ebook` - Relevant eBook generation files, including generation directory.
- `medium-export` - Export of all my Medium posts. Initially, for inspiration.
- `other` - Unused chapter excerpts + a heap of notes on the novel.
- `scripts` - Bash scripts to push to Github + create word count.
- `util` - Node.js scripts to compile the book and relevant files.

Use the `h "commit message"` command to save to the repository. It is a function saved within the config.

## Plot Overview

### Chapter 01 - life. (DONE)

- Character meets with The Editor to discuss his manuscript. The Editor is clueless.
- They go out to lunch in Chinatown. Character describes Chinatown and Restaurant.
- Character gets fed up with Editor. Leaves for work.

### Chapter 02 - work. (DONE)

- Character arrives at work. Bumps into his love interest, Milo.
- Character describes Milo and workplace.
- Milo proposes a date. Character accepts hesitantly.

### Chapter 03 - family. (DONE)

- Character heads to meet his mother for dinner.
- Character describes the affluent Chinese suburb, his porn addiction and his mother.
- Character realises she's toxic and decides to disown her. Character leaves abruptly.

### Chapter 04 - apartment. (DONE)

- Character wakes up the next day in a depression.
- Character describes his feelings. Decides to get high.
- Character bumps into his neighbour. They chat. They both are fond of each other.
- Character leaves for his date with Milo.

### Chapter 05 - date. (DONE)

- Character arrives at Milo's house. Describes neighbourhood and Milo's house.
- They leave for the city. They end up at a pub. They kiss.
- Milo chokes. Breaks up with Character.

### Chapter 06 - therapy. (DONE)

- Character attends therapy the next day. Describes clinic lobby.
- Character meets with therapist. They get nowhere.
- Character provides an introspective monologue, mimicking his idea of therapy.

### Chapter 07 - gun. (DONE)

- Character heads out to do his weekly grocery shop. Describes mall.
- Notices a gun shop. Heads inside.
- Ends up purchasing a revolver.

### Chapter 08 - birthday.

- It's the character's birthday. He's lonely. Participates in "Gun Therapy"
- Friend arrives. They chat and discuss life.
- Milo appears out of the blue. He invites her in.
- They take an uber and head out to a mexican restaurant.

### Chapter 09 - restaurant.


### Chapter 10 - bubble.

- The character heads into work. Describes how the stock market has crashed.
- The character delivers a monologue about work. The character meets with his boss. He's fired.
- The character leaves for home.

### Chapter 11 - death.

- The character is depressed to a point of delusion. He simply does not care.
- He decides to take acid and meet up with a dodgy friend.
- He has a huge freak out, ends up hospitalised.

### Chapter 12 - dream.

- The character has a lucid dream which details how he wish life was.
- It still ends in tragedgy?

### Chapter 13 - recovery.

- The character wakes up in a hospital ward.
- He returns home and sulks.


## Plot Ideas

### amelia.
- This would be interesting, at some point the character meets up with amelia. (This would be late book.) then this way it could tie up with the next novel.

### house.

- The character buys a house.

- Character talks about relationships with the Friend.

### drugs.

- Character takes drugs. Becomes an addict. The degradation.

### market.

- This chapter introduces the fall of the Character.
- Character attends a weekend market.

### mania.

- Talk about developing a mania with a video game.

### confrontation.
- Character sees his mother again.

### swindle.
- Talk about working in tele-marketing.

### 16.
- He gets attacked by a 16 year old.

### His friend gets surgery.
### help.
### slave.
### blog. - talks about the blog he writes.
### church. - talks about his faith.

## Relevant Documentation

Please check the `other` folder for relevant documentation on the novel.

## Plugins

First introduced: 21/02/21

My previous workflow was to render everything with pandoc, however I'm now using the `Markdown Preview Enhanced` vscode extension to do this within the code editor. It should save me a considerably amount of time and effort.

You will also need to apply a css file to do this thing. Here is what you'll need to do to set that up:

<!-- NOTE: This doesn't work for some reason, you'll just need to amend the original with what's in markdown_plugin_style -->
`ln -s ./util/markdown_plugin_style.less /Users/dottjt/.mume/style.less`

## Generate Chapters Without Annotations

I will need to add these back into the package.json when I'm ready to actually generate the

"devDependencies": {
  "husky": "^4.2.5"
},
"husky": {
  "hooks": {
    "pre-commit": "npm run generate-chapters-without-annotations && git add . && npm run compile:md",
    "pre-push": ""
  }
}

All those styles live in `./util/markdown_plugin_style.less`

## Potentially Useful Links

- http://www.hemingwayapp.com/
- https://languagetoolplus.com/
- https://languagetool.org/
- https://diessi.ca/blog/writing-mode-in-vs-code/

- https://jerichowriters.com/manuscript-presentation/ (I didn't mind the manuscript book styling)

I also use this theasurus extensively throughout the novel. It just seems to work really well for me:

- http://www.onelook.com/
- http://www.onelook.com/reverse-dictionary.shtml
