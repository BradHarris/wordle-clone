import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).mount('#app')
document.onkeyup = (e) => {
    console.log(e.key);
    const key = e.key.toLowerCase();
    switch (key) {
        case 'backspace': {
            app.removeLetter();
            break;
        }
        case 'enter': {
            app.submitWord();
            break;
        }
        case 'escape': {
            app.reset();
            break;
        }
        default: {
            app.addLetter(key);
        }
    }
}