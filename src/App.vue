<template>
  <header>
    <div class="title">MORDLE</div>
    <div class="game-number">#{{ gameNumber }}</div>
  </header>
  <ul id="game-words" class="words">
    <li v-for="w in 6" :key="w">
      <ul class="letters">
        <Tile
          v-for="l in 5"
          :key="l"
          :animationDelay="(l-1) * 300"
          :letter="words[w - 1][l - 1] || ''"
          :hint="hints[w-1]?.[l-1] || ''"
        />
      </ul>
    </li>
  </ul>
  {{ JSON.stringify(words) }}
  {{ solution }}
</template>

<script>
import Tile from './components/Tile.vue'
import words from './words.json';
const emptyArray = () => Array.from(Array(6)).map(() => '');
const getRandomGameNumber = () => Math.floor(Math.random() * words.length);
export default {
  name: 'App',
  components: {
    Tile
  },
  data() {
    console.log('one time?');
    
    let gameNumber = getRandomGameNumber();
    const {search} = window.location;
    const gameNumberIdx = search.indexOf('game=');
    if (gameNumberIdx !== -1) {
      const query = search.substring(1).split('&').reduce((res, chunk) => {
        const [key, val] = chunk.split('=');
        res[key] = val;
        return res;
      }, {});
      if (query.game) {
        const possibleGameNumber = parseInt(query.game);
        if (possibleGameNumber >= 1 && possibleGameNumber < words.length) {
          gameNumber = possibleGameNumber;
        }
      }
    }
    return {
      gameNumber,
      solution: words[gameNumber],
      attempt: 0,
      words: emptyArray(),
      hints: emptyArray()
    }
  },
  methods: {
    addLetter(letter) {
      if (!/[a-z]{1}/i.exec(letter)) {
        return console.error(`input ${letter} is not valid!`);
      }

      const word = this.words[this.attempt];
      if (word.length >= 5) {
        return console.error('too many letters');
      } else {
        this.words[this.attempt] += letter.substring(0, 1).toLowerCase()
      }
    },
    removeLetter() {
      const word = this.words[this.attempt];
      if (word.length > 0) {
        this.words[this.attempt] = word.substring(0, word.length - 1) ;
      }
    },
    submitWord() {
      let word = this.words[this.attempt]
      if (word.length !== 5) {
        return console.error('word is not finished');
      }
      // if (words.indexOf(word) === -1) {
      //   return console.error('word is not in list of accepted words');
      // }
      word = word.split('');
      const hints = Array.from(Array(5));
      const solution = this.solution.split('');
      word.forEach((v, i) => {
        if (solution[i] === v) {
          hints[i] = 'x';
          solution[i] = null;
          word[i] = null;
          return;
        }
      });

      word.forEach((v, i) => {
        if (!v) { return; }

        const idx = solution.indexOf(v);
        if (idx >= 0) {
          if (word[idx] !== v) {
            hints[i] = 'o';
            solution[idx] = null;
            return;
          }
        }
        hints[i] = '_';
      });
      
      this.hints[this.attempt] = hints.join('');
      this.attempt++;
      if (this.attempt > 5) {
        console.log('game is done');
      }
    },
    reset() {
      const gameNumber = getRandomGameNumber();
      window.location.search = `?game=${gameNumber}`;
      this.gameNumber = gameNumber;
      this.solution = words[gameNumber];
      this.attempt = 0;
      this.words = emptyArray();
      this.hints = emptyArray();
    }
  }
}
</script>

<style>
:root {
  --green: #6aaa64;
  --yellow: #c9b458;
  --background: #121212;
  --light-grey: #565758;
  --grey: #343434;
  --white: #d7d7d7
}

html, body {
  margin: 0px;
  padding: 0px;
  background: var(--background);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--white);
}

header {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin: 5px 0px;
  border-bottom: 1px solid var(--grey);
  justify-content: center;
}
.title {
  font-size: 2.25rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
}

.game-number {
  font-size: 0.75rem;
  letter-spacing: initial;
}

ul {
  list-style: none;
}

.words {
  display: flex;
  flex-flow: column nowrap;
  padding: 0px;
  justify-content: center;
}

.letters {
  display: flex;
  flex-flow: row nowrap;
  padding: 0px;
  justify-content: center;
}

</style>
